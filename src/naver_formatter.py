"""
naver_formatter.py — 마크다운 블로그 원고를 네이버 에디터 호환 HTML로 변환
네이버 블로그에 바로 복붙할 수 있는 HTML 형식으로 출력합니다.

폰트 크기 기준:
- 큰 제목 (h2): 30pt + 강조색
- 소제목 (h3): 19pt + 강조색
- 본문 기본: 16pt
"""
from __future__ import annotations

import re
from pathlib import Path


def _build_styles(accent_color: str = "#00C73C") -> str:
    """accent_color를 반영한 CSS 스타일 생성."""
    # 강조색에서 약간 어두운 버전 계산 (텍스트 가독성)
    dark_accent = accent_color  # 동일 색상 사용, 필요시 조절 가능

    return f"""
<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Square:wght@400;700;800&display=swap');
.frush-post {{
  font-family: 'NanumSquare', 'Nanum Square', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  font-size: 16pt;
  font-weight: bold;
  line-height: 1.85;
  color: #333;
  max-width: 860px;
  margin: 0 auto;
  word-break: keep-all;
}}
.frush-post h2 {{
  font-size: 30pt;
  font-weight: 800;
  margin: 36px 0 12px;
  color: {accent_color};
  border-left: 5px solid {accent_color};
  padding-left: 12px;
}}
.frush-post h3 {{
  font-size: 19pt;
  font-weight: 700;
  margin: 28px 0 8px;
  color: {accent_color};
}}
.frush-post p {{
  margin: 0 0 18px;
}}
.frush-post blockquote {{
  border-left: 4px solid {accent_color};
  margin: 24px 0;
  padding: 18px 24px;
  background: #f0faf3;
  color: #333;
  font-style: normal;
  font-weight: bold;
  border-radius: 0 8px 8px 0;
  font-size: 16pt;
  line-height: 1.7;
}}
.frush-post strong {{
  font-weight: 800;
  color: {dark_accent};
}}
.frush-post .frush-num {{
  color: {accent_color};
  font-size: 19pt;
  font-weight: bold;
}}
.frush-post .frush-conclusion {{
  background: linear-gradient(135deg, #e8fff0, #d0ffe0);
  border: 2px solid {accent_color};
  border-radius: 12px;
  padding: 20px 24px;
  margin: 24px 0;
  font-size: 17pt;
  font-weight: 700;
}}
.frush-post .frush-tip {{
  background: #fffbea;
  border: 1px solid #ffd700;
  border-radius: 10px;
  padding: 18px 22px;
  margin: 24px 0;
}}
.frush-post .frush-image-wrap {{
  text-align: center;
  margin: 28px 0;
}}
.frush-post .frush-image-wrap img {{
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
}}
.frush-post .frush-image-caption {{
  font-size: 13pt;
  color: #888;
  margin-top: 8px;
}}
.frush-post .frush-infographic-wrap {{
  margin: 28px 0;
  overflow-x: auto;
}}
.frush-post .frush-hashtags {{
  margin-top: 40px;
  font-size: 14pt;
  color: #555;
  line-height: 2;
}}
.frush-post hr {{
  border: none;
  border-top: 2px dashed #e0e0e0;
  margin: 36px 0;
}}
</style>""".strip()


def _build_base_font_style(accent_color: str = "#00C73C") -> str:
    """인라인 기본 폰트 스타일."""
    return (
        "font-family:'NanumSquare','Nanum Square','Apple SD Gothic Neo','Malgun Gothic',sans-serif;"
        "font-size:16pt;"
        "font-weight:bold;"
        "line-height:1.85;"
        "color:#333;"
    )


# ── 마크다운 → HTML 변환 헬퍼 ────────────────────────────────────────────────

