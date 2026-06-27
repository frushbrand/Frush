# 프러쉬(Frush) 공식 홈페이지

> **AI 영상 제작 스튜디오 Frush의 반응형 정적 홈페이지**

## 사이트 정보

| 항목 | 내용 |
|------|------|
| 홈페이지 | [www.myfrush.com](https://www.myfrush.com) |
| 구조 | 정적 멀티 페이지 (`index.html`, `vertical.html`, `ads.html`, `others.html`, `contact.html`) |
| 배포 | GitHub Pages + CNAME |
| 스타일링 | Tailwind CSS (CDN) + `styles/site.css` |
| 스크립트 | Vanilla JavaScript (`scripts/site.js`) |
| 주요 에셋 | `Images/`, `Image_Storage/`, `Videos/` |

## 현재 홈페이지 구성

- **홈 (`index.html`)**
  - 시네마틱 비디오 히어로
  - Why Frush / Snapshot
  - 협력 업체 마키 로고 섹션
  - 컴팩트 수상 이력 / 작업 프로세스
  - 대표작 8선
- **세로형 (`vertical.html`)**
  - 세로형 영상 소개
  - 세로형 포트폴리오
- **광고 (`ads.html`)**
  - 광고 영상 소개
  - 광고 포트폴리오
- **기타 영상 (`others.html`)**
  - 브랜드 필름 / 기타 영상 소개
  - 기타 영상 포트폴리오
- **Contact (`contact.html`)**
  - 오픈카톡 문의 버튼
  - 문의 전 체크 포인트
  - FAQ

## 구현 포인트

- 기존 브랜드 컬러 토큰 유지
  - `brand.dark`: `#064E3B`
  - `brand.main`: `#10B981`
  - `brand.light`: `#ECFDF5`
  - `brand.accent`: `#F59E0B`
  - `brand.text`: `#1F2937`
- 모바일 / 태블릿 / 데스크톱 반응형
- 메뉴별 별도 페이지 구성
- 메인 페이지 스크롤 리빌 애니메이션 및 파트너 마키 적용
- 대표작 8개를 로컬 비디오 모달과 연결
- 문의는 카카오 오픈채팅 링크로 직접 연결

## 파일 구조

```text
Frush/
├── index.html
├── vertical.html
├── ads.html
├── others.html
├── contact.html
├── scripts/
│   ├── site.js
│   └── tailwind-config.js
├── styles/
│   └── site.css
├── README.md
├── CNAME
├── sitemap.xml
├── robots.txt
├── Images/
├── Image_Storage/
└── Videos/
```

## 개발 메모

이 저장소는 별도의 빌드 시스템이나 패키지 매니저 없이 동작하는 정적 사이트입니다. 배포는 HTML, CSS, JS, 에셋 변경만으로 진행됩니다.
