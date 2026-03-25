"""
keyword_selector.py — 네이버 검색광고 API를 통한 키워드 선정
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import random
import time
from typing import Any

import requests

from .config import (
    NAVER_AD_API_BASE,
    NAVER_API_KEY,
    NAVER_CUSTOMER_ID,
    NAVER_SECRET_KEY,
)


# ── 서명 생성 ──────────────────────────────────────────────────────────────────

def _sign(timestamp: str, method: str, path: str, secret_key: str) -> str:
    """네이버 검색광고 API 요청 서명 생성 (HMAC-SHA256 + Base64)."""
    message = f"{timestamp}.{method}.{path}"
    hashed = hmac.new(
        secret_key.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    )
    return base64.b64encode(hashed.digest()).decode("utf-8")


def _headers(method: str, path: str) -> dict[str, str]:
    """인증 헤더 딕셔너리 반환."""
    ts = str(int(time.time() * 1000))
    return {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Timestamp": ts,
        "X-API-KEY": NAVER_API_KEY,
        "X-Customer": NAVER_CUSTOMER_ID,
        "X-Signature": _sign(ts, method, path, NAVER_SECRET_KEY),
    }


# ── 관련 키워드 조회 ───────────────────────────────────────────────────────────

def get_related_keywords(seed: str, top_n: int = 20) -> list[dict[str, Any]]:
    """
    seed 키워드를 기반으로 연관 키워드 목록을 반환.

    Returns
    -------
    list of dict
        각 항목: {keyword, monthlyPcQcCnt, monthlyMobileQcCnt, total_monthly,
                  monthlyAvePcClkCnt, monthlyAveMobileClkCnt, ctr, competition}
    """
    path = "/keywordstool"
    params = {"hintKeywords": seed, "showDetail": 1}
    url = NAVER_AD_API_BASE + path

    try:
        resp = requests.get(
            url,
            headers=_headers("GET", path),
            params=params,
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as exc:
        raise RuntimeError(f"네이버 키워드 API 호출 실패: {exc}") from exc

    keywords: list[dict[str, Any]] = []
    for item in data.get("keywordList", []):
        monthly_pc = item.get("monthlyPcQcCnt", 0)
        monthly_mobile = item.get("monthlyMobileQcCnt", 0)
        pc_val = int(monthly_pc) if isinstance(monthly_pc, (int, float)) else 0
        mobile_val = int(monthly_mobile) if isinstance(monthly_mobile, (int, float)) else 0
        total = pc_val + mobile_val

        # 클릭 수 및 CTR 파싱
        pc_clk = item.get("monthlyAvePcClkCnt", 0)
        mobile_clk = item.get("monthlyAveMobileClkCnt", 0)
        pc_clk_f = pc_clk if isinstance(pc_clk, (int, float)) else 0
        mobile_clk_f = mobile_clk if isinstance(mobile_clk, (int, float)) else 0
        total_clk = pc_clk_f + mobile_clk_f
        # CTR = 총 클릭 수 / 총 검색량 * 100 (퍼센트), 최대 100%로 제한
        ctr = min(round(total_clk / total * 100, 2), 100.0) if total > 0 else 0.0

        keywords.append(
            {
                "keyword": item.get("relKeyword", ""),
                "monthlyPcQcCnt": monthly_pc,
                "monthlyMobileQcCnt": monthly_mobile,
                "total_monthly": total,
                "monthlyAvePcClkCnt": pc_clk,
                "monthlyAveMobileClkCnt": mobile_clk,
                "ctr": ctr,
                "competition": item.get("compIdx", ""),
            }
        )

    # 월간 총 검색량 내림차순 정렬 후 top_n 반환
    keywords.sort(key=lambda x: x["total_monthly"], reverse=True)
    return keywords[:top_n]


# ── 최적 키워드 2개 선정 ──────────────────────────────────────────────────────

def select_top_keywords(
    seed: str,
    region: str | None = None,
    topic: str | None = None,
    n: int = 2,
    min_monthly: int = 0,
    max_monthly: int | None = None,
    min_ctr: float = 0.0,
    random_mode: bool = True,
) -> tuple[list[str], list[dict]]:
    """
    주제·지역 조합으로 키워드 n개를 반환.

    Parameters
    ----------
    seed : str
        기본 시드 키워드
    region : str, optional
        지역명 (쿼리 풍부화에 사용)
    topic : str, optional
        주제 (쿼리 풍부화에 사용)
    n : int
        선정할 키워드 수
    min_monthly : int
        최소 월간 총 검색량 필터 (기본값: 0)
    max_monthly : int, optional
        최대 월간 총 검색량 필터 (기본값: 제한 없음)
    min_ctr : float
        월평균 최소 CTR (퍼센트 단위, 기본값: 0.0)
    random_mode : bool
        True이면 필터 조건에 맞는 키워드 중 랜덤으로 n개 선택 (기본값).
        False이면 검색량 상위 n개 선택.

    Returns
    -------
    tuple[list[str], list[dict]]
        (선정된 키워드 목록, 전체 조회된 키워드 데이터 목록)
    """
    # 시드 키워드를 조합하여 더 정밀한 후보군 확보
    hints = [seed]
    if region:
        hints.append(f"{region} {seed}")
    if topic:
        hints.append(f"{seed} {topic}")

    all_keywords: dict[str, dict] = {}

    for hint in hints:
        try:
            results = get_related_keywords(hint, top_n=20)
            for item in results:
                kw = item["keyword"]
                # 중복 시 검색량이 더 높은 항목으로 갱신
                if kw not in all_keywords or item["total_monthly"] > all_keywords[kw]["total_monthly"]:
                    all_keywords[kw] = item
        except RuntimeError:
            # API 호출 실패 시 해당 힌트 스킵
            continue

    if not all_keywords:
        # API를 사용할 수 없는 경우 seed 키워드 그대로 반환
        fallback = [seed]
        if region:
            fallback.append(f"{region} {seed}")
        return fallback[:n], []

    # 필터 적용
    filtered = [
        item for item in all_keywords.values()
        if item["total_monthly"] >= min_monthly
        and (max_monthly is None or item["total_monthly"] <= max_monthly)
        and item.get("ctr", 0.0) >= min_ctr
    ]

    # 필터 결과가 없으면 전체에서 선정 (폴백)
    pool = filtered if filtered else list(all_keywords.values())

    if random_mode:
        # 임의 모드: 필터 조건에 맞는 키워드 중 랜덤으로 n개 선택
        chosen = random.sample(pool, min(n, len(pool)))
    else:
        # 상위 모드: 검색량 상위 n개 선택
        chosen = sorted(pool, key=lambda x: x["total_monthly"], reverse=True)[:n]

    # 전체 조회 데이터도 함께 반환 (검색량 내림차순)
    all_sorted = sorted(all_keywords.values(), key=lambda x: x["total_monthly"], reverse=True)
    selected = [item["keyword"] for item in chosen]
    return selected, list(all_sorted)
