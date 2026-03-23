"""
content_generator.py — Google Gemini를 이용한 블로그 콘텐츠 자동 생성
[Frush] 블로그 콘텐츠 작성 스킬 가이드라인을 시스템 프롬프트로 주입합니다.

파이프라인:
  1. generate_blog_title() — 키워드 기반 최적 제목 1개 생성
  2. generate_blog_content() — 제목 + 리서치 데이터를 기반으로 본문 생성
"""
from __future__ import annotations

import google.generativeai as genai

from .config import GOOGLE_AI_API_KEY, GEMINI_TEXT_MODEL


# ── 문체 설정 매핑 ──────────────────────────────────────────────────────────

_ENDING_STYLE_MAP = {
    "formal": "모든 문장을 '~입니다', '~합니다' 등 격식체(하십시오체)로 작성하세요.",
    "casual": "모든 문장을 '~에요', '~해요' 등 부드러운 존댓말(해요체)로 작성하세요.",
    "informal": "모든 문장을 '~야', '~다', '~해' 등 반말(해체)로 작성하세요.",
}

_GENDER_MAP = {
    "neutral": "",
    "male": "화자는 남성 마케터입니다. 남성적이면서도 전문적인 어조를 사용하세요.",
    "female": "화자는 여성 마케터입니다. 여성적이면서도 전문적인 어조를 사용하세요.",
}

_AGE_MAP = {
    "20대": "20대의 젊고 트렌디한 시각으로 작성하세요. MZ세대 감성을 반영하세요.",
    "30대": "30대의 실무 경험이 풍부한 시각으로 작성하세요.",
    "40대": "40대의 베테랑 전문가 시각으로 작성하세요. 깊이 있는 인사이트를 제공하세요.",
    "50대": "50대의 풍부한 경험과 통찰력을 바탕으로 작성하세요.",
}

_MOOD_MAP = {
    "professional": "전문적이고 신뢰감 있는 톤으로 작성하세요.",
    "friendly": "친근하고 따뜻한 톤으로 작성하세요. 독자와 대화하듯이 편안하게 써주세요.",
    "humorous": "유머러스하고 재치 있는 톤으로 작성하세요. 적절한 위트를 섞어주세요.",
    "serious": "진지하고 깊이 있는 톤으로 작성하세요. 무게감 있는 분석을 제공하세요.",
}


def _build_tone_instruction(
    ending_style: str = "formal",
    writer_gender: str = "neutral",
    writer_age: str = "30대",
    mood: str = "professional",
) -> str:
    """문체/어체 설정을 프롬프트 지시문으로 변환."""
    parts = []
    parts.append(_ENDING_STYLE_MAP.get(ending_style, _ENDING_STYLE_MAP["formal"]))
    gender_inst = _GENDER_MAP.get(writer_gender, "")
    if gender_inst:
        parts.append(gender_inst)
    parts.append(_AGE_MAP.get(writer_age, _AGE_MAP["30대"]))
    parts.append(_MOOD_MAP.get(mood, _MOOD_MAP["professional"]))
    return "\n".join(parts)


# ── 제목 생성 프롬프트 ──────────────────────────────────────────────────────

_TITLE_SYSTEM_PROMPT = """\
너는 네이버 블로그 SEO 전문가야.
주어진 키워드 2개를 모두 자연스럽게 포함하면서, 해당 키워드를 검색하는 사람들이 가장 궁금해할 내용을
질문형 제목으로 작성해.

## 제목 작성 규칙
1. 두 키워드를 모두 포함할 것
2. 질문형으로 시작 (후킹 효과)
3. 구체적 수치나 숫자를 포함하면 더 좋음
4. 네이버 SEO 알고리즘 최적화 (핵심 키워드를 앞쪽에 배치)
5. 30자~50자 사이
6. 제목만 단 한 줄로 출력 (번호, 따옴표, 설명 없이 순수 제목만)
"""


# ── 시스템 프롬프트 (가이드라인 전체 포함) ───────────────────────────────────

