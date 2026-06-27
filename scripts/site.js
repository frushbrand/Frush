window.FrushSite = (() => {
  const KAKAO_URL = 'https://open.kakao.com/me/frush';

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
    { year: '2025', title: '서울 국제 AI 필름 페스타 농심 광고 부문 대상', org: 'SGAFF' },
    { year: '2025', title: 'K-AI 콘텐츠 공모전 장려상', org: 'KT그룹희망나눔재단' },
    { year: '2025', title: '대전 AI영상 콘텐츠 공모전 우수상', org: '대전정보문화산업진흥원' },
    { year: '2024', title: '서울대학교 CALS 창업경진대회 대상', org: '서울대학교' }
  ];

  const process = [
    { step: '01', title: '브랜드 정렬', description: '브랜드 목표, 톤앤매너, 주요 타깃을 빠르게 정렬합니다.' },
    { step: '02', title: '콘셉트 설계', description: '컷 구성과 메시지를 영상 포맷에 맞춰 압축 설계합니다.' },
    { step: '03', title: '제작·납품', description: 'AI 생성과 후반 연출을 결합해 즉시 활용 가능한 결과물로 마무리합니다.' }
  ];

  const works = [
    {
      id: 'frush-showreel',
      category: 'vertical',
      categoryLabel: '세로형',
      title: 'Frush 브랜드 쇼릴',
      client: 'Frush',
      year: '2026',
      format: 'Vertical / Showreel',
      summary: '브랜드의 리듬과 무드를 숏폼 템포로 압축한 시그니처 오프닝 필름입니다.',
      src: 'Videos/프러쉬_업로드용.mp4',
      poster: 'Image_Storage/프러쉬_썸네일.png',
      theme: 'light'
    },
    {
      id: 'najin-1',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나진국밥 숏폼 캠페인 01',
      client: '나진국밥',
      year: '2025',
      format: 'Vertical / Store Promo',
      summary: '매장 무드를 빠르게 각인시키는 세로형 캠페인 컷입니다.',
      src: 'Videos/나진국밥 레퍼런스_업로드용1.mp4',
      poster: 'Image_Storage/나진국밥_썸네일.png',
      theme: 'light'
    },
    {
      id: 'najin-2',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나진국밥 숏폼 캠페인 02',
      client: '나진국밥',
      year: '2025',
      format: 'Vertical / Product Story',
      summary: '메뉴 포인트와 현장감을 강하게 전달하는 숏폼 편집입니다.',
      src: 'Videos/나진국밥 레퍼런스_업로드용2.mp4',
      poster: 'Image_Storage/나진국밥_썸네일.png',
      theme: 'light'
    },
    {
      id: 'boxing',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '나홀로복싱 퍼포먼스 숏폼',
      client: '나홀로복싱',
      year: '2025',
      format: 'Vertical / Performance',
      summary: '속도감 있는 시퀀스로 운동 브랜드의 몰입도를 끌어올린 작업입니다.',
      src: 'Videos/나홀로복싱 레퍼런스_업로드용.mp4',
      poster: 'Images/나홀로복싱 로고.png',
      theme: 'light'
    },
    {
      id: 'lg',
      category: 'ads',
      categoryLabel: '광고',
      title: 'LG AX Company 레퍼런스',
      client: 'LG',
      year: '2025',
      format: 'Commercial / Campaign',
      summary: '브랜드 메시지를 선명하게 보여주는 하이엔드 광고 톤의 레퍼런스입니다.',
      src: 'Videos/LG광고.mp4',
      poster: 'Images/프러쉬매장.png',
      theme: 'dark'
    },
    {
      id: 'seoul-milk',
      category: 'ads',
      categoryLabel: '광고',
      title: '서울우유 브랜드 광고',
      client: '서울우유',
      year: '2025',
      format: 'Commercial / Branding',
      summary: '친숙한 브랜드 에셋을 감각적인 광고 문법으로 확장한 작업입니다.',
      src: 'Videos/서울우유광고.mp4',
      poster: 'Images/서울우유 광고.png',
      theme: 'dark'
    },
    {
      id: 'hera',
      category: 'ads',
      categoryLabel: '광고',
      title: 'HERA 브랜드 필름',
      client: 'HERA',
      year: '2025',
      format: 'Commercial / Beauty',
      summary: '프리미엄 뷰티 톤을 살린 시네마틱 무드의 브랜드 필름입니다.',
      src: 'Videos/헤라 레퍼런스_업로드용.mp4',
      poster: 'Images/헤라 로고.png',
      theme: 'dark'
    },
    {
      id: 'mcdonalds',
      category: 'ads',
      categoryLabel: '광고',
      title: '맥도날드 캠페인 필름',
      client: '맥도날드',
      year: '2025',
      format: 'Commercial / Campaign',
      summary: '강한 컬러와 템포로 브랜드 집중도를 높인 광고형 작업입니다.',
      src: 'Videos/맥도날드 레퍼런스_업로드용.mp4',
      poster: 'Images/맥도날드 로고.png',
      theme: 'dark'
    },
    {
      id: 'ny-space',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '공간 브랜드 필름',
      client: '공간',
      year: '2025',
      format: 'Brand Film / Space',
      summary: '브랜드 공간 경험을 차분하고 세련된 무드로 풀어낸 필름입니다.',
      src: 'Videos/뉴욕공간 레퍼런스_업로드용.mp4',
      poster: 'Images/공간 로고.png',
      theme: 'light'
    },
    {
      id: 'labrac-1',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '라브라크 브랜드 스토리',
      client: '라브라크',
      year: '2025',
      format: 'Brand Film / Storytelling',
      summary: '제품과 분위기를 함께 설계한 감성 중심의 브랜드 필름입니다.',
      src: 'Videos/라브라크 레퍼런스1_업로드용.mp4',
      poster: 'Images/라브라크 로고.png',
      theme: 'light'
    },
    {
      id: 'renoir',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '르누아르 캠페인 무드 필름',
      client: '르누아르',
      year: '2025',
      format: 'Brand Film / Mood',
      summary: '브랜드 무드를 강조하며 메시지를 자연스럽게 전달하는 콘텐츠입니다.',
      src: 'Videos/르누아르 레퍼런스_업로드용.mp4',
      poster: 'Images/르누아르 로고.png',
      theme: 'light'
    },
    {
      id: 'woogop',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '우곱집 프로모션 필름',
      client: '우곱집',
      year: '2025',
      format: 'Brand Film / Promo',
      summary: '브랜드 특징을 선명하게 남기는 프로모션 중심의 필름입니다.',
      src: 'Videos/우곱집 레퍼런스_업로드용.mp4',
      poster: 'Images/우곱집 로고.png',
      theme: 'light'
    }
  ];

  const featuredWorkIds = ['frush-showreel', 'najin-1', 'boxing', 'lg', 'seoul-milk', 'hera', 'ny-space', 'labrac-1'];

  const categoryMeta = {
    vertical: {
      title: '세로형 영상',
      description: '브랜드 메시지를 가장 빠르게 소비되는 포맷에 맞춰 밀도 있게 압축합니다.',
      highlight: '광고처럼 강하고 숏폼처럼 빠르게, 전환 효율까지 고려한 세로형 영상.'
    },
    ads: {
      title: '광고 영상',
      description: 'TVCF 톤의 무드, 브랜드 문법, 메시지 집중도를 하나의 화면으로 완성합니다.',
      highlight: '브랜드 인지와 캠페인 임팩트를 함께 노리는 광고형 영상.'
    },
    others: {
      title: '기타 영상',
      description: '브랜드 필름, 소개 영상, 무드 콘텐츠까지 장면의 밀도를 중심으로 설계합니다.',
      highlight: '브랜드 세계관을 오래 남기는 필름형 콘텐츠.'
    }
  };

  const assetPath = (path) => encodeURI(path);

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
                <img src="${assetPath('Images/Frush_v2.png')}" alt="프러쉬 로고" class="h-9 w-auto">
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
                <img src="${assetPath('Images/Frush_v2.png')}" alt="프러쉬 로고" class="h-8 w-auto opacity-90">
                <span class="text-sm tracking-[0.24em] text-white/80">FRUSH STUDIO</span>
              </div>
              <p class="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">업체 정보</p>
              <div class="mt-4 space-y-2 text-sm leading-6 text-white/72">
                <p><span class="font-semibold text-white">업체명</span> 프러쉬 | Frush</p>
                <p><span class="font-semibold text-white">분야</span> 세로형 영상 · 광고 영상 · 브랜드 필름 제작</p>
                <p><span class="font-semibold text-white">소개</span> 브랜드 목적에 맞는 영상 기획부터 제작까지 한 흐름으로 진행하는 AI 영상 제작 스튜디오</p>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">문의</p>
                <div class="mt-4 space-y-2 text-sm leading-6 text-white/72">
                  <p><span class="font-semibold text-white">메인 이메일</span> <a href="mailto:frush.brand@gmail.com" class="transition hover:text-brand-main">frush.brand@gmail.com</a></p>
                  <p><span class="font-semibold text-white">상담 채널</span> <a href="${KAKAO_URL}" target="_blank" rel="noreferrer" class="transition hover:text-brand-main">open.kakao.com/me/frush</a></p>
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
          <p class="text-sm leading-7 text-slate-500 sm:text-base">콘텐츠의 완성도뿐 아니라 브랜드 커뮤니케이션의 흐름까지 맞춰 온 파트너십을 한눈에 보여주는 구간입니다.</p>
        </div>
        <div class="partner-marquee mt-6">
          <div class="partner-track">
            ${[...partners, ...partners].map(createPartnerCard).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function createWorkCard(work) {
    const darkMode = work.theme === 'dark';
    const cardBg = darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200/80';
    const textColor = darkMode ? 'text-white' : 'text-brand-text';
    const subColor = darkMode ? 'text-white/65' : 'text-slate-500';
    const chipBg = darkMode ? 'bg-white/10 text-white' : 'bg-brand-light text-brand-dark';
    return `
      <article class="work-card reveal overflow-hidden rounded-[2rem] ${cardBg} shadow-sm" data-reveal>
        <button type="button" class="block w-full text-left" data-video-title="${work.title}" data-video-src="${assetPath(work.src)}" data-video-poster="${assetPath(work.poster)}">
          <div class="work-thumb relative aspect-[4/3]">
            <img src="${assetPath(work.poster)}" alt="${work.title} 썸네일" loading="lazy">
            <div class="absolute inset-x-0 bottom-0 z-[1] flex items-end justify-between gap-3 p-5">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-light/90">${work.client}</p>
                <p class="mt-2 text-lg font-semibold text-white">${work.title}</p>
              </div>
              <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-text shadow-lg">
                <i class="fas fa-play text-sm"></i>
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${subColor}">
              <span>${work.categoryLabel}</span>
              <span>•</span>
              <span>${work.format}</span>
              <span>•</span>
              <span>${work.year}</span>
            </div>
            <p class="mt-4 text-base font-semibold ${textColor}">${work.client}</p>
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

    target.innerHTML = selected.map(createWorkCard).join('');

    if (options.dark) {
      target.querySelectorAll('.work-card').forEach((card) => {
        card.classList.add('shadow-soft');
      });
    }
  }

  function renderAwardsAndProcess(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = `
      <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article class="section-shell rounded-[2rem] p-6 md:p-8 shadow-soft reveal" data-reveal>
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Awards</p>
              <h2 class="mt-3 text-3xl font-semibold text-brand-text">전체 수상 이력</h2>
            </div>
            <div class="hidden h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-dark md:flex">
              <i class="fas fa-award text-xl"></i>
            </div>
          </div>
          <div class="mt-8 grid gap-4">
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
        <article class="section-shell rounded-[2rem] p-6 md:p-8 shadow-soft reveal" data-reveal>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Process</p>
          <h2 class="mt-3 text-3xl font-semibold text-brand-text">작업 프로세스</h2>
          <div class="mt-8 grid gap-4">
            ${process.map((item) => `
              <div class="process-card rounded-[1.5rem] border border-slate-200/80 bg-white p-5">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light font-bold text-brand-dark">${item.step}</div>
                  <div>
                    <h3 class="text-lg font-semibold text-brand-text">${item.title}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-500">${item.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </article>
      </section>
    `;
  }

  function renderRelatedPages(targetId, currentPage) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const items = Object.entries(pages).filter(([key]) => key !== currentPage && key !== 'contact');
    target.innerHTML = items.map(([key, page]) => `
      <a href="${page.href}" class="related-card reveal rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-brand-main/30" data-reveal>
        <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-main">Browse</p>
        <h3 class="mt-3 text-2xl font-semibold text-brand-text">${page.label}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-500">${key === 'home' ? '메인 페이지에서 Frush의 전체 방향과 대표작을 먼저 확인하세요.' : categoryMeta[key]?.description || ''}</p>
        <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">이동하기 <i class="fas fa-arrow-right text-xs"></i></span>
      </a>
    `).join('');
  }

  function renderCategorySummary(targetId, category) {
    const target = document.getElementById(targetId);
    const meta = categoryMeta[category];
    if (!target || !meta) return;

    target.innerHTML = `
      <div class="grid gap-5 md:grid-cols-3">
        <article class="category-card rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-soft">
          <p class="text-sm font-semibold text-brand-main">FORMAT</p>
          <h3 class="mt-4 text-2xl font-semibold">${meta.title}</h3>
          <p class="mt-3 text-sm leading-6 text-white/70">${meta.highlight}</p>
        </article>
        <article class="category-card rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-soft">
          <p class="text-sm font-semibold text-brand-main">DELIVERY</p>
          <h3 class="mt-4 text-2xl font-semibold">즉시 활용 가능한 납품</h3>
          <p class="mt-3 text-sm leading-6 text-white/70">세로형, 가로형, 광고 컷다운 등 채널별 운영을 고려해 결과물을 정리합니다.</p>
        </article>
        <article class="category-card rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-soft">
          <p class="text-sm font-semibold text-brand-main">COMMUNICATION</p>
          <h3 class="mt-4 text-2xl font-semibold">기획과 제작이 한 흐름으로</h3>
          <p class="mt-3 text-sm leading-6 text-white/70">대표와 기획팀이 브랜드 메시지의 우선순위를 먼저 정리한 뒤 장면을 설계합니다.</p>
        </article>
      </div>
    `;
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
        const { videoTitle, videoSrc, videoPoster } = button.dataset;
        modalTitle.textContent = videoTitle || '영상 보기';
        modalContent.innerHTML = `
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
    if (config.featuredTargetId) renderWorks(config.featuredTargetId, featuredWorkIds);
    if (config.awardsProcessTargetId) renderAwardsAndProcess(config.awardsProcessTargetId);
    if (config.collectionTargetId && config.collectionKey) renderWorks(config.collectionTargetId, config.collectionKey, { dark: config.collectionKey === 'ads' });
    if (config.categorySummaryTargetId && config.collectionKey) renderCategorySummary(config.categorySummaryTargetId, config.collectionKey);
    if (config.relatedTargetId) renderRelatedPages(config.relatedTargetId, config.pageKey);

    setupNavbar();
    setupModal();
    setupRevealObserver();
    setupParallax();
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
