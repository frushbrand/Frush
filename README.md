# 프러쉬(Frush) 공식 홈페이지

> **AI 영상 제작 스튜디오 Frush의 반응형 싱글 페이지 홈페이지**

## 사이트 정보

| 항목 | 내용 |
|------|------|
| 홈페이지 | [www.myfrush.com](https://www.myfrush.com) |
| 구조 | 정적 싱글 페이지 (`index.html`) |
| 배포 | GitHub Pages + CNAME |
| 스타일링 | Tailwind CSS (CDN) |
| 스크립트 | Vanilla JavaScript |
| 주요 에셋 | `Images/`, `Image_Storage/` |

## 현재 홈페이지 구성

- **상단 네비게이션**: 홈 / 세로형 / 광고 / 기타 영상 / Contact
- **홈(소개)**
  - 히어로 / 회사 소개
  - Why us
  - 수상 이력 타임라인
  - 대표작
  - 작업 프로세스
  - CTA
- **영상 메뉴**
  - 세로형
  - 광고
  - 기타 영상
- **Contact**
  - 카카오톡 오픈채팅 플레이스홀더 링크
  - 이메일 플레이스홀더 링크

## 구현 포인트

- 기존 브랜드 컬러 토큰 유지
  - `brand.dark`: `#064E3B`
  - `brand.main`: `#10B981`
  - `brand.light`: `#ECFDF5`
  - `brand.accent`: `#F59E0B`
  - `brand.text`: `#1F2937`
- 모바일 / 태블릿 / 데스크톱 완전 반응형
- 가격 섹션 및 별도 상담 신청 폼 제거
- 영상 카드는 `{ thumbnail, title, youtubeUrl }` 데이터 구조로 렌더링
- 썸네일 클릭 시 유튜브 페이지 이동 없이 **모달 임베드 재생**
- 실제 링크가 없는 항목은 플레이스홀더 상태로 남겨두어 추후 값만 교체 가능

## 파일 구조

```text
Frush/
├── index.html        # 메인 홈페이지
├── README.md
├── CNAME
├── sitemap.xml
├── robots.txt
├── Images/
├── Image_Storage/
└── Videos/
```

## 운영 시 교체할 값

- `https://open.kakao.com/o/REPLACE_WITH_OPEN_CHAT`
- `REPLACE_WITH_EMAIL@example.com`
- `videoCollections` 내부 플레이스홀더 YouTube URL

## 개발 메모

이 저장소는 별도의 빌드 시스템이나 패키지 매니저 없이 동작하는 정적 사이트입니다. 배포는 `index.html`과 에셋 변경만으로 진행됩니다.