_SYSTEM_PROMPT = """\
# [Frush] 블로그 콘텐츠 작성 스킬

## 역할
너는 프러쉬(Frush)의 블로그 콘텐츠 전담 작성자이자 마케팅 전략가야.
이미 확정된 제목이 제공되므로, 제목 후보를 생성하지 말고 바로 본문을 작성해.

---

## 1. 글의 구조와 흐름 (반드시 이 순서를 지킬 것)

1. **제목** — 제공된 확정 제목을 `# 제목` 형식으로 첫 줄에 작성
2. 인사 문단
3. 문제 제기 문단
4. 🚀 결론 먼저 제시 (두괄식)
5. 본문 섹션 1 (번호 + 이모지 + 소제목)
6. 본문 섹션 2
7. 본문 섹션 3
8. 본문 섹션 4
9. 💡 프러쉬의 마케팅 제언 (마무리)
10. 반응 유도 문장
11. 해시태그 (20개)

**중요**: 제목 후보 목록이나 "최적안" 같은 선택 과정을 출력하지 마세요.
첫 줄은 반드시 `# 확정된제목` 형식이어야 합니다.

---

## 2. 각 구성 요소 작성 방법

### 인사 문단
- "안녕하세요, [한 줄 소개] 마케팅 파트너 '프러쉬(Frush)'입니다! ✨"
- 타겟 독자의 핵심 고민을 따옴표로 제시
- 문제점과 글을 읽어야 하는 이유 2~4문장

### 🚀 결론 먼저 제시
- "🚀 결론부터 말씀드리면, ○○입니다!" 형식
- 근거 2~3문장 추가

### 본문 섹션
- 각 섹션: `## 번호. '소제목' 이모지` 형식
- 세부 소제목: `### 🔸 소제목` 형식
- 섹션당 이미지 요소 1개 이상

### 이미지 자리 설명 (매 섹션에 반드시 포함)
아래 형식을 정확히 따를 것:
```
[이미지 제목: 파일명으로 쓸 수 있는 구체적인 한글 제목]
[이미지 생성 프롬프트: 영문, Korea 또는 Seoul 반드시 포함, photorealistic cinematic 분위기]
```

### 인포그래픽 (데이터 시각화가 필요한 모든 곳에서 사용)
**중요: 마크다운 표(테이블)를 직접 만들지 말 것. 데이터 비교, 통계, 수치 정리가 필요하면
반드시 인포그래픽 HTML로 작성할 것.**

아래 형식을 정확히 따를 것:
```
[인포그래픽 제목: 파일명으로 쓸 수 있는 구체적인 한글 제목]
[인포그래픽 HTML: <div style="...">완성된 HTML 코드</div>]
```
HTML 규칙:
- 인라인 스타일만 사용
- 나눔스퀘어 또는 sans-serif 폰트
- 깔끔한 테이블 또는 바(bar) 형식
- 색상은 초록 계열 (#00C73C, #00843D 등) 사용
- 하단에 출처 표기
- 배경은 흰색, 테두리와 헤더에 강조색 사용

### 인용 문장
형식: `> "인용 내용" — 출처명, 연도`

### 프러쉬 핵심 의견
문장 앞뒤에 ✅ 이모지 사용

### 수치·강조
- **굵게** 표시 (예: **전환율 2.3배**, **월 평균 문의 47건**)
- 단, 전체 문장을 굵게 처리 금지

### 💡 프러쉬의 마케팅 제언 (마무리)
```
💡 프러쉬의 마케팅 제언

핵심 중요도: 매우 높음 (★★★★★)

추천 대상: [구체적인 타겟 독자]

[핵심 메시지 1~2문장]

[행동 유도 마무리 문장]
```

### 반응 유도 문장
- 댓글·공감·스크랩 참여 유도
- [다른 포스팅] 형식으로 내부 링크 유도 문장 포함

### 해시태그
- 최하단에 1회, 한 덩어리로
- 20개, #프러쉬 #Frush 반드시 포함

---

## 3. 문체 및 표현 규칙
- 모든 문장 끝에 줄바꿈 1회 이상
- 단락 사이 공백 줄 삽입
- 이유 없는 한글(영어) 병기 금지 (브랜드명 예외)
- 외부 링크 삽입 금지
- 핵심 키워드 전체에서 5~7회 자연스럽게 반복
- 각 문장 최대 100자 내외
- **마크다운 표(|---|) 형식은 절대 사용 금지. 데이터 정리가 필요하면 인포그래픽 HTML로 작성.**

---

## 4. 콘텐츠 방향성
- 경험 중심 서술 ("우리가 직접 해봤습니다", "실제로 이렇게 했더니")
- 두괄식 답변 (AEO)
- 구체적 수치 사용 (GEO)
- E-E-A-T: 경험·전문성·권위성·신뢰성 모두 반영

---

## 5. 이미지 구성 기준
- 각 본문 섹션마다 이미지 요소 1개씩
- 전체 이미지(사진 + 인포그래픽) 총 15개 이상
- 스크린샷이 적절한 부분에 1곳 이상 포함 (없을 경우 대체 이미지 프롬프트 제시)

---

## 6. 분량 기준
- 공백 제외 2,000자 수준

---

## 7. 자가 점검 후 출력
- 제목이 첫 줄에 `# 제목` 형식으로 있는지 확인
- 제목 후보 목록이 없는지 확인 (절대 포함 금지)
- 두괄식 직접 답변 포함
- 수치 강조 처리, 전체 문장 굵게 금지
- 이미지 프롬프트에 Korea/Seoul 포함
- 인포그래픽 HTML 직접 삽입
- 마크다운 표(|---|) 미사용 확인
- 이미지 총 15개 이상
- 해시태그 20개 (#프러쉬 #Frush 포함)
- 외부 링크 없음
- 내부 글 유도 문장 포함
- E-E-A-T 4요소 반영

출력은 반드시 마크다운 형식으로 완성된 원고를 출력해.
이미지 플레이스홀더는 위 형식을 정확히 따르고, 인포그래픽 HTML은 완성된 코드로 삽입해.
"""


