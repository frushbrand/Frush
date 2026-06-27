window.FrushSite = (() => {
  const KAKAO_URL = 'https://open.kakao.com/me/frush';
  const TEAM_PHOTO_URL = 'Images/5인 단체사진_프러쉬.png';
  const PANEL_COUNT = 22;
  const PANEL_IMAGES = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&q=80',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    'https://images.unsplash.com/photo-1510784722466-f2aa240c3c4a?w=600&q=80',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?w=600&q=80',
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80',
    'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=600&q=80',
    'https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=600&q=80',
    'https://images.unsplash.com/photo-1445962125599-30f582ac21f4?w=600&q=80',
    'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80'
  ];
  const GRADIENT_OVERLAYS = [
    'linear-gradient(135deg, rgba(99,55,255,0.55) 0%, rgba(236,72,153,0.45) 100%)',
    'linear-gradient(135deg, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.45) 100%)',
    'linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(239,68,68,0.45) 100%)',
    'linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(6,182,212,0.55) 100%)',
    'linear-gradient(135deg, rgba(236,72,153,0.55) 0%, rgba(245,158,11,0.45) 100%)',
    'linear-gradient(135deg, rgba(59,130,246,0.55) 0%, rgba(99,55,255,0.45) 100%)',
    'linear-gradient(135deg, rgba(239,68,68,0.45) 0%, rgba(236,72,153,0.55) 100%)',
    'linear-gradient(135deg, rgba(6,182,212,0.45) 0%, rgba(16,185,129,0.55) 100%)',
    'linear-gradient(135deg, rgba(99,55,255,0.45) 0%, rgba(6,182,212,0.55) 100%)',
    'linear-gradient(135deg, rgba(245,158,11,0.45) 0%, rgba(16,185,129,0.55) 100%)',
    'linear-gradient(135deg, rgba(239,68,68,0.55) 0%, rgba(245,158,11,0.45) 100%)',
    'linear-gradient(135deg, rgba(99,55,255,0.55) 0%, rgba(59,130,246,0.45) 100%)',
    'linear-gradient(135deg, rgba(16,185,129,0.55) 0%, rgba(99,55,255,0.45) 100%)',
    'linear-gradient(135deg, rgba(236,72,153,0.45) 0%, rgba(59,130,246,0.55) 100%)',
    'linear-gradient(135deg, rgba(6,182,212,0.55) 0%, rgba(245,158,11,0.45) 100%)',
    'linear-gradient(135deg, rgba(59,130,246,0.45) 0%, rgba(16,185,129,0.55) 100%)',
    'linear-gradient(135deg, rgba(245,158,11,0.55) 0%, rgba(99,55,255,0.45) 100%)',
    'linear-gradient(135deg, rgba(239,68,68,0.45) 0%, rgba(6,182,212,0.55) 100%)',
    'linear-gradient(135deg, rgba(99,55,255,0.45) 0%, rgba(236,72,153,0.55) 100%)',
    'linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(245,158,11,0.55) 100%)',
    'linear-gradient(135deg, rgba(236,72,153,0.55) 0%, rgba(239,68,68,0.45) 100%)',
    'linear-gradient(135deg, rgba(59,130,246,0.55) 0%, rgba(6,182,212,0.45) 100%)'
  ];

  const pages = {
    home: { label: '홈', href: 'index.html' },
    vertical: { label: '세로형', href: 'vertical.html' },
    ads: { label: '광고', href: 'ads.html' },
    others: { label: '기타 영상', href: 'others.html' },
    contact: { label: 'Contact', href: 'contact.html' }
  };

  const partners = [
    { src: 'Images/라브라크 로고.png', alt: '라브라크', gradient: { from: '#668CFF', via: '#0049FF', to: '#003199' } },
    { src: 'Images/르누아르 로고.png', alt: '르누아르', gradient: { from: '#FFE766', via: '#FFCE00', to: '#B38F00' } },
    { src: 'Images/나홀로복싱 로고.png', alt: '나홀로복싱', gradient: { from: '#6690F0', via: '#255BE3', to: '#193B99' } },
    { src: 'Images/공간 로고.png', alt: '공간', gradient: { from: '#C4C2FF', via: '#9896FF', to: '#5B4DCC' } },
    { src: 'Images/서울우유 광고.png', alt: '서울우유', gradient: { from: '#FF66A1', via: '#FF007A', to: '#B3005A' } },
    { src: 'Images/우곱집 로고.png', alt: '우곱집', gradient: { from: '#D9FF5A', via: '#AFFF01', to: '#7A9900' } },
    { src: 'Images/맥도날드 로고.png', alt: '맥도날드', gradient: { from: '#8AA7FF', via: '#5F86FF', to: '#3A5ACC' } },
    { src: 'Images/헤라 로고.png', alt: '헤라', gradient: { from: '#67F0D1', via: '#2AE5B9', to: '#1B8F72' } }
  ];

  const awards = [
    { year: '2025.10', title: '제1회 서울 국제 AI 필름 페스타 농심 광고 부문 대상', org: 'SGAFF' },
    { year: '2025.07', title: 'K-AI 콘텐츠 공모전 장려상', org: 'KT그룹희망나눔재단' },
    { year: '2025.12', title: '대전 AI영상 콘텐츠 공모전 자유형식 부문 우수상', org: '대전정보문화산업진흥원' },
    { year: '2025.12', title: '대한민국 인도적 지원 AI 홍보 공모전 장려상', org: '한국국제협력단' },
    { year: '2025', title: '농림축산식품부 장관상 수상', org: '농림축산식품부' },
    { year: '2024', title: '서울대학교 CALS 창업경진대회 대상', org: '서울대학교' },
    { year: '2024', title: 'NH 애그테크 청년 창업 캠퍼스 SEED 우수상', org: 'NH 애그테크 청년 창업 캠퍼스' }
  ];

  const works = [
    {
      id: 'frush-showreel',
      category: 'vertical',
      categoryLabel: '세로형',
      title: 'Frush 브랜드 쇼릴',
      year: '2026',
      format: '브랜드 쇼릴',
      src: 'Videos/프러쉬_업로드용.mp4',
      poster: 'Image_Storage/프러쉬_썸네일.png',
      theme: 'light'
    },
    {
      id: 'najin-1',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나진국밥 숏폼 캠페인 01',
      year: '2025',
      format: '매장 홍보',
      src: 'Videos/나진국밥 레퍼런스_업로드용1.mp4',
      poster: 'Image_Storage/나진국밥_썸네일.png',
      theme: 'light'
    },
    {
      id: 'najin-2',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나진국밥 숏폼 캠페인 02',
      year: '2025',
      format: '제품 스토리',
      src: 'Videos/나진국밥 레퍼런스_업로드용2.mp4',
      poster: 'Image_Storage/나진국밥_썸네일.png',
      theme: 'light'
    },
    {
      id: 'boxing',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나홀로복싱 퍼포먼스 숏폼',
      year: '2025',
      format: '퍼포먼스',
      src: 'Videos/나홀로복싱 레퍼런스_업로드용.mp4',
      poster: 'Images/나홀로복싱 로고.png',
      theme: 'light'
    },
    {
      id: 'lg',
      category: 'ads',
      categoryLabel: '광고',
      title: 'LG AX Company 레퍼런스',
      year: '2025',
      format: '캠페인 광고',
      src: 'Videos/LG광고.mp4',
      poster: 'Images/프러쉬매장.png',
      theme: 'dark'
    },
    {
      id: 'seoul-milk',
      category: 'ads',
      categoryLabel: '광고',
      title: '서울우유 브랜드 광고',
      year: '2025',
      format: '브랜딩 광고',
      src: 'Videos/서울우유광고.mp4',
      poster: 'Images/서울우유 광고.png',
      theme: 'dark'
    },
    {
      id: 'hera',
      category: 'ads',
      categoryLabel: '광고',
      title: 'HERA 브랜드 필름',
      year: '2025',
      format: '뷰티 캠페인',
      src: 'Videos/헤라 레퍼런스_업로드용.mp4',
      poster: 'Images/헤라 로고.png',
      theme: 'dark'
    },
    {
      id: 'mcdonalds',
      category: 'ads',
      categoryLabel: '광고',
      title: '맥도날드 캠페인 필름',
      year: '2025',
      format: '캠페인 필름',
      src: 'Videos/맥도날드 레퍼런스_업로드용.mp4',
      poster: 'Images/맥도날드 로고.png',
      theme: 'dark'
    },
    {
      id: 'ny-space',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '공간 브랜드 필름',
      year: '2025',
      format: '브랜드 필름',
      src: 'Videos/뉴욕공간 레퍼런스_업로드용.mp4',
      poster: 'Images/공간 로고.png',
      theme: 'light'
    },
    {
      id: 'labrac-1',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '라브라크 브랜드 스토리',
      year: '2025',
      format: '스토리텔링',
      src: 'Videos/라브라크 레퍼런스1_업로드용.mp4',
      poster: 'Images/라브라크 로고.png',
      theme: 'light'
    },
    {
      id: 'renoir',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '르누아르 캠페인 무드 필름',
      year: '2025',
      format: '무드 필름',
      src: 'Videos/르누아르 레퍼런스_업로드용.mp4',
      poster: 'Images/르누아르 로고.png',
      theme: 'light'
    },
    {
      id: 'woogop',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '우곱집 프로모션 필름',
      year: '2025',
      format: '프로모션',
      src: 'Videos/우곱집 레퍼런스_업로드용.mp4',
      poster: 'Images/우곱집 로고.png',
      theme: 'light'
    }
  ];

  const featuredWorkIds = ['frush-showreel', 'najin-1', 'boxing', 'lg', 'seoul-milk', 'hera', 'ny-space', 'labrac-1'];

  const assetPath = (path) => encodeURI(path);
  const YOUTUBE_EMBED_BASE = 'https://www.youtube.com/embed/';

  function getYoutubeVideoId(url = '') {
    if (!url) return '';

    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.replace('/', '');
      }
      if (parsed.searchParams.get('v')) {
        return parsed.searchParams.get('v');
      }
      const segments = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = segments.findIndex((segment) => segment === 'embed' || segment === 'shorts');
      if (embedIndex !== -1 && segments[embedIndex + 1]) {
        return segments[embedIndex + 1];
      }
    } catch (error) {
      return '';
    }

    return '';
  }

  function getYoutubeEmbedUrl(url = '') {
    const id = getYoutubeVideoId(url);
    return id ? `${YOUTUBE_EMBED_BASE}${id}?autoplay=1&rel=0` : '';
  }

  function getYoutubePoster(url = '') {
    const id = getYoutubeVideoId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  }

  function getWorkPoster(work) {
    if (work.poster) return assetPath(work.poster);
    return getYoutubePoster(work.youtubeUrl);
  }

  function getWorkPlayback(work) {
    if (work.youtubeUrl) {
      return {
        type: 'youtube',
        src: getYoutubeEmbedUrl(work.youtubeUrl)
      };
    }

    return {
      type: 'local',
      src: assetPath(work.src)
    };
  }

  function renderHeader(pageKey) {
    const navItems = Object.entries(pages).map(([key, page]) => `
      <a href="${page.href}" class="transition hover:text-brand-main ${key === pageKey ? 'text-brand-main' : 'text-white/80'}">${page.label}</a>
    `).join('');

    const mobileItems = Object.entries(pages).map(([key, page]) => `
      <a href="${page.href}" class="rounded-2xl px-4 py-3 transition ${key === pageKey ? 'bg-brand-main/15 text-brand-light' : 'text-white/80 hover:bg-white/5'}">${page.label}</a>
    `).join('');

    return `
      <nav id="navbar" class="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div class="glass rounded-full px-4 sm:px-6 py-3 shadow-soft">
            <div class="flex items-center justify-between gap-4">
              <a href="index.html" class="flex items-center gap-3">
                <span class="brand-mark" aria-hidden="true">F</span>
                <span class="hidden sm:block text-sm font-semibold tracking-[0.2em] text-white/70">FRUSH STUDIO</span>
              </a>
              <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
                ${navItems}
                <a href="${KAKAO_URL}" target="_blank" rel="noreferrer" class="rounded-full bg-brand-main px-5 py-2 text-white shadow-lg transition hover:bg-brand-dark">문의하기</a>
              </div>
              <button id="menuButton" type="button" class="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white" aria-label="메뉴 열기">
                <i class="fas fa-bars"></i>
              </button>
            </div>
            <div id="mobileMenu" class="hidden md:hidden border-t border-white/10 mt-4 pt-4 pb-1">
              <div class="flex flex-col gap-2 text-sm font-semibold">
                ${mobileItems}
                <a href="${KAKAO_URL}" target="_blank" rel="noreferrer" class="rounded-2xl bg-brand-main px-4 py-3 text-white transition hover:bg-brand-dark">문의하기</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    return `
      <footer class="border-t border-white/8 bg-[#07111e] py-12 text-white/70">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <div class="flex items-center gap-3">
                <span class="brand-mark" aria-hidden="true">F</span>
                <span class="text-sm tracking-[0.24em] text-white/80">FRUSH STUDIO</span>
              </div>
              <p class="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">업체 정보</p>
              <div class="mt-4 space-y-2 text-sm leading-6 text-white/72">
                <p><span class="font-semibold text-white">업체명</span> 프러쉬 스튜디오</p>
                <p><span class="font-semibold text-white">소개</span> 브랜드 목적에 맞는 영상 기획부터 제작까지 한 흐름으로 진행하는 AI 영상 제작 스튜디오</p>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">문의</p>
                <div class="mt-4 space-y-2 text-sm leading-6 text-white/72">
                  <p><span class="font-semibold text-white">메인 이메일</span> <a href="mailto:frush.brand@gmail.com" class="transition hover:text-brand-main">frush.brand@gmail.com</a></p>
                </div>
              </div>
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a href="${KAKAO_URL}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full bg-brand-main px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">문의하기</a>
                <p class="text-sm text-white/45">Copyright © 2026 Frush. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderModal() {
    return `
      <div id="videoModal" class="video-modal">
        <div class="flex min-h-full items-center justify-center">
          <div class="w-full max-w-5xl rounded-[2rem] bg-[#08111c] p-4 sm:p-5 shadow-soft border border-white/10">
            <div class="mb-4 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.28em] text-brand-main">Featured playback</p>
                <h3 id="modalTitle" class="mt-2 text-lg sm:text-xl font-semibold text-white">영상 보기</h3>
              </div>
              <button id="closeModalButton" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white" aria-label="영상 닫기">
                <i class="fas fa-xmark text-lg"></i>
              </button>
            </div>
            <div id="modalContent" class="overflow-hidden rounded-[1.5rem] bg-black aspect-video"></div>
          </div>
        </div>
      </div>
    `;
  }

  function createPartnerCard(logo) {
    return `
      <div class="partner-card">
        <div class="partner-card__inner">
          <img src="${assetPath(logo.src)}" alt="${logo.alt}">
        </div>
      </div>
    `;
  }

  function renderPartners(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = `
      <section class="section-shell rounded-[2rem] p-6 md:p-8 lg:p-10 shadow-soft reveal" data-reveal>
        <div class="grid grid-cols-1 gap-6 border-b border-slate-200/80 pb-6 md:pb-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Partners</p>
            <h2 class="mt-3 text-3xl font-semibold text-brand-text sm:text-4xl">협력 업체와 브랜드가 Frush와 함께 움직입니다</h2>
          </div>
        </div>
        <div class="partner-marquee mt-6">
          <div class="partner-track">
            ${[...partners, ...partners].map(createPartnerCard).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function createWorkCard(work, options = {}) {
    const darkSurface = options.surface === 'dark';
    const cardBg = darkSurface ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200/80';
    const textColor = darkSurface ? 'text-white' : 'text-brand-text';
    const subColor = darkSurface ? 'text-white/65' : 'text-slate-500';
    const chipBg = darkSurface ? 'bg-white/10 text-white' : 'bg-brand-light text-brand-dark';
    const poster = getWorkPoster(work);
    const playback = getWorkPlayback(work);
    return `
      <article class="work-card reveal overflow-hidden rounded-[2rem] ${cardBg} shadow-sm" data-reveal>
        <button
          type="button"
          class="block w-full text-left"
          data-video-title="${work.title}"
          data-video-src="${playback.src}"
          data-video-poster="${poster}"
          data-video-type="${playback.type}"
        >
          <div class="work-thumb relative aspect-[4/3]">
            <img src="${poster}" alt="${work.title} 썸네일" loading="lazy">
            <div class="absolute inset-x-0 bottom-0 z-[1] flex items-end justify-end p-5">
              <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-text shadow-lg">
                <i class="fas fa-play text-sm"></i>
              </span>
            </div>
          </div>
          <div class="p-6">
            <p class="text-lg font-semibold ${textColor}">${work.title}</p>
            <div class="mt-4 space-y-2 text-sm ${subColor}">
              <p><span class="font-semibold ${textColor}">종류</span> ${work.format}</p>
            </div>
            <div class="mt-5 inline-flex items-center gap-2 rounded-full ${chipBg} px-4 py-2 text-sm font-semibold">
              영상 보기
            </div>
          </div>
        </button>
      </article>
    `;
  }

  function renderWorks(targetId, filter, options = {}) {
    const target = document.getElementById(targetId);
    if (!target) return;

    let selected = works;
    if (Array.isArray(filter)) {
      selected = filter.map((id) => works.find((work) => work.id === id)).filter(Boolean);
    } else if (typeof filter === 'string') {
      selected = works.filter((work) => work.category === filter);
    }

    target.innerHTML = selected.map((work) => createWorkCard(work, options)).join('');

    if (options.dark) {
      target.querySelectorAll('.work-card').forEach((card) => {
        card.classList.add('shadow-soft');
      });
    }
  }

  function renderStrengthsAndAwards(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = `
      <section class="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <article class="strength-card strength-card--team rounded-[2rem] p-6 md:p-8 shadow-soft reveal" data-reveal>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Why Frush</p>
          <h2 class="mt-3 text-3xl font-semibold text-white sm:text-4xl">전략과 실행, 그리고 신뢰를 한 팀으로 연결합니다</h2>
          <p class="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">서울대 출신 대표, PD 출신 기획자, 전문성 있는 영상 작업자 팀이 함께 브랜드 목적을 정리하고 결과물까지 밀도 있게 완성합니다.</p>
          <div class="strength-point-list mt-7">
            <div class="strength-point-item">
              <span class="strength-point-item__label">Strategy</span>
              <p>초기 상담에서 브랜드 목적과 메시지를 먼저 정리합니다.</p>
            </div>
            <div class="strength-point-item">
              <span class="strength-point-item__label">Production</span>
              <p>기획, 촬영, 편집까지 필요한 제작 흐름을 한 팀으로 이어갑니다.</p>
            </div>
          </div>
          <div class="team-photo-frame mt-8 overflow-hidden rounded-[1.75rem]">
            <img src="${assetPath(TEAM_PHOTO_URL)}" alt="프러쉬 스튜디오 팀 단체 사진" class="h-full w-full object-cover">
          </div>
          <div class="strength-highlight-card mt-8 rounded-[1.75rem] p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-light">Team Snapshot</p>
            <p class="mt-3 text-sm leading-7 text-white/72 sm:text-base">브랜드 방향을 잡는 대표, 구조를 설계하는 기획자, 완성도를 만드는 제작팀이 처음 상담부터 납품까지 같은 호흡으로 움직입니다.</p>
          </div>
        </article>
        <article class="strength-card strength-card--awards rounded-[2rem] p-6 md:p-8 shadow-soft reveal" data-reveal>
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Awards</p>
              <h2 class="mt-3 text-3xl font-semibold text-brand-text">프러쉬의 수상 이력 7개</h2>
            </div>
            <div class="hidden h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-dark md:flex">
              <i class="fas fa-award text-xl"></i>
            </div>
          </div>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            ${awards.map((award) => `
              <div class="award-chip rounded-[1.5rem] border border-slate-200/80 bg-white px-5 py-4">
                <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-main">
                  <span>${award.year}</span>
                  <span class="h-1 w-1 rounded-full bg-brand-main"></span>
                  <span>${award.org}</span>
                </div>
                <p class="mt-3 text-base font-semibold leading-7 text-brand-text">${award.title}</p>
              </div>
            `).join('')}
          </div>
        </article>
      </section>
    `;
  }

  function setupStackedPanels() {
    const stage = document.getElementById('stacked-panels-scene');
    const container = document.getElementById('stacked-panels-container');
    if (!stage || !container) return;

    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;
    const panels = Array.from({ length: PANEL_COUNT }, (_, index) => {
      const panel = document.createElement('div');
      panel.className = 'stacked-panel';
      panel.innerHTML = `
        <div class="stacked-panel-image" style="background-image:url('${PANEL_IMAGES[index % PANEL_IMAGES.length]}')"></div>
        <div class="stacked-panel-gradient" style="background:${GRADIENT_OVERLAYS[index % GRADIENT_OVERLAYS.length]}"></div>
        <div class="stacked-panel-vignette"></div>
        <div class="stacked-panel-border"></div>
      `;
      container.appendChild(panel);
      return { panel, index };
    });

    const getDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        return { radius: 240, cardWidth: 88, cardHeight: 124, baseTilt: -10 };
      }
      if (width < 1024) {
        return { radius: 360, cardWidth: 108, cardHeight: 152, baseTilt: -14 };
      }
      return { radius: 500, cardWidth: 132, cardHeight: 186, baseTilt: -18 };
    };

    const updatePanels = () => {
      const { radius, cardWidth, cardHeight, baseTilt } = getDimensions();
      const startAngle = 18;
      const endAngle = 158;
      const step = (endAngle - startAngle) / Math.max(PANEL_COUNT - 1, 1);
      const sceneShiftX = currentPointerX * 24;
      const sceneShiftY = currentPointerY * -18;

      container.style.transform = `translate3d(${sceneShiftX}px, ${sceneShiftY}px, 0)`;

      panels.forEach(({ panel, index }) => {
        const angle = startAngle + step * index;
        const angleRad = (angle * Math.PI) / 180;
        const depth = (PANEL_COUNT - index) * -28;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;
        const spread = index / Math.max(PANEL_COUNT - 1, 1);
        const depthOffset = currentPointerX * (28 + spread * 30);
        const lift = currentPointerY * (20 + spread * 18);
        const tilt = currentPointerX * (10 + spread * 8) + currentPointerY * 4;
        const scale = 0.84 + spread * 0.2 + Math.abs(currentPointerY) * 0.02;
        const rotate = baseTilt + angle / 6 + tilt;

        panel.style.width = `${cardWidth}px`;
        panel.style.height = `${cardHeight}px`;
        panel.style.marginLeft = `${-cardWidth / 2}px`;
        panel.style.marginBottom = `${-cardHeight / 2}px`;
        panel.style.opacity = `${0.24 + spread * 0.76}`;
        panel.style.zIndex = `${PANEL_COUNT - index}`;
        panel.style.transform = `translate3d(${x - depthOffset}px, ${-y + lift}px, ${depth + currentPointerX * 18}px) rotate(${rotate}deg) scale(${scale})`;
      });
    };

    const animatePanels = () => {
      currentPointerX += (targetPointerX - currentPointerX) * 0.08;
      currentPointerY += (targetPointerY - currentPointerY) * 0.08;
      updatePanels();
      window.requestAnimationFrame(animatePanels);
    };

    updatePanels();
    animatePanels();

    stage.addEventListener('mousemove', (event) => {
      const rect = stage.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    stage.addEventListener('mouseleave', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    window.addEventListener('resize', updatePanels);
  }

  function setupRevealObserver() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    elements.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }

  function setupParallax() {
    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      elements.forEach((element) => {
        const ratio = Number(element.dataset.parallax || 0.08);
        element.style.setProperty('--parallax-offset', `${scrollY * ratio * -1}px`);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!navbar || !menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    const onScroll = () => {
      if (window.scrollY > 12) {
        navbar.classList.add('nav-blur');
      } else {
        navbar.classList.remove('nav-blur');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setupModal() {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.getElementById('closeModalButton');
    if (!modal || !modalTitle || !modalContent || !closeButton) return;

    const closeModal = () => {
      modal.classList.remove('is-open');
      modalContent.innerHTML = '';
      document.body.classList.remove('modal-open');
    };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-video-src]');
      if (button) {
        const { videoTitle, videoSrc, videoPoster, videoType } = button.dataset;
        modalTitle.textContent = videoTitle || '영상 보기';
        modalContent.innerHTML = videoType === 'youtube'
          ? `
            <iframe
              class="h-full w-full"
              src="${videoSrc || ''}"
              title="${videoTitle || '영상 보기'}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          `
          : `
            <video class="h-full w-full" controls autoplay playsinline poster="${videoPoster || ''}">
              <source src="${videoSrc || ''}" type="video/mp4">
            </video>
          `;
        modal.classList.add('is-open');
        document.body.classList.add('modal-open');
        return;
      }

      if (event.target === modal) {
        closeModal();
      }
    });

    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  function renderShell(pageKey) {
    const headerTarget = document.getElementById('site-header');
    const footerTarget = document.getElementById('site-footer');
    const modalTarget = document.getElementById('site-modal');
    if (headerTarget) headerTarget.innerHTML = renderHeader(pageKey);
    if (footerTarget) footerTarget.innerHTML = renderFooter();
    if (modalTarget) modalTarget.innerHTML = renderModal();
  }

  function initPage(config) {
    renderShell(config.pageKey);

    if (config.partnerTargetId) renderPartners(config.partnerTargetId);
    if (config.featuredTargetId) renderWorks(config.featuredTargetId, featuredWorkIds, { surface: 'dark' });
    if (config.strengthsAwardsTargetId) renderStrengthsAndAwards(config.strengthsAwardsTargetId);
    if (config.collectionTargetId && config.collectionKey) renderWorks(config.collectionTargetId, config.collectionKey, { surface: 'light', dark: false });

    setupNavbar();
    setupModal();
    setupRevealObserver();
    setupParallax();
    setupStackedPanels();
  }

  return {
    initPage,
    pages,
    works,
    featuredWorkIds,
    KAKAO_URL,
    assetPath
  };
})();
