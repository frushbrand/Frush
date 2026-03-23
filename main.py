#!/usr/bin/env python3
"""
main.py — 네이버 블로그 자동 작성 CLI 오케스트레이터
"""
from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path

import click

sys.path.insert(0, str(Path(__file__).parent))

from src.config import DEFAULT_BLOG_NAME, DEFAULT_REGION, DEFAULT_TOPIC, OUTPUT_DIR, validate_config
from src.content_generator import generate_blog_content, generate_blog_title
from src.image_generator import generate_all_images
from src.infographic_renderer import render_all_infographics
from src.keyword_selector import select_top_keywords
from src.naver_formatter import format_naver_html
from src.web_searcher import build_research_context


@click.command()
@click.option("--region", default=DEFAULT_REGION, show_default=True, help="지역")
@click.option("--topic", default=DEFAULT_TOPIC, show_default=True, help="블로그 주제")
@click.option("--blog-name", "blog_name", default=DEFAULT_BLOG_NAME, show_default=True, help="블로그명")
@click.option("--keywords", default=None, help="수동 키워드 지정 (쉼표 구분)")
@click.option("--skip-images", "skip_images", is_flag=True, default=False, help="이미지 생성 건너뛰기")
@click.option("--output-dir", "output_dir", default=str(OUTPUT_DIR), show_default=True, help="결과물 저장 디렉터리")
@click.option("--ending-style", "ending_style", default="formal",
              type=click.Choice(["formal", "casual", "informal"]), help="문체")
@click.option("--mood", default="professional",
              type=click.Choice(["professional", "friendly", "humorous", "serious"]), help="글 분위기")
@click.option("--accent-color", "accent_color", default="#00C73C", help="강조색 (hex)")
def cli(
    region: str, topic: str, blog_name: str, keywords: str | None,
    skip_images: bool, output_dir: str,
    ending_style: str, mood: str, accent_color: str,
) -> None:
    """네이버 블로그 글 자동 작성 도구 (Frush Blog Automation)"""

    out_base = Path(output_dir)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_dir = out_base / timestamp
    run_dir.mkdir(parents=True, exist_ok=True)
    img_dir = run_dir / "images"

    click.echo("=" * 60)
    click.echo("  🚀 프러쉬 블로그 자동 작성 시작")
    click.echo("=" * 60)

    config_warnings = validate_config(skip_images)
    if config_warnings:
        for w in config_warnings:
            click.echo(f"  ⚠️ {w}")

    # 1단계: 키워드 선정
    click.echo("\n[1/7] 🔑 키워드 선정 중...")
    if keywords:
        selected_keywords = [k.strip() for k in keywords.split(",") if k.strip()]
    else:
        try:
            selected_keywords, _ = select_top_keywords(seed=topic, region=region, topic=topic, n=2)
            click.echo(f"  ✅ 자동 선정: {selected_keywords}")
        except Exception as exc:
            click.echo(f"  ⚠️ 키워드 API 실패: {exc}")
            selected_keywords = [topic, f"{region} {topic}"]

    # 2단계: 제목 생성
    click.echo("\n[2/7] 📌 블로그 제목 생성 중...")
    try:
        blog_title = generate_blog_title(keywords=selected_keywords, topic=topic, region=region)
        click.echo(f"  ✅ 제목: {blog_title}")
    except Exception as exc:
        click.echo(f"  ⚠️ 제목 생성 실패: {exc}")
        blog_title = f"{selected_keywords[0]} — {topic} 완벽 가이드"

    # 3단계: 최신 데이터 수집
    click.echo("\n[3/7] 🌐 최신 데이터 수집 중...")
    try:
        research_context = build_research_context(selected_keywords, topic, title=blog_title)
        if research_context:
            click.echo("  ✅ 웹 검색 데이터 수집 완료")
        else:
            click.echo("  ⚠️ 웹 검색 데이터 없음")
    except Exception as exc:
        click.echo(f"  ⚠️ 웹 검색 실패: {exc}")
        research_context = ""

    # 4단계: 블로그 원고 생성
    click.echo("\n[4/7] ✍️ 블로그 원고 생성 중...")
    try:
        markdown_content = generate_blog_content(
            keywords=selected_keywords, topic=topic, region=region,
            blog_name=blog_name, research_context=research_context,
            title=blog_title, ending_style=ending_style, mood=mood,
        )
        click.echo(f"  ✅ 원고 생성 완료 ({len(markdown_content):,}자)")
    except Exception as exc:
        click.echo(f"  ❌ 원고 생성 실패: {exc}")
        sys.exit(1)

    md_path = run_dir / "draft.md"
    md_path.write_text(markdown_content, encoding="utf-8")

    # 5단계: 이미지 생성
    image_paths: dict = {}
    if not skip_images:
        click.echo("\n[5/7] 🖼️ 이미지 생성 중...")
        try:
            image_paths = generate_all_images(markdown_content, img_dir)
            click.echo(f"  ✅ 이미지 {len(image_paths)}개 생성")
        except Exception as exc:
            click.echo(f"  ⚠️ 이미지 생성 실패: {exc}")
    else:
        click.echo("\n[5/7] ⏭️ 이미지 생성 건너뜀")

    # 6단계: 인포그래픽 렌더링
    infographic_paths: dict = {}
    if not skip_images:
        click.echo("\n[6/7] 📊 인포그래픽 렌더링 중...")
        try:
            infographic_paths = render_all_infographics(markdown_content, img_dir)
            click.echo(f"  ✅ 인포그래픽 {len(infographic_paths)}개 렌더링")
        except Exception as exc:
            click.echo(f"  ⚠️ 인포그래픽 렌더링 실패: {exc}")
    else:
        click.echo("\n[6/7] ⏭️ 인포그래픽 렌더링 건너뜀")

    # 7단계: 네이버 HTML 출력
    click.echo("\n[7/7] 📝 네이버 에디터 HTML 생성 중...")
    import re
    m = re.search(r"^#\s+(.+)$", markdown_content, re.MULTILINE)
    post_title = m.group(1).strip() if m else blog_title

    try:
        naver_html = format_naver_html(
            markdown=markdown_content, title=post_title,
            image_paths=image_paths, infographic_paths=infographic_paths,
            accent_color=accent_color,
        )
        html_path = run_dir / "naver_post.html"
        html_path.write_text(naver_html, encoding="utf-8")
        click.echo(f"  ✅ 네이버 HTML 생성 완료: {html_path}")
    except Exception as exc:
        click.echo(f"  ❌ HTML 생성 실패: {exc}")
        sys.exit(1)

    click.echo("\n" + "=" * 60)
    click.echo("  🎉 블로그 포스팅 자동 작성 완료!")
    click.echo("=" * 60)


if __name__ == "__main__":
    cli()