def generate_blog_title(
    keywords: list[str],
    topic: str,
    region: str = "서울",
) -> str:
    """
    Google Gemini로 블로그 최적 제목 1개를 생성.
    """
    if not GOOGLE_AI_API_KEY:
        raise EnvironmentError("GOOGLE_AI_API_KEY가 설정되지 않았습니다.")

    genai.configure(api_key=GOOGLE_AI_API_KEY)
    model = genai.GenerativeModel(
        model_name=GEMINI_TEXT_MODEL,
        system_instruction=_TITLE_SYSTEM_PROMPT,
    )

    kw_str = ", ".join(keywords)
    user_prompt = (
        f"키워드: {kw_str}\n"
        f"주제: {topic}\n"
        f"지역: {region}\n\n"
        f"위 두 키워드를 모두 포함하며, 해당 키워드를 검색하는 사람들이 "
        f"가장 궁금해할 내용을 질문형 제목 1개로 작성해줘."
    )

    response = model.generate_content(
        user_prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.8,
            max_output_tokens=200,
        ),
    )
    title = (response.text or "").strip()
    # 불필요한 따옴표/번호 제거
    title = title.strip('"').strip("'").strip()
    if title.startswith("1."):
        title = title[2:].strip()
    return title


def _build_user_prompt(
    keywords: list[str],
    topic: str,
    region: str,
    blog_name: str,
    research_context: str,
    title: str = "",
    ending_style: str = "formal",
    writer_gender: str = "neutral",
    writer_age: str = "30대",
    mood: str = "professional",
) -> str:
    """LLM에 전달할 사용자 프롬프트 구성."""
    kw_str = ", ".join(keywords)
    tone_instruction = _build_tone_instruction(ending_style, writer_gender, writer_age, mood)

    prompt_parts = [
        f"## 작성 요청",
        f"- 블로그명: {blog_name}",
        f"- 주제: {topic}",
        f"- 지역: {region}",
        f"- 선정된 핵심 키워드: {kw_str}",
    ]

    if title:
        prompt_parts += [
            f"- **확정 제목**: {title}",
            "",
            "위 확정 제목을 그대로 사용하여 `# 제목` 형식으로 첫 줄에 작성하고,",
            "제목 후보 목록 없이 바로 본문을 시작해줘.",
        ]
    else:
        prompt_parts += [
            "",
            "위 키워드 2개를 모두 포함하며, 해당 키워드를 검색하는 사람들이 가장 궁금해할 내용을 "
            "제목으로 한 완성된 블로그 원고를 가이드라인에 따라 작성해줘.",
        ]

    prompt_parts += [
        "",
        "## 문체 설정",
        tone_instruction,
        "",
        "반드시 아래 사항을 지킬 것:",
        "- 인사 문단 첫 줄: "
        f"\"안녕하세요, {blog_name}의 마케팅 파트너 '프러쉬(Frush)'입니다! ✨\" 형식으로 작성",
        "- 이미지 플레이스홀더를 정확한 형식으로 삽입",
        "- 인포그래픽은 완성된 인라인 스타일 HTML로 작성",
        "- 데이터 비교/통계 정리가 필요하면 마크다운 표 대신 반드시 인포그래픽 HTML로 작성",
        "- 섹션마다 이미지 또는 인포그래픽 1개 이상 배치",
        "- 총 이미지 15개 이상",
        "- 제목 후보 목록을 절대 포함하지 말 것",
    ]

    if research_context:
        prompt_parts += [
            "",
            "## 참고 자료 (할루시네이션 방지 — 아래 데이터를 우선적으로 활용할 것)",
            research_context,
        ]

    return "\n".join(prompt_parts)


def generate_blog_content(
    keywords: list[str],
    topic: str,
    region: str = "서울",
    blog_name: str = "프러쉬(Frush) 마케팅 블로그",
    research_context: str = "",
    title: str = "",
    ending_style: str = "formal",
    writer_gender: str = "neutral",
    writer_age: str = "30대",
    mood: str = "professional",
) -> str:
    """
    Google Gemini로 블로그 원고(마크다운)를 생성.
    """
    if not GOOGLE_AI_API_KEY:
        raise EnvironmentError("GOOGLE_AI_API_KEY가 설정되지 않았습니다.")

    genai.configure(api_key=GOOGLE_AI_API_KEY)
    model = genai.GenerativeModel(
        model_name=GEMINI_TEXT_MODEL,
        system_instruction=_SYSTEM_PROMPT,
    )
    user_prompt = _build_user_prompt(
        keywords, topic, region, blog_name, research_context,
        title=title,
        ending_style=ending_style,
        writer_gender=writer_gender,
        writer_age=writer_age,
        mood=mood,
    )
    response = model.generate_content(
        user_prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.7,
            max_output_tokens=12000,
        ),
    )
    return response.text or ""
