#!/usr/bin/env python3
"""
web_app.py — 네이버 블로그 자동 작성 시스템 웹 GUI

실행:
    python web_app.py
    브라우저에서 http://localhost:5000 접속
"""
from __future__ import annotations

import json
import queue
import sys
import threading
import time
import traceback
import uuid
from datetime import datetime
from pathlib import Path

from flask import Flask, Response, render_template, request, send_file

sys.path.insert(0, str(Path(__file__).parent))

from src.config import DEFAULT_BLOG_NAME, DEFAULT_REGION, DEFAULT_TOPIC, OUTPUT_DIR, validate_config
from src.content_generator import generate_blog_content, generate_blog_title
from src.image_generator import generate_all_images
from src.infographic_renderer import render_all_infographics
from src.keyword_selector import select_top_keywords
from src.naver_formatter import format_naver_html
from src.web_searcher import build_research_context

app = Flask(__name__)

# ── 실행 중인 작업 저장소 (메모리) ───────────────────────────────────────────
_jobs: dict[str, dict] = {}
_job_queues: dict[str, queue.Queue] = {}
_JOB_CLEANUP_DELAY_SECONDS = 300


# ── 제목 추출 ────────────────────────────────────────────────────────────────

def _extract_title(markdown: str, fallback: str) -> str:
    import re
    # 패턴 1: # 제목 형식
    m = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    if m:
        title = m.group(1).strip()
        title = re.sub(r"\*\*(.+?)\*\*", r"\1", title)
        return title
    # 패턴 2: **제목: '...'** 형식
    m = re.search(r"\*\*제목\s*:\s*['\"]?(.+?)['\"]?\*\*", markdown)
    if m:
        return m.group(1).strip()
    return f"{fallback} — 프러쉬 마케팅 블로그"


# ── 백그라운드 작업 실행 ──────────────────────────────────────────────────────

