"""
infographic_renderer.py — 인포그래픽 HTML을 PNG 이미지로 변환
Playwright를 사용해 HTML을 헤드리스 브라우저로 렌더링 후 스크린샷을 저장합니다.
"""
from __future__ import annotations

import os
import re
import textwrap
from pathlib import Path

# ── 플레이스홀더 파싱 ─────────────────────────────────────────────────────────
_INFOG_TITLE_RE = re.compile(r"\[인포그래픽 제목:\s*(.+?)\]")
_INFOG_HTML_RE = re.compile(r"\[인포그래픽 HTML:\s*([\s\S]+?)\](?=\s*\n|\Z)", re.MULTILINE)


def _is_sandboxed_environment() -> bool:
    """컨테이너/CI 환경 여부 감지 (--no-sandbox 플래그 사용 여부 결정)."""
    container_signals = [
        os.path.exists("/.dockerenv"),
        os.environ.get("CI") == "true",
        os.environ.get("GITHUB_ACTIONS") == "true",
        os.environ.get("NAVER_BLOG_NO_SANDBOX", "").lower() in ("1", "true"),
    ]
    return any(container_signals)


def _sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/:*?"<>|]', "_", name).strip()


def parse_infographic_placeholders(markdown: str) -> list[dict[str, str]]:
    """
    마크다운에서 인포그래픽 플레이스홀더를 파싱.

    Returns
    -------
    list of dict
        각 항목: {title, html}
    """
    titles = _INFOG_TITLE_RE.findall(markdown)

    # HTML 블록은 정규식 대신 라인 기반 파싱으로 처리
    htmls: list[str] = []
    lines = markdown.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        match = re.match(r"\[인포그래픽 HTML:\s*(.*)", line)
        if match:
            first = match.group(1)
            # 단일 줄 형식: [인포그래픽 HTML: <html...>] — 닫는 ] 가 같은 줄에 있음
            if first.rstrip().endswith("]"):
                htmls.append(first.rstrip()[:-1].strip())
            else:
                html_lines = [first]
                i += 1
                # 닫는 ] 를 찾되, HTML 태그 내부의 ]는 무시
                while i < len(lines):
                    current = lines[i]
                    # 최외곽 ]로 끝나는 줄을 찾기
                    if current.rstrip().endswith("]"):
                        html_lines.append(current.rstrip()[:-1])
                        break
                    html_lines.append(current)
                    i += 1
                htmls.append("\n".join(html_lines).strip())
        i += 1

    placeholders = []
    for title, html in zip(titles, htmls):
        placeholders.append({"title": title.strip(), "html": html.strip()})
    return placeholders


def _wrap_html(inner_html: str) -> str:
    """인포그래픽 HTML을 완전한 HTML 문서로 감싸기."""
    return textwrap.dedent(f"""\
        <!DOCTYPE html>
        <html lang="ko">
        <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nanum+Square&display=swap');
          body {{
            margin: 0;
            padding: 20px;
            background: #fff;
            font-family: 'Nanum Square', 'NanumSquare', 'Apple SD Gothic Neo',
                         'Malgun Gothic', sans-serif;
          }}
        </style>
        </head>
        <body>
        {inner_html}
        </body>
        </html>
    """)


def render_infographic(html: str, title: str, output_dir: Path) -> Path:
    """
    HTML 인포그래픽을 PNG 이미지로 렌더링·저장.

    Parameters
    ----------
    html : str
        인포그래픽 HTML 코드 (인라인 스타일)
    title : str
        파일명으로 쓸 한글 제목
    output_dir : Path
        이미지를 저장할 디렉터리

    Returns
    -------
    Path
        저장된 PNG 파일 경로
    """
    try:
        from playwright.sync_api import sync_playwright  # type: ignore[import-untyped]
    except ImportError as exc:
        raise ImportError(
            "playwright 패키지가 설치되지 않았습니다. "
            "`pip install playwright && playwright install chromium` 을 실행해주세요."
        ) from exc

    output_dir.mkdir(parents=True, exist_ok=True)
    filename = _sanitize_filename(title) + ".png"
    output_path = output_dir / filename

    full_html = _wrap_html(html)

    # --no-sandbox is required when running inside containerised / CI environments
    # (e.g. Docker, GitHub Actions) where the kernel user-namespace sandbox is unavailable.
    # Do NOT use this flag on a shared or untrusted host without additional OS-level isolation.
    chromium_args = ["--no-sandbox"] if _is_sandboxed_environment() else []

    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=chromium_args)
        page = browser.new_page(viewport={"width": 800, "height": 600})
        page.set_content(full_html, wait_until="networkidle")
        # 콘텐츠 크기에 맞게 스크린샷
        page.screenshot(path=str(output_path), full_page=True)
        browser.close()

    return output_path


def render_all_infographics(
    markdown: str,
    output_dir: Path,
) -> dict[str, Path]:
    """
    마크다운 원고의 모든 인포그래픽을 PNG 이미지로 변환.

    Returns
    -------
    dict[str, Path]
        {인포그래픽 제목: 저장 경로}
    """
    placeholders = parse_infographic_placeholders(markdown)
    results: dict[str, Path] = {}

    for ph in placeholders:
        title = ph["title"]
        html = ph["html"]
        print(f"  📊 인포그래픽 렌더링 중: {title}")
        try:
            path = render_infographic(html, title, output_dir)
            results[title] = path
            print(f"     ✅ 저장됨: {path}")
        except Exception as exc:  # noqa: BLE001
            print(f"     ⚠️  인포그래픽 렌더링 실패 ({title}): {exc}")

    return results
