# 프러쉬(Frush) 네이버 블로그 자동 작성 시스템

네이버 키워드 API, Google Gemini (텍스트 + 이미지 생성 통합)를 연동해  
[Frush] 블로그 콘텐츠 작성 가이드라인을 따르는 네이버 블로그 포스팅을 완전 자동으로 생성합니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔑 키워드 자동 선정 | 네이버 검색광고 API로 검색량 상위 2개 키워드 선정 |
| 🌐 최신 데이터 수집 | Tavily Search API로 웹 검색 → 할루시네이션 최소화 |
| ✍️ 블로그 원고 생성 | Google Gemini + [Frush] 가이드라인 시스템 프롬프트로 완성도 높은 원고 작성 |
| 🖼 이미지 자동 생성 | Google Gemini API로 원고 내 이미지 플레이스홀더를 실제 이미지로 변환 |
| 📊 인포그래픽 렌더링 | 원고 내 HTML 인포그래픽을 Playwright로 PNG 이미지로 변환 |
| 📝 네이버 에디터 HTML | 완성된 포스팅을 네이버 블로그 에디터에 바로 붙여넣을 수 있는 HTML로 출력 |

---

## 🗂 프로젝트 구조

```
blog/
├── main.py                     # CLI 오케스트레이터 (진입점)
├── web_app.py                  # 웹 GUI 진입점 (Flask)
├── templates/
│   └── index.html              # 웹 UI 템플릿
├── requirements.txt            # Python 의존성
├── .env.example                # 환경 변수 템플릿
└── src/
    ├── __init__.py
    ├── config.py               # 환경 변수 로드 및 전역 설정
    ├── keyword_selector.py     # 네이버 검색광고 API 키워드 선정
    ├── web_searcher.py         # Tavily API 최신 데이터 수집
    ├── content_generator.py    # Google Gemini 블로그 원고 생성
    ├── image_generator.py      # Google Gemini 이미지 생성
    ├── infographic_renderer.py # HTML 인포그래픽 → PNG 변환
    └── naver_formatter.py      # 네이버 에디터 HTML 포맷터
```

---

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 의존성 설치
pip install -r requirements.txt

# Playwright 브라우저 설치 (인포그래픽 렌더링에 필요)
playwright install chromium

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 API 키를 채워넣으세요
```

### 2. `.env` 파일 설정

```dotenv
# 네이버 검색광고 API (https://searchad.naver.com)
NAVER_API_KEY=your_naver_api_key
NAVER_SECRET_KEY=your_naver_secret_key
NAVER_CUSTOMER_ID=your_naver_customer_id

# Google AI (Gemini) API — 글 생성 + 이미지 생성 통합 (https://aistudio.google.com/apikey)
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Tavily Search API (https://app.tavily.com)
TAVILY_API_KEY=your_tavily_api_key
```

### 3. 웹 GUI 실행 (권장)

```bash
# 1. 의존성 설치
pip install -r requirements.txt
playwright install chromium

# 2. .env 설정
cp .env.example .env
# .env 파일에 API 키 입력

# 3. 웹 서버 시작
python web_app.py

# 4. 브라우저에서 접속
# → http://localhost:5000
```

웹 브라우저에서 지역·주제·블로그명·키워드를 입력하고 **🚀 블로그 자동 작성 시작** 버튼을 누르면 됩니다.
각 단계의 진행 상황이 실시간으로 표시되며, 완료 후 생성된 원고·네이버 HTML·이미지를 바로 확인할 수 있습니다.

### 4. CLI 실행

```bash
# 기본 실행 (서울, 마케팅 주제)
python main.py

# 옵션 지정
python main.py --region 부산 --topic 프랜차이즈창업 --blog-name "내 블로그 이름"

# 키워드 수동 지정
python main.py --topic 카페창업 --keywords "카페창업비용,소자본창업"

# 이미지 생성 건너뛰기 (원고만 생성)
python main.py --topic 마케팅 --skip-images

# 출력 경로 지정
python main.py --topic 부동산 --output-dir ./my_posts
```

---

## 📋 CLI 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `--region` | 지역 | `서울` |
| `--topic` | 블로그 주제 | `마케팅` |
| `--blog-name` | 블로그명 | `프러쉬(Frush) 마케팅 블로그` |
| `--keywords` | 수동 키워드 (쉼표 구분) | 자동 선정 |
| `--skip-images` | 이미지 생성 건너뛰기 | `False` |
| `--output-dir` | 결과물 저장 경로 | `./output` |

---

## 📁 출력 결과

실행 후 `output/YYYYMMDD_HHMMSS/` 디렉터리에 다음 파일이 생성됩니다:

```
output/
└── 20240101_120000/
    ├── draft.md            # 생성된 블로그 원고 (마크다운)
    ├── naver_post.html     # 네이버 에디터 호환 HTML (복붙용)
    └── images/
        ├── 이미지제목.png  # Gemini 생성 이미지
        └── 인포그래픽.png  # HTML 렌더링 인포그래픽
```

`naver_post.html` 파일을 브라우저로 열어 내용을 복사한 뒤 네이버 블로그 에디터에 붙여넣기 하세요.

---

## 🔧 필수 API 키 안내 (단 3가지)

| 환경 변수 | 발급처 | 용도 |
|-----------|--------|------|
| `GOOGLE_AI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | 글 생성 + 이미지 생성 (통합) |
| `NAVER_API_KEY` + `NAVER_SECRET_KEY` + `NAVER_CUSTOMER_ID` | [네이버 검색광고](https://searchad.naver.com) | 키워드 자동 선정 |
| `TAVILY_API_KEY` | [Tavily](https://app.tavily.com) | 최신 데이터 수집 |

### Google AI (Gemini) API
1. [Google AI Studio](https://aistudio.google.com/apikey) 접속
2. **Get API key** 버튼 클릭 후 키 발급
3. `.env`의 `GOOGLE_AI_API_KEY`에 설정
4. 텍스트 생성(`gemini-2.0-flash`)과 이미지 생성(`gemini-2.0-flash-exp`) 모두 이 키 하나로 동작

### 네이버 검색광고 API
1. [네이버 검색광고 시스템](https://searchad.naver.com) 접속
2. 도구 > API 사용 신청
3. API 키, 시크릿 키, 고객 ID 발급 후 `.env`에 설정

### Tavily Search API
1. [Tavily](https://app.tavily.com) 접속
2. API 키 발급 후 `.env`에 설정
3. 키 없이도 실행 가능 (웹 검색 기능만 비활성화)

---

## 📝 [Frush] 블로그 콘텐츠 작성 가이드라인

이 시스템은 다음 가이드라인을 따라 블로그 원고를 작성합니다:

- **두괄식(AEO)**: 결론을 첫 문단에 제시
- **구체적 수치(GEO)**: 모호한 표현 대신 수치 사용
- **E-E-A-T 구조**: 경험·전문성·권위성·신뢰성 반영
- **SEO 최적화**: 핵심 키워드 자연스러운 반복 (5~7회)
- **이미지 15개 이상**: 사진 이미지 + 인포그래픽 조합
- **해시태그 20개**: #프러쉬 #Frush 필수 포함