def _run_job(job_id: str, params: dict) -> None:
    """백그라운드 스레드에서 블로그 생성 파이프라인을 실행합니다."""
    q = _job_queues[job_id]
    job = _jobs[job_id]

    TOTAL_STEPS = 7

    def emit(step: int, total: int, status: str, message: str, data: dict | None = None):
        q.put({
            "step": step, "total": total, "status": status,
            "message": message, "data": data or {},
        })

    def emit_log(level: str, message: str):
        q.put({
            "status": "log", "level": level, "message": message,
            "timestamp": datetime.now().strftime("%H:%M:%S"),
        })

    def check_cancel() -> bool:
        if job.get("cancel", False):
            q.put({
                "step": -1, "total": TOTAL_STEPS, "status": "fatal",
                "message": "⏹ 작업이 사용자에 의해 중지되었습니다.", "data": {},
            })
            return True
        return False

    q.put({"status": "log", "level": "info", "message": "작업 스레드 시작됨",
           "timestamp": datetime.now().strftime("%H:%M:%S")})

    try:
        region = params.get("region", DEFAULT_REGION)
        topic = params.get("topic", DEFAULT_TOPIC)
        blog_name = params.get("blog_name", DEFAULT_BLOG_NAME)
        keywords_raw = params.get("keywords", "").strip()
        skip_images = not params.get("generate_images", True)

        # 문체/어체 설정
        ending_style = params.get("ending_style", "formal")
        writer_gender = params.get("writer_gender", "neutral")
        writer_age = params.get("writer_age", "30대")
        mood = params.get("mood", "professional")
        accent_color = params.get("accent_color", "#00C73C")

        # 키워드 필터 설정
        try:
            min_monthly = int(params.get("min_monthly") or 0)
        except (ValueError, TypeError):
            min_monthly = 0
        try:
            max_monthly_raw = params.get("max_monthly", None)
            max_monthly = int(max_monthly_raw) if max_monthly_raw not in (None, "", "0") else None
        except (ValueError, TypeError):
            max_monthly = None
        try:
            min_ctr = float(params.get("min_ctr") or 0.0)
        except (ValueError, TypeError):
            min_ctr = 0.0

        random_mode = params.get("random_mode", True)
        if isinstance(random_mode, str):
            random_mode = random_mode.lower() not in ("false", "0", "no")

        out_base = Path(OUTPUT_DIR)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        run_dir = out_base / timestamp
        run_dir.mkdir(parents=True, exist_ok=True)
        img_dir = run_dir / "images"

        job["run_dir"] = str(run_dir)

        config_warnings = validate_config(skip_images)
        if config_warnings:
            emit(0, TOTAL_STEPS, "running",
                 "⚠️ 설정 경고:\n" + "\n".join(f"• {w}" for w in config_warnings))

        # ── 1단계: 키워드 선정 ────────────────────────────────────────────────
        emit(1, TOTAL_STEPS, "running", "🔑 키워드 선정 중...")
        emit_log("info", f"[1단계] 키워드 선정 시작")
        selected_keywords: list[str] = []
        keyword_data: list[dict] = []

        if keywords_raw:
            selected_keywords = [k.strip() for k in keywords_raw.split(",") if k.strip()]
            emit(1, TOTAL_STEPS, "done", f"✅ 수동 키워드 사용: {', '.join(selected_keywords)}")
            emit_log("info", f"[1단계] 수동 키워드: {', '.join(selected_keywords)}")
        else:
            try:
                selected_keywords, keyword_data = select_top_keywords(
                    seed=topic, region=region, topic=topic, n=2,
                    min_monthly=min_monthly, max_monthly=max_monthly,
                    min_ctr=min_ctr, random_mode=random_mode,
                )
                emit_log("info", f"[1단계] 키워드 API 완료 — 선정: {selected_keywords}")
                emit(1, TOTAL_STEPS, "done", f"✅ 자동 선정 키워드: {', '.join(selected_keywords)}")
                if keyword_data:
                    q.put({
                        "step": 1, "total": TOTAL_STEPS, "status": "keyword_data",
                        "message": "키워드 조회 결과",
                        "data": {"keyword_list": keyword_data, "selected_keywords": selected_keywords},
                    })
            except Exception as exc:
                emit_log("error", f"[1단계] 키워드 API 실패:\n{traceback.format_exc()}")
                emit(1, TOTAL_STEPS, "error", f"⚠️ 키워드 API 실패: {exc} → 기본 키워드 사용")
                selected_keywords = [topic, f"{region} {topic}"]

        job["keywords"] = selected_keywords
        job["keyword_data"] = keyword_data
        if check_cancel():
            return

        # ── 2단계: 제목 생성 (Gemini) ──────────────────────────────────────────
        emit(2, TOTAL_STEPS, "running", "📌 블로그 제목 생성 중 (Gemini)...")
        emit_log("info", f"[2단계] 제목 생성 시작 — 키워드: {selected_keywords}")
        blog_title = ""
        try:
            blog_title = generate_blog_title(
                keywords=selected_keywords,
                topic=topic,
                region=region,
            )
            emit_log("info", f"[2단계] 제목 생성 완료: {blog_title}")
            emit(2, TOTAL_STEPS, "done", f"✅ 제목: {blog_title}")
        except Exception as exc:
            emit_log("error", f"[2단계] 제목 생성 실패:\n{traceback.format_exc()}")
            emit(2, TOTAL_STEPS, "error", f"⚠️ 제목 생성 실패: {exc} → 키워드 기반 폴백")
            blog_title = f"{selected_keywords[0]} — {topic} 완벽 가이드"

        if check_cancel():
            return

        # ── 3단계: 최신 데이터 수집 (제목 기반) ──────────────────────────────────
        emit(3, TOTAL_STEPS, "running", "🌐 최신 데이터 수집 중 (제목 기반 타겟팅)...")
        emit_log("info", f"[3단계] 웹 검색 시작 — 제목: {blog_title}")
        research_context = ""
        try:
            research_context = build_research_context(
                selected_keywords, topic, title=blog_title,
            )
            if research_context:
                snippet_count = research_context.count("\n\n")
                emit_log("info", f"[3단계] 웹 검색 완료 — {len(research_context):,}자 (약 {snippet_count}개 단락)")
                emit(3, TOTAL_STEPS, "done", "✅ 웹 검색 데이터 수집 완료")
            else:
                emit_log("warn", "[3단계] 웹 검색 결과 없음")
                emit(3, TOTAL_STEPS, "skip", "⚠️ 웹 검색 데이터 없음 (Tavily API 키 확인)")
        except Exception as exc:
            emit_log("error", f"[3단계] 웹 검색 실패:\n{traceback.format_exc()}")
            emit(3, TOTAL_STEPS, "error", f"⚠️ 웹 검색 실패: {exc}")

        if check_cancel():
            return

        # ── 4단계: 블로그 원고 생성 ───────────────────────────────────────────────
        emit(4, TOTAL_STEPS, "running", "✍️ 블로그 원고 생성 중 (Gemini)...")
        emit_log("info", f"[4단계] 원고 생성 시작 — 제목: {blog_title}")
        markdown_content = ""
        try:
            markdown_content = generate_blog_content(
                keywords=selected_keywords,
                topic=topic,
                region=region,
                blog_name=blog_name,
                research_context=research_context,
                title=blog_title,
                ending_style=ending_style,
                writer_gender=writer_gender,
                writer_age=writer_age,
                mood=mood,
            )
            md_path = run_dir / "draft.md"
            md_path.write_text(markdown_content, encoding="utf-8")
            emit_log("info", f"[4단계] 원고 생성 완료 — {len(markdown_content):,}자")
            emit(4, TOTAL_STEPS, "done", f"✅ 원고 생성 완료 ({len(markdown_content):,}자)")
            job["markdown"] = markdown_content
        except Exception as exc:
            error_detail = traceback.format_exc()
            emit_log("error", f"[4단계] 원고 생성 실패:\n{error_detail}")
            emit(4, TOTAL_STEPS, "error", f"❌ 원고 생성 실패: {exc}")
            q.put({"step": -1, "total": TOTAL_STEPS, "status": "fatal",
                   "message": str(exc), "data": {"traceback": error_detail}})
            return

        if check_cancel():
            return

        # ── 5단계: 이미지 생성 ────────────────────────────────────────────────────
        image_paths: dict = {}
        if not skip_images:
            emit(5, TOTAL_STEPS, "running", "🖼️ 이미지 생성 중 (Google Gemini)...")
            emit_log("info", "[5단계] 이미지 생성 시작")
            try:
                image_paths = generate_all_images(markdown_content, img_dir)
                emit_log("info", f"[5단계] 이미지 생성 완료 — {len(image_paths)}개")
                emit(5, TOTAL_STEPS, "done", f"✅ 이미지 {len(image_paths)}개 생성 완료")
            except Exception as exc:
                emit_log("error", f"[5단계] 이미지 생성 실패:\n{traceback.format_exc()}")
                emit(5, TOTAL_STEPS, "error", f"⚠️ 이미지 생성 실패: {exc}")
        else:
            emit(5, TOTAL_STEPS, "skip", "⏭️ 이미지 생성 건너뜀")

        if check_cancel():
            return

        # ── 6단계: 인포그래픽 렌더링 ─────────────────────────────────────────────
        infographic_paths: dict = {}
        if not skip_images:
            emit(6, TOTAL_STEPS, "running", "📊 인포그래픽 렌더링 중 (HTML → PNG)...")
            emit_log("info", "[6단계] 인포그래픽 렌더링 시작")
            try:
                infographic_paths = render_all_infographics(markdown_content, img_dir)
                emit_log("info", f"[6단계] 인포그래픽 {len(infographic_paths)}개 렌더링 완료")
                emit(6, TOTAL_STEPS, "done", f"✅ 인포그래픽 {len(infographic_paths)}개 렌더링 완료")
            except Exception as exc:
                emit_log("error", f"[6단계] 인포그래픽 렌더링 실패:\n{traceback.format_exc()}")
                emit(6, TOTAL_STEPS, "error", f"⚠️ 인포그래픽 렌더링 실패: {exc}")
        else:
            emit(6, TOTAL_STEPS, "skip", "⏭️ 인포그래픽 렌더링 건너뜀")

        if check_cancel():
            return

        # ── 7단계: 네이버 HTML 생성 ───────────────────────────────────────────────
        emit(7, TOTAL_STEPS, "running", "📝 네이버 에디터 HTML 생성 중...")
        post_title = _extract_title(markdown_content, topic)
        emit_log("info", f"[7단계] 네이버 HTML 생성 — 제목: {post_title}")
        try:
            naver_html = format_naver_html(
                markdown=markdown_content,
                title=post_title,
                image_paths=image_paths,
                infographic_paths=infographic_paths,
                accent_color=accent_color,
            )
            html_path = run_dir / "naver_post.html"
            html_path.write_text(naver_html, encoding="utf-8")
            emit_log("info", f"[7단계] 네이버 HTML 생성 완료 — {len(naver_html):,}자")
            emit(7, TOTAL_STEPS, "done", "✅ 네이버 HTML 생성 완료")
            job["naver_html"] = naver_html
            job["post_title"] = post_title
        except Exception as exc:
            error_detail = traceback.format_exc()
            emit_log("error", f"[7단계] 네이버 HTML 생성 실패:\n{error_detail}")
            emit(7, TOTAL_STEPS, "error", f"❌ HTML 생성 실패: {exc}")
            q.put({"step": -1, "total": TOTAL_STEPS, "status": "fatal",
                   "message": str(exc), "data": {"traceback": error_detail}})
            return

        # 이미지 경로 저장
        all_image_paths: list[dict] = []
        for title_key, path in {**image_paths, **infographic_paths}.items():
            all_image_paths.append({"title": title_key, "path": str(path)})
        job["image_paths"] = all_image_paths

        # 완료 이벤트
        q.put({
            "step": TOTAL_STEPS, "total": TOTAL_STEPS, "status": "complete",
            "message": "🎉 블로그 포스팅 자동 작성 완료!",
            "data": {
                "post_title": post_title,
                "keywords": selected_keywords,
                "keyword_data": keyword_data,
                "markdown": markdown_content,
                "naver_html": naver_html,
                "image_paths": all_image_paths,
                "run_dir": str(run_dir),
            },
        })

    except Exception as exc:
        error_detail = traceback.format_exc()
        print(f"[ERROR] Job {job_id} 실패:\n{error_detail}")
        try:
            emit_log("error", f"예상치 못한 오류:\n{error_detail}")
            q.put({
                "step": -1, "total": TOTAL_STEPS, "status": "fatal",
                "message": f"❌ 예상치 못한 오류 발생: {exc}",
                "data": {"traceback": error_detail},
            })
        except Exception:
            pass


