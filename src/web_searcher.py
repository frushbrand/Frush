"""
web_searcher.py — Tavily API를 이용한 최신 데이터 수집
할루시네이션 최소화를 위해 실제 웹 검색 결과를 LLM 컨텍스트에 주입합니다.

개선된 검색 전략:
- 생성된 제목을 기반으로 타겟팅된 검색 쿼리 생성
- 다각도 검색 (통계, 사례, 시장, 전문가 의견 등)
- 비용 효율적인 쿼리 수 제한 (최대 8개 쿼리)
"""
from __future__ import annotations

from datetime import datetime
from typing import Any

from .config import TAVILY_API_KEY


def search_recent_data(query: str, max_results: int = 5) -> list[dict[str, Any]]:
    """
    Tavily API로 쿼리에 관련된 최신 웹 문서를 검색해 반환.
    """
    if not TAVILY_API_KEY:
        return []

    try:
        from tavily import TavilyClient  # type: ignore[import-untyped]
    except ImportError as exc:
        raise ImportError(
            "tavily-python 패키지가 설치되지 않았습니다. "
            "`pip install tavily-python` 을 실행해주세요."
        ) from exc

    client = TavilyClient(api_key=TAVILY_API_KEY)
    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=max_results,
        include_answer=True,
    )

    results = []
    for r in response.get("results", []):
        results.append(
            {
                "title": r.get("title", ""),
                "url": r.get("url", ""),
                "content": r.get("content", ""),
                "score": r.get("score", 0.0),
                "published_date": r.get("published_date", ""),
            }
        )
    return results


def _generate_research_queries(
    keywords: list[str],
    topic: str,
    title: str = "",
) -> list[str]:
    """
    제목과 키워드를 기반으로 다각도 검색 쿼리를 생성.
    딥리서치 스타일로 다양한 관점에서 검색하되, 비용 효율을 위해 최대 8개로 제한.
    """
    current_year = datetime.now().year

    queries: list[str] = []

    if title:
        # 1. 제목 기반 핵심 검색 (가장 중요)
        queries.append(f"{title} {current_year}")
        # 2. 제목에서 핵심 주제를 추출해 통계 검색
        queries.append(f"{title} 통계 수치 데이터 {current_year}")
    
    # 3. 키워드 조합으로 시장/트렌드 검색
    kw_combined = " ".join(keywords[:2])
    queries.append(f"{kw_combined} 시장규모 성장률 현황 {current_year}")
    
    # 4. 성공사례/실제 결과 검색
    queries.append(f"{kw_combined} 성공사례 실제 사례 효과")
    
    # 5. 전문가 의견/보고서 검색
    queries.append(f"{topic} 전문가 분석 보고서 {current_year}")
    
    # 6. 비용/가격/ROI 관련 검색 (사람들이 가장 궁금해하는 정보)
    queries.append(f"{kw_combined} 비용 가격 평균 {current_year}")
    
    # 7. 비교/순위 검색
    queries.append(f"{kw_combined} 비교 순위 추천 {current_year}")
    
    # 8. 주의사항/실패 사례 (균형잡힌 콘텐츠를 위해)
    queries.append(f"{kw_combined} 주의사항 실패 사례 팁")

    return queries[:8]  # 최대 8개로 제한 (비용 효율)


def build_research_context(
    keywords: list[str],
    topic: str,
    title: str = "",
) -> str:
    """
    키워드·주제·제목 관련 최신 통계/자료를 수집해 LLM 프롬프트용 컨텍스트 문자열로 반환.
    제목이 있으면 제목 기반으로 더 타겟팅된 검색을 수행합니다.

    Parameters
    ----------
    keywords : list[str]
        선정된 키워드 목록
    topic : str
        블로그 주제
    title : str
        생성된 블로그 제목 (있으면 이를 기반으로 검색)

    Returns
    -------
    str
        검색 결과를 요약한 컨텍스트 문자열
    """
    queries = _generate_research_queries(keywords, topic, title)

    all_snippets: list[str] = []
    seen_urls: set[str] = set()

    for q in queries:
        results = search_recent_data(q, max_results=5)
        for r in results:
            if r["url"] not in seen_urls and r["content"]:
                seen_urls.add(r["url"])
                date_str = f", 날짜: {r['published_date']}" if r.get("published_date") else ""
                snippet = (
                    f"[출처: {r['title']} ({r['url']}){date_str}]\n"
                    f"{r['content'][:800]}"
                )
                all_snippets.append(snippet)

    if not all_snippets:
        return ""

    context = (
        "=== 최신 웹 검색 데이터 (할루시네이션 방지 — 구체적인 수치/사례/인용 위주) ===\n\n"
    )
    context += "\n\n---\n\n".join(all_snippets[:20])
    context += "\n\n=== 참고 자료 끝 ===\n"
    return context