def _escape_html(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _highlight_numbers(text: str, accent_color: str = "#00C73C") -> str:
    """텍스트에서 숫자가 포함된 단어/문구를 강조색, 19pt 크기로 강조."""
    parts = re.split(r'(<[^>]+>)', text)
    out: list[str] = []
    for part in parts:
        if part.startswith('<') and part.endswith('>'):
            out.append(part)
        else:
            out.append(
                re.sub(
                    r'[^\s<>]*\d[^\s<>]*',
                    lambda m: (
                        f'<span style="color:{accent_color};font-size:19pt;font-weight:bold;">'
                        f'{m.group(0)}</span>'
                    ),
                    part,
                )
            )
    return ''.join(out)


def _convert_inline(text: str, accent_color: str = "#00C73C") -> str:
    """인라인 마크다운(**bold**, *italic*) + 숫자 강조 처리."""
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    text = _highlight_numbers(text, accent_color)
    return text


def _convert_markdown_to_html(
    markdown: str,
    image_paths: dict[str, Path] | None = None,
    infographic_paths: dict[str, Path] | None = None,
    accent_color: str = "#00C73C",
) -> str:
    """마크다운 원고를 네이버 에디터 호환 HTML로 변환."""
    image_paths = image_paths or {}
    infographic_paths = infographic_paths or {}

    lines = markdown.split("\n")
    html_parts: list[str] = []
    i = 0

    pending_img_title: str | None = None
    pending_infog_title: str | None = None

    while i < len(lines):
        line = lines[i]

        # ── 이미지 플레이스홀더 처리 ────────────────────────────────────────
        img_title_match = re.match(r"\[이미지 제목:\s*(.+?)\]", line)
        if img_title_match:
            pending_img_title = img_title_match.group(1).strip()
            i += 1
            continue

        img_prompt_match = re.match(r"\[이미지 생성 프롬프트:\s*(.+?)\]", line)
        if img_prompt_match and pending_img_title:
            prompt_text = img_prompt_match.group(1).strip()
            title = pending_img_title
            path = image_paths.get(title)
            if path and Path(path).exists():
                img_src = str(path)
                html_parts.append(
                    f'<div class="frush-image-wrap">'
                    f'<img src="{img_src}" alt="{_escape_html(title)}">'
                    f'<div class="frush-image-caption">{_escape_html(title)}</div>'
                    f'</div>'
                )
            else:
                html_parts.append(
                    f'<div class="frush-image-wrap" style="background:#f0f0f0;'
                    f'padding:20px;border-radius:10px;color:#888;">'
                    f'<p style="margin:0;font-weight:700">📷 {_escape_html(title)}</p>'
                    f'<p style="margin:6px 0 0;font-size:13px">[프롬프트] {_escape_html(prompt_text)}</p>'
                    f'</div>'
                )
            pending_img_title = None
            i += 1
            continue

        # ── 인포그래픽 플레이스홀더 처리 ─────────────────────────────────────
        infog_title_match = re.match(r"\[인포그래픽 제목:\s*(.+?)\]", line)
        if infog_title_match:
            pending_infog_title = infog_title_match.group(1).strip()
            i += 1
            continue

        infog_html_match = re.match(r"\[인포그래픽 HTML:\s*(.*)", line)
        if infog_html_match and pending_infog_title:
            title = pending_infog_title
            path = infographic_paths.get(title)
            if path and Path(path).exists():
                img_src = str(path)
                html_parts.append(
                    f'<div class="frush-infographic-wrap">'
                    f'<img src="{img_src}" alt="{_escape_html(title)}" style="max-width:100%;">'
                    f'<div class="frush-image-caption">{_escape_html(title)}</div>'
                    f'</div>'
                )
            else:
                raw_html_lines = [infog_html_match.group(1)]
                i += 1
                while i < len(lines):
                    raw_html_lines.append(lines[i])
                    if lines[i].rstrip().endswith("]"):
                        raw_html_lines[-1] = lines[i].rstrip()[:-1]
                        break
                    i += 1
                inner = "\n".join(raw_html_lines).strip()
                html_parts.append(
                    f'<div class="frush-infographic-wrap">{inner}</div>'
                )
            pending_infog_title = None
            i += 1
            continue

        # ── 제목 (#, ##, ###) ────────────────────────────────────────────────
        h1_match = re.match(r"^#\s+(.+)$", line)
        if h1_match:
            html_parts.append(
                f"<h1 style='font-size:30pt;font-weight:800;margin:24px 0 16px;color:{accent_color};'>"
                f"{_convert_inline(_escape_html(h1_match.group(1)), accent_color)}</h1>"
            )
            i += 1
            continue

        h2_match = re.match(r"^##\s+(.+)$", line)
        if h2_match:
            html_parts.append(
                f"<h2 style='font-size:30pt;font-weight:800;color:{accent_color};'>"
                f"{_convert_inline(_escape_html(h2_match.group(1)), accent_color)}</h2>"
            )
            i += 1
            continue

        h3_match = re.match(r"^###\s+(.+)$", line)
        if h3_match:
            html_parts.append(
                f"<h3 style='font-size:19pt;font-weight:700;color:{accent_color};'>"
                f"{_convert_inline(_escape_html(h3_match.group(1)), accent_color)}</h3>"
            )
            i += 1
            continue

        # ── 번호 리스트 ──────────────────────────────────────────────────────
        ol_match = re.match(r"^(\d+)\.\s+(.+)$", line)
        if ol_match:
            num = ol_match.group(1)
            content = ol_match.group(2)
            html_parts.append(
                f"<p style='padding-left:20px;'>{num}. {_convert_inline(_escape_html(content), accent_color)}</p>"
            )
            i += 1
            continue

        # ── 비순서 리스트 ────────────────────────────────────────────────────
        list_match = re.match(r"^[-*]\s+(.+)$", line)
        if list_match:
            html_parts.append(
                f"<p style='padding-left:20px;'>• {_convert_inline(_escape_html(list_match.group(1)), accent_color)}</p>"
            )
            i += 1
            continue

        # ── 인용문 ───────────────────────────────────────────────────────────
        blockquote_match = re.match(r"^>\s*(.+)$", line)
        if blockquote_match:
            html_parts.append(
                f'<blockquote style="border-left:4px solid {accent_color};margin:24px 0;'
                f'padding:18px 24px;background:#f0faf3;color:#333;font-style:normal;'
                f'font-weight:bold;border-radius:0 8px 8px 0;font-size:16pt;line-height:1.7;">'
                f'{_convert_inline(_escape_html(blockquote_match.group(1)), accent_color)}'
                f'</blockquote>'
            )
            i += 1
            continue

        # ── 마크다운 테이블 → 인용구 스타일 ──────────────────────────────────
        if re.match(r"^\|.+\|$", line.strip()):
            table_lines: list[str] = []
            while i < len(lines) and re.match(r"^\|.+\|$", lines[i].strip()):
                if not re.match(r"^\|[\s\-:|]+\|$", lines[i].strip()):
                    table_lines.append(lines[i])
                i += 1
            if table_lines:
                inner_parts = []
                for tl in table_lines:
                    cells = [c.strip() for c in tl.strip().strip('|').split('|')]
                    row_text = ' &nbsp;|&nbsp; '.join(
                        _convert_inline(_escape_html(c), accent_color) for c in cells if c
                    )
                    if row_text:
                        inner_parts.append(f'<p style="margin:4px 0;">{row_text}</p>')
                if inner_parts:
                    html_parts.append(
                        f'<blockquote style="border-left:4px solid {accent_color};margin:24px 0;'
                        f'padding:18px 24px;background:#f0faf3;color:#333;font-style:normal;'
                        f'font-weight:bold;border-radius:0 8px 8px 0;font-size:16pt;line-height:1.7;">'
                        + ''.join(inner_parts)
                        + '</blockquote>'
                    )
            continue

        # ── 🚀 결론 박스 ────────────────────────────────────────────────────
        if line.startswith("🚀"):
            html_parts.append(
                f'<div class="frush-conclusion">{_convert_inline(_escape_html(line), accent_color)}</div>'
            )
            i += 1
            continue

        # ── 💡 프러쉬 제언 박스 ──────────────────────────────────────────────
        if line.startswith("💡"):
            html_parts.append(
                f'<div class="frush-tip"><strong>{_convert_inline(_escape_html(line), accent_color)}</strong>'
            )
            i += 1
            while i < len(lines):
                tip_line = lines[i]
                if tip_line.startswith("#프러쉬") or tip_line.startswith("#Frush"):
                    break
                if tip_line.strip():
                    html_parts.append(
                        f"<p>{_convert_inline(_escape_html(tip_line), accent_color)}</p>"
                    )
                i += 1
                if i < len(lines) and not lines[i].strip() and (i + 1 < len(lines)) and not lines[i + 1].strip():
                    i += 2
                    break
            html_parts.append("</div>")
            continue

        # ── 수평선 ───────────────────────────────────────────────────────────
        if re.match(r"^-{3,}$", line.strip()):
            html_parts.append("<hr>")
            i += 1
            continue

        # ── 해시태그 ─────────────────────────────────────────────────────────
        if line.strip().startswith("#") and ("프러쉬" in line or "Frush" in line):
            html_parts.append(
                f'<div class="frush-hashtags">{_escape_html(line.strip())}</div>'
            )
            i += 1
            continue

        # ── 빈 줄 ───────────────────────────────────────────────────────────
        if not line.strip():
            html_parts.append("<br>")
            i += 1
            continue

        # ── 일반 문단 ────────────────────────────────────────────────────────
        html_parts.append(f"<p>{_convert_inline(_escape_html(line), accent_color)}</p>")
        i += 1

    return "\n".join(html_parts)


def format_naver_html(
    markdown: str,
    title: str,
    image_paths: dict[str, Path] | None = None,
    infographic_paths: dict[str, Path] | None = None,
    accent_color: str = "#00C73C",
) -> str:
    """마크다운 원고를 네이버 에디터 호환 HTML로 최종 변환."""
    body_html = _convert_markdown_to_html(
        markdown, image_paths, infographic_paths, accent_color
    )
    base_style = _build_styles(accent_color)
    base_font = _build_base_font_style(accent_color)

    html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{_escape_html(title)}</title>
{base_style}
</head>
<body>
<div class="frush-post" style="{base_font}">
{body_html}
</div>
</body>
</html>"""

    return html
