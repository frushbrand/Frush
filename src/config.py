"""
config.py — 환경 변수 로드 및 전역 설정
"""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

# 프로젝트 루트의 .env 파일을 자동으로 로드
load_dotenv(Path(__file__).parent.parent / ".env", override=False)

def _require(key: str) -> str:
    """환경 변수가 없으면 명확한 오류 메시지를 출력."""
    val = os.getenv(key)
    if not val:
        raise EnvironmentError(
            f"[설정 오류] 환경 변수 '{key}'가 설정되지 않았습니다.\n"
            f".env 파일 또는 .env.example 파일을 참고해 값을 채워주세요."
        )
    return val

def validate_config(skip_images: bool = False) -> list[str]:
    """필수 설정값 검증. 누락된 키 목록을 반환."""
    warnings: list[str] = []

    if not GOOGLE_AI_API_KEY:
        warnings.append("GOOGLE_AI_API_KEY가 설정되지 않았습니다. (필수)")

    if not NAVER_API_KEY or not NAVER_SECRET_KEY or not NAVER_CUSTOMER_ID:
        warnings.append(
            "네이버 검색광고 API 키가 완전하지 않습니다. "
            "(키워드 자동 선정 불가 → 수동 키워드 사용)"
        )

    if not TAVILY_API_KEY:
        warnings.append("TAVILY_API_KEY가 설정되지 않았습니다. (웹 검색 데이터 수집 불가)")

    return warnings

# ── Naver Search Ads API ───────────────────────────────────────────────────────
NAVER_API_KEY: str = os.getenv("NAVER_API_KEY", "")
NAVER_SECRET_KEY: str = os.getenv("NAVER_SECRET_KEY", "")
NAVER_CUSTOMER_ID: str = os.getenv("NAVER_CUSTOMER_ID", "")
NAVER_AD_API_BASE: str = "https://api.searchad.naver.com"

# ── Google AI (Gemini) API ────────────────────────────────────────────────────
# NANOBANANA_API_KEY는 이전 버전에서 마이그레이션하는 경우를 위한 폴백입니다.
# 신규 설정 시에는 반드시 GOOGLE_AI_API_KEY를 사용하세요.
GOOGLE_AI_API_KEY: str = os.getenv("GOOGLE_AI_API_KEY", "") or os.getenv("NANOBANANA_API_KEY", "")
GEMINI_TEXT_MODEL: str = os.getenv("GEMINI_TEXT_MODEL", "gemini-2.0-flash")
GEMINI_IMAGE_MODEL: str = os.getenv("GEMINI_IMAGE_MODEL", "gemini-2.0-flash-exp")

# ── Tavily Search API ─────────────────────────────────────────────────────────
TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "")

# ── 출력 디렉터리 ────────────────────────────────────────────────────────────
OUTPUT_DIR: Path = Path(os.getenv("OUTPUT_DIR", "output"))

# ── 블로그 기본 설정 ──────────────────────────────────────────────────────────
DEFAULT_BLOG_NAME: str = os.getenv("DEFAULT_BLOG_NAME", "프러쉬(Frush) 마케팅 블로그")
DEFAULT_REGION: str = os.getenv("DEFAULT_REGION", "서울")
DEFAULT_TOPIC: str = os.getenv("DEFAULT_TOPIC", "마케팅")

# ── 문체/어체 기본 설정 ───────────────────────────────────────────────────────
DEFAULT_ENDING_STYLE: str = "formal"       # formal(~입니다), casual(~에요), informal(~야/~다)
DEFAULT_WRITER_GENDER: str = "neutral"     # neutral, male, female
DEFAULT_WRITER_AGE: str = "30대"           # 20대, 30대, 40대, 50대
DEFAULT_MOOD: str = "professional"         # professional, friendly, humorous, serious
DEFAULT_ACCENT_COLOR: str = "#00C73C"