# ── Flask 라우트 ──────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_job():
    """새 블로그 생성 작업을 시작합니다."""
    data = request.get_json(force=True) or {}
    job_id = str(uuid.uuid4())

    _jobs[job_id] = {"status": "running", "run_dir": None, "cancel": False}
    _job_queues[job_id] = queue.Queue()

    thread = threading.Thread(target=_run_job, args=(job_id, data), daemon=True)
    thread.start()

    return {"job_id": job_id}


@app.route("/cancel/<job_id>", methods=["POST"])
def cancel_job(job_id: str):
    """실행 중인 작업을 취소합니다."""
    job = _jobs.get(job_id)
    if not job:
        return {"error": "job not found"}, 404
    job["cancel"] = True
    return {"status": "cancel_requested"}


@app.route("/fetch_keywords", methods=["POST"])
def fetch_keywords():
    """키워드 API를 조회해 전체 목록을 반환합니다."""
    data = request.get_json(force=True) or {}
    region = data.get("region", DEFAULT_REGION)
    topic = data.get("topic", DEFAULT_TOPIC)

    try:
        min_monthly = int(data.get("min_monthly") or 0)
    except (ValueError, TypeError):
        min_monthly = 0
    try:
        max_monthly_raw = data.get("max_monthly", None)
        max_monthly = int(max_monthly_raw) if max_monthly_raw not in (None, "", "0") else None
    except (ValueError, TypeError):
        max_monthly = None
    try:
        min_ctr = float(data.get("min_ctr") or 0.0)
    except (ValueError, TypeError):
        min_ctr = 0.0

    try:
        _, keyword_data = select_top_keywords(
            seed=topic, region=region, topic=topic, n=2,
            min_monthly=min_monthly, max_monthly=max_monthly,
            min_ctr=min_ctr, random_mode=False,
        )
        return {"keyword_list": keyword_data}
    except Exception as exc:
        return {"error": str(exc), "keyword_list": []}, 200


