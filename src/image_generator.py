"""
image_generator.py — Google Generative AI SDK를 이용한 이미지 생성
마크다운 원고에서 이미지 플레이스홀더를 파싱해 실제 이미지를 생성·저장합니다.
"""
from __future__ import annotations

import re
import time
from pathlib import Path

import google.generativeai as genai

from .config import GOOGLE_AI_API_KEY, GEMINI_IMAGE_MODEL

# Imagen 모델은 google-generativeai 패키지에서 선택적으로 제공됩니다
try:
    from google.generativeai import ImageGenerationModel as _ImageGenerationModel  # type: ignore[attr-defined]
    _IMAGEN_AVAILABLE = True
except (ImportError, AttributeError):
    _ImageGenerationModel = None  # type: ignore[assignment,misc]
    _IMAGEN_AVAILABLE = False

# ── 플레이스홀더 파싱 ─────────────────────────────────────────────────────────
_IMG_TITLE_RE = re.compile(r"\[이미지 제목:\s*(.+?)\]")
_IMG_PROMPT_RE = re.compile(r"\[이미지 생성 프롬프트:\s*(.+?)\]")


def _sanitize_filename(name: str) -> str:
    """파일명에 사용할 수 없는 문자 제거."""
    return re.sub(r'[\\/:*?"<>|]', "_", name).strip()


def parse_image_placeholders(markdown: str) -> list[dict[str, str]]:
    """
    마크다운에서 이미지 플레이스홀더를 파싱.

    Returns
    -------
    list of dict
        각 항목: {title, prompt, raw_title_line, raw_prompt_line}
    """
    titles = _IMG_TITLE_RE.findall(markdown)
    prompts = _IMG_PROMPT_RE.findall(markdown)

    placeholders = []
    for title, prompt in zip(titles, prompts):
        placeholders.append(
            {
                "title": title.strip(),
                "prompt": prompt.strip(),
            }
        )
    return placeholders


def generate_image(prompt: str, title: str, output_dir: Path, max_retries: int = 3) -> Path:
    """
    Google Generative AI SDK로 이미지를 생성하고 파일로 저장.

    Parameters
    ----------
    prompt : str
        이미지 생성 영문 프롬프트
    title : str
        파일명으로 쓸 한글 제목
    output_dir : Path
        이미지를 저장할 디렉터리
    max_retries : int
        API 호출 실패 시 최대 재시도 횟수

    Returns
    -------
    Path
        저장된 이미지 파일 경로
    """
    if not GOOGLE_AI_API_KEY:
        raise EnvironmentError("GOOGLE_AI_API_KEY가 설정되지 않았습니다.")

    genai.configure(api_key=GOOGLE_AI_API_KEY)

    output_dir.mkdir(parents=True, exist_ok=True)
    filename = _sanitize_filename(title) + ".png"
    output_path = output_dir / filename

    for attempt in range(1, max_retries + 1):
        try:
            # 방법 1: Gemini 2.0 Flash Exp — response_mime_type으로 이미지 요청
            model = genai.GenerativeModel(GEMINI_IMAGE_MODEL)
            response = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    response_mime_type="image/png",
                ),
            )

            if response.candidates and response.candidates[0].content.parts:
                for part in response.candidates[0].content.parts:
                    if hasattr(part, "inline_data") and part.inline_data:
                        output_path.write_bytes(part.inline_data.data)
                        return output_path

            # 방법 2: Imagen 모델 폴백 (패키지에서 지원하는 경우)
            if _IMAGEN_AVAILABLE and _ImageGenerationModel is not None:
                imagen = _ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")
                result = imagen.generate_images(prompt=prompt, number_of_images=1)
                result.images[0].save(str(output_path))
                return output_path

            raise RuntimeError("이미지 응답에 인라인 데이터가 없고 Imagen 폴백도 사용할 수 없습니다.")

        except Exception as exc:
            if attempt == max_retries:
                raise RuntimeError(
                    f"이미지 생성 실패 ({max_retries}회 시도): {exc}"
                ) from exc
            wait_time = 2 ** attempt
            print(f"     ⏳ 재시도 {attempt}/{max_retries} ({wait_time}초 대기)...")
            time.sleep(wait_time)

    raise RuntimeError("이미지 생성 실패: 최대 재시도 횟수 초과")


def generate_all_images(
    markdown: str,
    output_dir: Path,
) -> dict[str, Path]:
    """
    마크다운 원고의 모든 이미지 플레이스홀더에 대해 이미지를 생성.

    Returns
    -------
    dict[str, Path]
        {이미지 제목: 저장 경로}
    """
    placeholders = parse_image_placeholders(markdown)
    results: dict[str, Path] = {}

    for idx, ph in enumerate(placeholders):
        title = ph["title"]
        prompt = ph["prompt"]
        print(f"  🖼  이미지 생성 중 ({idx + 1}/{len(placeholders)}): {title}")
        try:
            path = generate_image(prompt, title, output_dir)
            results[title] = path
            print(f"     ✅ 저장됨: {path}")
        except Exception as exc:  # noqa: BLE001
            print(f"     ⚠️  이미지 생성 실패 ({title}): {exc}")

        # API rate limiting 방지
        if idx < len(placeholders) - 1:
            time.sleep(0.5)

    return results