@app.route("/stream/<job_id>")
def stream(job_id: str):
    """SSE 스트림으로 작업 진행 상황을 전송합니다."""
    if job_id not in _job_queues:
        return Response("data: {\"error\": \"job not found\"}\n\n", mimetype="text/event-stream")

    def generate():
        q = _job_queues[job_id]
        empty_count = 0
        max_empty = 20
        timeout_secs = 30
        yield "data: {\"status\": \"ping\"}\n\n"
        while True:
            try:
                event = q.get(timeout=timeout_secs)
                empty_count = 0
                yield f"data: {json.dumps(event, ensure_ascii=False)}\n\n"
                if event.get("status") in ("complete", "fatal"):
                    def cleanup(jid=job_id):
                        time.sleep(_JOB_CLEANUP_DELAY_SECONDS)
                        _job_queues.pop(jid, None)
                    threading.Thread(target=cleanup, daemon=True).start()
                    break
            except queue.Empty:
                empty_count += 1
                if empty_count >= max_empty:
                    max_wait_min = max_empty * timeout_secs // 60
                    yield f'data: {json.dumps({"status": "fatal", "message": f"⏱ 작업 시간 초과 ({max_wait_min}분)"}, ensure_ascii=False)}\n\n'
                    break
                yield "data: {\"status\": \"ping\"}\n\n"

    return Response(generate(), mimetype="text/event-stream",
                    headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@app.route("/download/<job_id>/<filename>")
def download(job_id: str, filename: str):
    """생성된 파일을 다운로드합니다."""
    job = _jobs.get(job_id)
    if not job or not job.get("run_dir"):
        return "작업을 찾을 수 없습니다.", 404

    allowed = {"draft.md", "naver_post.html"}
    if filename not in allowed:
        return "허용되지 않은 파일입니다.", 403

    file_path = Path(job["run_dir"]) / filename
    if not file_path.exists():
        return "파일이 존재하지 않습니다.", 404

    return send_file(str(file_path), as_attachment=True, download_name=filename)


@app.route("/image/<job_id>/<path:filename>")
def serve_image(job_id: str, filename: str):
    """생성된 이미지를 서빙합니다."""
    job = _jobs.get(job_id)
    if not job or not job.get("run_dir"):
        return "작업을 찾을 수 없습니다.", 404

    run_dir = Path(job["run_dir"]).resolve()
    img_path = (run_dir / "images" / filename).resolve()
    if not img_path.is_relative_to(run_dir):
        return "허용되지 않은 경로입니다.", 403

    if not img_path.exists():
        return "파일이 존재하지 않습니다.", 404

    return send_file(str(img_path))


# ── 진입점 ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("  🚀 프러쉬 블로그 자동 작성 웹 GUI")
    print("=" * 60)
    print("  브라우저에서 http://localhost:5000 으로 접속하세요.")
    print("  종료하려면 Ctrl+C 를 누르세요.")
    print("=" * 60)
    app.run(host="0.0.0.0", port=5000, debug=False, threaded=True)
