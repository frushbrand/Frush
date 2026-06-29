window.FrushSite = (() => {
  const KAKAO_URL = 'https://open.kakao.com/me/frush';
  const TEAM_PHOTO_URL = 'Images/5인 단체사진_프러쉬.png';
  const PANEL_COUNT = 18;
  // Hero arch card images. Placeholder photos for now — to use your own, drop
  // files into Images/ (or Image_Storage/) and replace the entries below with
  // their paths, e.g. 'Images/내 작업.png'. Local paths are URL-encoded
  // automatically, so spaces and Korean filenames are fine.
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
    { year: '2025.12', title: '농림축산식품부 장관상 수상', org: '농림축산식품부' },
    { year: '2025.12', title: '대한민국 인도적 지원 AI 홍보 공모전 장려상', org: '한국국제협력단' },
    { year: '2025.12', title: '대전 AI영상 콘텐츠 공모전 자유형식 부문 우수상', org: '대전정보문화산업진흥원' },
    { year: '2025.10', title: '제1회 서울 국제 AI 필름 페스타 농심 광고 부문 대상', org: 'SGAFF' },
    { year: '2025.07', title: 'K-AI 콘텐츠 공모전 장려상', org: 'KT그룹희망나눔재단' },
    { year: '2025.01', title: '서울대학교 CALS 창업경진대회 대상', org: '서울대학교' },
    { year: '2024.11', title: 'NH 애그테크 청년 창업 캠퍼스 SEED 우수상', org: 'NH 애그테크 청년 창업 캠퍼스' }
  ];

  const works = [
    {
      id: 'yt-around-us',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '□□은 주변에 있다',
      year: '2025',
      format: '단편 영화',
      source: '자체 제작',
      youtubeUrl: 'https://www.youtube.com/watch?v=lQCfm9T8jyY',
      theme: 'light'
    },
    {
      id: 'yt-red-echo',
      category: 'others',
      categoryLabel: '기타 영상',
      title: 'RED ECHO',
      year: '2025',
      format: '뮤직비디오',
      source: '자체 제작',
      youtubeUrl: 'https://www.youtube.com/watch?v=i8zv0KtnZZ0',
      theme: 'light'
    },
    {
      id: 'yt-gotgam-festival',
      category: 'ads',
      categoryLabel: '광고',
      title: '호랑이도 즐기는 곶감 축제',
      year: '2025',
      format: '축제 홍보',
      source: '상주곶감축제',
      youtubeUrl: 'https://www.youtube.com/watch?v=UndPL9ydZkc',
      theme: 'dark'
    },
    {
      id: 'yt-shinramyun',
      category: 'ads',
      categoryLabel: '광고',
      title: '신라면 왕국',
      year: '2025',
      format: '제품 광고',
      source: '농심',
      youtubeUrl: 'https://www.youtube.com/watch?v=cN7fM_m0TAM',
      award: { tier: '대상', contest: 'K-브랜드 콘텐츠 농심 부문' },
      theme: 'dark'
    },
    {
      id: 'yt-prompt',
      category: 'others',
      categoryLabel: '기타 영상',
      title: 'PROMPT',
      year: '2025',
      format: '블랙 코미디',
      source: '공모전',
      youtubeUrl: 'https://www.youtube.com/watch?v=cSMN1ACu6Qc',
      award: { tier: '우수상', contest: '대전 AI 영상 콘텐츠 공모전' },
      theme: 'light'
    },
    {
      id: 'yt-today-korea',
      category: 'ads',
      categoryLabel: '광고',
      title: '오늘의 대한민국, 내일을 향해',
      year: '2025',
      format: '캠페인 광고',
      source: 'KOICA',
      youtubeUrl: 'https://www.youtube.com/watch?v=mAIZWyQuPJ4',
      award: { tier: '장려상', contest: '대한민국 인도적 지원 AI 홍보 공모전' },
      theme: 'dark'
    },
    {
      id: 'yt-occuloc',
      category: 'ads',
      categoryLabel: '광고',
      title: '시각·청각적 체험형 콘텐츠 영상',
      year: '2025',
      format: '브랜드 필름',
      source: 'OCCULOC',
      youtubeUrl: 'https://www.youtube.com/watch?v=WxhH3B0zzkE',
      theme: 'dark'
    },
    {
      id: 'yt-weak-hero',
      category: 'others',
      categoryLabel: '기타 영상',
      title: 'WEAK HERO',
      year: '2025',
      format: '단편 영화',
      source: '자체 제작',
      youtubeUrl: 'https://www.youtube.com/watch?v=edyYgpi27xU',
      theme: 'light'
    },
    {
      id: 'yt-hoochamjal',
      category: 'ads',
      categoryLabel: '광고',
      title: '후회없이 참 잘한 선택, 후참잘',
      year: '2025',
      format: '브랜드 광고',
      source: '후참잘',
      youtubeUrl: 'https://www.youtube.com/watch?v=KOKwG5u83Bs',
      theme: 'dark'
    },
    {
      id: 'yt-pick-my-style',
      category: 'ads',
      categoryLabel: '광고',
      title: 'PICK MY STYLE',
      year: '2025',
      format: '브랜드 광고',
      source: '무신사',
      youtubeUrl: 'https://www.youtube.com/watch?v=BL73KI6sYd4',
      theme: 'dark'
    },
    {
      id: 'yt-cham-hyoeun',
      category: 'ads',
      categoryLabel: '광고',
      title: '부모님의 행복한 노후',
      year: '2025',
      format: '브랜드 광고',
      source: '참효은재가노인복지센터',
      youtubeUrl: 'https://youtu.be/cFjAiNF4OkE',
      theme: 'dark'
    },
    {
      id: 'yt-mcd-newyear-burger',
      category: 'ads',
      categoryLabel: '광고',
      title: 'Happy New Year Burger',
      year: '2025',
      format: '제품 광고',
      source: '맥도날드',
      youtubeUrl: 'https://youtu.be/TPxmf-OJ8t0',
      theme: 'dark'
    },
    {
      id: 'yt-financier',
      category: 'ads',
      categoryLabel: '광고',
      title: 'Not a Cigar, Financier',
      year: '2025',
      format: '제품 광고',
      source: 'New York Gong-Gan',
      youtubeUrl: 'https://youtu.be/b7yobYT6gA0',
      theme: 'dark'
    },
    {
      id: 'yt-labrac-escape',
      category: 'ads',
      categoryLabel: '광고',
      title: '일상을 탈출하는 가장 완벽한 방법',
      year: '2025',
      format: '제품 광고',
      source: '라브라크',
      youtubeUrl: 'https://youtu.be/KSt0_2IU5-8',
      theme: 'dark'
    },
    {
      id: 'yt-bellnova',
      category: 'ads',
      categoryLabel: '광고',
      title: '변하지 않는 가치',
      year: '2025',
      format: '브랜드 광고',
      source: '벨노바',
      youtubeUrl: 'https://youtu.be/83RExRbz2_4',
      theme: 'dark'
    },
    {
      id: 'yt-lifetime-trailer',
      category: 'others',
      categoryLabel: '기타 영상',
      title: "'라이프 타임' 예고편",
      year: '2025',
      format: '프로포즈 영상',
      source: '개인 주문',
      youtubeUrl: 'https://youtu.be/eySPQtTqLMI',
      theme: 'light'
    },
    {
      id: 'yt-bikemart-1',
      category: 'ads',
      categoryLabel: '광고',
      title: '그냥 등록하면 되잖아',
      year: '2025',
      format: '앱 광고',
      source: '바이크마트',
      youtubeUrl: 'https://youtu.be/20BYQaWX8A0',
      theme: 'dark'
    },
    {
      id: 'yt-bikemart-2',
      category: 'ads',
      categoryLabel: '광고',
      title: '너도 어서 등록해',
      year: '2025',
      format: '앱 광고',
      source: '바이크마트',
      youtubeUrl: 'https://youtu.be/kS-V91usrL8',
      theme: 'dark'
    },
    {
      id: 'yt-jeongdam-pyogo',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '신입사원 김표고',
      year: '2025',
      format: '브랜드 컨텐츠',
      source: '농업회사법인 정담',
      youtubeUrl: 'https://youtube.com/shorts/6MAKS66szeg',
      theme: 'light'
    },
    {
      id: 'yt-kpt-final-table',
      category: 'others',
      categoryLabel: '기타 영상',
      title: 'KPT & DXG FINAL TABLE',
      year: '2025',
      format: '대회 전광판',
      source: 'KOREAN POKER TOUR',
      youtubeUrl: 'https://youtu.be/QNNCyXS5n1s',
      theme: 'light'
    },
    {
      id: 'yt-jeongdam-salt',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '천연소금 4종 제품 소개',
      year: '2025',
      format: '제품 광고',
      source: '농업회사법인 정담',
      youtubeUrl: 'https://youtube.com/shorts/eJzxE88IoEw',
      theme: 'light'
    },
    {
      id: 'yt-jeongdam-mushroom',
      category: 'vertical',
      categoryLabel: '세로형',
      title: '천연화장품 백목이버섯 활용법',
      year: '2025',
      format: '제품 광고',
      source: '농업회사법인 정담',
      youtubeUrl: 'https://youtube.com/shorts/Dag4yWdPpNc',
      theme: 'light'
    },
    {
      id: 'yt-kpt-premier',
      category: 'others',
      categoryLabel: '기타 영상',
      title: 'KPT PREMIER SERIES CHAMPIONSHIP',
      year: '2025',
      format: '대회 전광판',
      source: 'KOREAN POKER TOUR',
      youtubeUrl: 'https://youtu.be/ltbjbj85ukI',
      theme: 'light'
    },
    {
      id: 'yt-hiro-gourmet',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '폭주하는 미식가, 히로',
      year: '2025',
      format: '유튜브 인트로',
      source: '개인 유튜버',
      youtubeUrl: 'https://youtu.be/RqgMuEmVS84',
      theme: 'light'
    },
    {
      id: 'yt-mathholic-main',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '학원의 모든 해답, 2026 학에페',
      year: '2026',
      format: '행사 메인 영상',
      source: '매쓰홀릭',
      youtubeUrl: 'https://youtu.be/fA0ViFFsZ60',
      theme: 'light'
    },
    {
      id: 'yt-mathholic-teaser1',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '우리 학원만의 한 끗, 2026 학에페',
      year: '2026',
      format: '행사 티저 영상',
      source: '매쓰홀릭',
      youtubeUrl: 'https://youtu.be/J8PpddgTFpo',
      theme: 'light'
    },
    {
      id: 'yt-mathholic-teaser2',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '학원 성공의 노하우, 2026 학에페',
      year: '2026',
      format: '행사 티저 영상',
      source: '매쓰홀릭',
      youtubeUrl: 'https://youtu.be/YQmgAFsQyG0',
      theme: 'light'
    },
    {
      id: 'yt-bikemart-3',
      category: 'ads',
      categoryLabel: '광고',
      title: '올리자마자, 쿨거래',
      year: '2025',
      format: '앱 광고',
      source: '바이크마트',
      youtubeUrl: 'https://youtu.be/2dfZLxqFwgs',
      theme: 'dark'
    },
    {
      id: 'yt-bikemart-4',
      category: 'ads',
      categoryLabel: '광고',
      title: '바이크마트 슈퍼 세일',
      year: '2025',
      format: '앱 광고',
      source: '바이크마트',
      youtubeUrl: 'https://youtu.be/ycQO1r9RxcE',
      theme: 'dark'
    },
    {
      id: 'yt-deopocket',
      category: 'ads',
      categoryLabel: '광고',
      title: '공간을 지키는 탈취제',
      year: '2025',
      format: '제품 광고',
      source: '데오포켓',
      youtubeUrl: 'https://youtu.be/6XvkUQwWegI',
      theme: 'dark'
    },
    {
      id: 'yt-kfotito',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '멕시코에서 즐기는 인생네컷',
      year: '2025',
      format: '매장 디스플레이',
      source: 'K-FOTITO',
      youtubeUrl: 'https://youtu.be/HIhTqsPYyH4',
      theme: 'light'
    },
    {
      id: 'yt-ajw-teaser',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '1997 안재욱이 가고 있어!',
      year: '2025',
      format: '행사 티저 영상',
      source: '안재욱 팬미팅',
      youtubeUrl: 'https://youtu.be/wNpYFpk-Fi8',
      theme: 'light'
    },
    {
      id: 'yt-ajw-main',
      category: 'others',
      categoryLabel: '기타 영상',
      title: '1997 안재욱이 상하이에 온다면?',
      year: '2025',
      format: '행사 메인 영상',
      source: '안재욱 팬미팅',
      youtubeUrl: 'https://youtu.be/7tyImYjmPE0',
      theme: 'light'
    },
    {
      id: 'yt-ajw-scene1',
      category: 'others',
      categoryLabel: '기타 영상',
      title: "'별은 내 가슴에' 명장면 재연 1",
      year: '2025',
      format: '행사 서브 영상',
      source: '안재욱 팬미팅',
      youtubeUrl: 'https://youtu.be/pKtRlCxvG-4',
      theme: 'light'
    },
    {
      id: 'yt-ajw-scene2',
      category: 'others',
      categoryLabel: '기타 영상',
      title: "'별은 내 가슴에' 명장면 재연 2",
      year: '2025',
      format: '행사 서브 영상',
      source: '안재욱 팬미팅',
      youtubeUrl: 'https://youtu.be/r8G-snSocH0',
      theme: 'light'
    },
    {
      id: 'yt-ajw-scene3',
      category: 'others',
      categoryLabel: '기타 영상',
      title: "'별은 내 가슴에' 명장면 재연 3",
      year: '2025',
      format: '행사 서브 영상',
      source: '안재욱 팬미팅',
      youtubeUrl: 'https://youtu.be/wv8MMzBINoY',
      theme: 'light'
    }
  ];

  const featuredWorkIds = ['yt-shinramyun', 'yt-today-korea', 'yt-occuloc', 'yt-hoochamjal'];

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
          <div class="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-9">
            <div class="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div class="flex items-center gap-3">
                  <span class="brand-mark" aria-hidden="true">F</span>
                  <span class="text-sm tracking-[0.24em] text-white/80">FRUSH STUDIO</span>
                </div>
                <p class="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">업체 정보</p>
                <div class="mt-4 space-y-2 text-sm leading-6 text-white/72">
                  <p><span class="font-semibold text-white">업체명</span> 프러쉬 스튜디오</p>
                  <p><span class="font-semibold text-white">대표자</span> 서보훈</p>
                  <p><span class="font-semibold text-white">사업자 등록번호</span> 310-72-00689</p>
                  <p><span class="font-semibold text-white">주소</span> 서울특별시 강남구 논현로 10길 30 5층</p>
                  <p><span class="font-semibold text-white">소개</span> 원하는 모든 영상, 기획부터 제작까지 한 번에 해결하는, AI 영상 제작 스튜디오</p>
                </div>
              </div>
              <div class="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand-main">문의</p>
                <div class="mt-4 space-y-1.5 text-sm leading-6 text-white/72">
                  <p class="font-semibold text-white">메인 이메일</p>
                  <p><a href="mailto:frush.brand@gmail.com" class="transition hover:text-brand-main">frush.brand@gmail.com</a></p>
                </div>
                <a href="${KAKAO_URL}" target="_blank" rel="noreferrer" class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-main px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">문의하기</a>
                <a href="https://blog.naver.com/frush_brand" target="_blank" rel="noreferrer" class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">블로그 보러가기 <i class="fas fa-arrow-up-right-from-square text-xs"></i></a>
              </div>
            </div>
            <div class="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm text-white/45">Copyright © 2026 Frush. All rights reserved.</p>
              <p class="text-sm text-white/45">Seoul · AI Video Production Studio</p>
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
      <section class="reveal" data-reveal>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-slate-200/80 pb-6 md:pb-8">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Partners</p>
            <h2 class="mt-3 text-3xl font-semibold text-brand-text sm:text-4xl">협력 업체와 브랜드가 Frush와 함께 움직입니다</h2>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">프러쉬는 업종과 포맷이 다른 협력사들과 함께 장면의 목적을 설계하고 결과물의 완성도까지 끌어올립니다.</p>
          </div>
        </div>
        <div class="partner-marquee mt-8">
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
            ${work.award ? `
            <span class="award-ribbon">
              <span class="award-ribbon__icon"><i class="fas fa-trophy"></i></span>
              <span class="award-ribbon__text">
                <span class="award-ribbon__tier">${work.award.tier}</span>
                <span class="award-ribbon__contest">${work.award.contest}</span>
              </span>
            </span>
            ` : ''}
          </div>
          <div class="p-6">
            <p class="text-lg font-semibold ${textColor}">${work.title}</p>
            <div class="mt-4 space-y-2 text-sm ${subColor}">
              <p><span class="font-semibold ${textColor}">종류</span> ${work.format}</p>
              ${options.showSource && work.source ? `<p><span class="font-semibold ${textColor}">소재</span> ${work.source}</p>` : ''}
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
      // Featured: keep the explicit, hand-picked order.
      selected = filter.map((id) => works.find((work) => work.id === id)).filter(Boolean);
    } else if (typeof filter === 'string') {
      // Category pages: newest publishedAt first (latest lands top-left).
      // publishedAt is never rendered; it is only a sort key. Items without
      // a date sort to the end, preserving their array order among themselves.
      selected = works
        .filter((work) => work.category === filter)
        .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
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

    const stats = [
      { value: '50+', label: '누적 제작 실적' },
      { value: '5.0', label: '프로젝트 만족도' },
      { value: 'ALL', label: '세로형·광고·필름 전 포맷' }
    ];

    target.innerHTML = `
      <section class="grid items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <article class="strength-card strength-card--team flex flex-col rounded-[2.25rem] p-7 shadow-soft reveal sm:p-9" data-reveal>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Why Frush</p>
          <h2 class="mt-4 text-3xl font-semibold leading-[1.18] text-white sm:text-[2.4rem]">전략과 실행, 그리고 신뢰를<br class="hidden sm:block"> 한 팀으로 연결합니다</h2>
          <p class="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">서울대 출신 대표, PD 출신 기획자, 전문성 있는 영상 작업자 팀이 함께 브랜드 목적을 정리하고 결과물까지 밀도 있게 완성합니다.</p>
          <div class="team-photo-frame mt-8 overflow-hidden rounded-[1.75rem]">
            <img src="${assetPath(TEAM_PHOTO_URL)}" alt="프러쉬 스튜디오 팀 단체 사진" class="h-full w-full object-cover">
          </div>
          <div class="strength-stat-row mt-auto pt-8">
            ${stats.map((stat) => `
              <div class="strength-stat">
                <span class="strength-stat__value">${stat.value}</span>
                <span class="strength-stat__label">${stat.label}</span>
              </div>
            `).join('')}
          </div>
        </article>
        <article class="strength-card strength-card--awards flex flex-col rounded-[2.25rem] p-7 shadow-soft reveal sm:p-9" data-reveal>
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.28em] text-brand-main">Awards</p>
              <h2 class="mt-3 text-3xl font-semibold text-brand-text">프러쉬의 수상 이력 <span class="text-brand-main">7</span>개</h2>
              <p class="mt-3 text-sm leading-6 text-slate-500">국내외 영상·AI 콘텐츠 공모전에서 검증된 기획력과 완성도.</p>
            </div>
            <div class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-brand-light shadow-soft md:flex">
              <i class="fas fa-award text-xl"></i>
            </div>
          </div>
          <div class="mt-7 grid flex-1 content-start gap-3.5 sm:grid-cols-2">
            ${awards.map((award) => `
              <div class="award-chip rounded-[1.4rem] border border-slate-200/70 bg-white px-5 py-4">
                <div class="flex flex-wrap items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-main">
                  <span>${award.year}</span>
                  <span class="h-1 w-1 rounded-full bg-brand-main/70"></span>
                  <span class="text-slate-400">${award.org}</span>
                </div>
                <p class="mt-2.5 text-[0.95rem] font-semibold leading-6 text-brand-text">${award.title}</p>
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
        <div class="stacked-panel-image" style="background-image:url('${assetPath(PANEL_IMAGES[index % PANEL_IMAGES.length])}')"></div>
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
        return { radius: 250, cardWidth: 92, cardHeight: 132, arcLift: -8 };
      }
      if (width < 1024) {
        return { radius: 380, cardWidth: 120, cardHeight: 172, arcLift: -10 };
      }
      return { radius: 540, cardWidth: 150, cardHeight: 214, arcLift: -12 };
    };

    const updatePanels = () => {
      const { radius, cardWidth, cardHeight, arcLift } = getDimensions();
      // A wide, even arch that sweeps over the headline (image reference).
      const startAngle = 196;
      const endAngle = 344;
      const step = (endAngle - startAngle) / Math.max(PANEL_COUNT - 1, 1);

      // Panels are anchored to the TOP of the hero section (see .stacked-panel
      // top:0), so this offset places the arch a fixed distance below the top —
      // its peak always clears the fixed nav bar regardless of viewport height
      // (previously it hid behind the nav on wide/short windows).
      const topClearance = 140; // peak distance below section top (post-perspective)
      const archOffsetY = topClearance + cardHeight / 2 + radius + arcLift;

      // The whole arch reacts to the pointer as one 3D object.
      const sceneShiftX = currentPointerX * 26;
      const sceneShiftY = currentPointerY * -16;
      const sceneRotateX = 6 + currentPointerY * -12;
      const sceneRotateY = currentPointerX * 16;

      container.style.transform = `translate3d(${sceneShiftX}px, ${sceneShiftY}px, 0) rotateX(${sceneRotateX}deg) rotateY(${sceneRotateY}deg)`;

      panels.forEach(({ panel, index }) => {
        const angle = startAngle + step * index;
        const angleRad = (angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius + archOffsetY;
        const spread = index / Math.max(PANEL_COUNT - 1, 1);
        const centerDistance = Math.abs(spread - 0.5);

        // Each card sits tangent to the arc; subtle per-card parallax on hover.
        // The scene uses preserve-3d, so stacking is decided by real depth (z),
        // not z-index. A small directional bias keeps the two apex cards from
        // sharing the exact same depth — otherwise they z-fight and overlap
        // messily on touch devices, where there's no pointer tilt to separate
        // them. This makes one centre card sit cleanly on top.
        const depthBias = (spread - 0.5) * 60;
        const depth = (0.5 - centerDistance) * 200 - 80 + depthBias;
        const depthOffset = currentPointerX * (12 + spread * 22);
        const lift = currentPointerY * (14 + (1 - centerDistance) * 16);
        const scale = 0.9 + (1 - centerDistance) * 0.16 + Math.abs(currentPointerY) * 0.02;
        const tangent = angle - 270; // rotate to follow the arc tangent
        const rotateZ = tangent * 0.55 + currentPointerX * 6;
        const rotateX = currentPointerY * -10 + (0.5 - centerDistance) * 3;
        const rotateY = currentPointerX * 12 + (spread - 0.5) * 14;

        panel.style.width = `${cardWidth}px`;
        panel.style.height = `${cardHeight}px`;
        panel.style.marginLeft = `${-cardWidth / 2}px`;
        panel.style.marginTop = `${-cardHeight / 2}px`;
        panel.style.opacity = `${0.62 + (1 - centerDistance) * 0.38}`;
        panel.style.zIndex = `${Math.round((1 - centerDistance) * 100)}`;
        panel.style.transform = `translate3d(${x - depthOffset}px, ${y + lift}px, ${depth + currentPointerX * 20 - currentPointerY * 8}px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      });
    };

    const animatePanels = () => {
      currentPointerX += (targetPointerX - currentPointerX) * 0.075;
      currentPointerY += (targetPointerY - currentPointerY) * 0.075;
      updatePanels();
      window.requestAnimationFrame(animatePanels);
    };

    updatePanels();
    animatePanels();

    // Track the pointer across the whole hero SECTION (content sits above the
    // backdrop in its own stacking context, so listening on the section is the
    // only way to catch movement over the centred copy too).
    const stageRoot = stage.closest('.hero-section') || stage.closest('section') || stage;
    stageRoot.addEventListener('mousemove', (event) => {
      const rect = stageRoot.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    stageRoot.addEventListener('mouseleave', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    });

    window.addEventListener('resize', updatePanels);
  }

  function setupShowcaseCarousel() {
    const el = document.querySelector('[data-showcase]');
    if (!el) return;

    let slides;
    try {
      slides = JSON.parse(el.dataset.slides || '[]');
    } catch (error) {
      return;
    }
    if (!slides.length) return;

    const media = el.querySelector('[data-showcase-media]');
    const title = el.querySelector('[data-showcase-title]');
    const tag = el.querySelector('[data-showcase-tag]');
    const time = el.querySelector('[data-showcase-time]');
    const play = el.querySelector('[data-showcase-play]');
    const dotsWrap = el.querySelector('[data-showcase-dots]');
    const prev = el.querySelector('[data-showcase-prev]');
    const next = el.querySelector('[data-showcase-next]');

    let index = 0;

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `<i${i === 0 ? ' class="is-active"' : ''}></i>`).join('');
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    const render = () => {
      const slide = slides[index];
      if (media) {
        media.src = assetPath(slide.img);
        media.alt = slide.title || '';
      }
      if (title) title.textContent = slide.title || '';
      if (tag) tag.textContent = slide.tag || '';
      if (time) time.textContent = slide.time || '';
      if (play) {
        play.dataset.videoSrc = assetPath(slide.video);
        play.dataset.videoPoster = assetPath(slide.img);
        play.dataset.videoTitle = slide.title || '영상 보기';
        play.dataset.videoType = 'local';
      }
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };

    const step = (delta) => {
      index = (index + delta + slides.length) % slides.length;
      render();
    };

    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; render(); }));

    render();
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
    if (config.collectionTargetId && config.collectionKey) renderWorks(config.collectionTargetId, config.collectionKey, { surface: 'light', dark: false, showSource: true });

    setupNavbar();
    setupModal();
    setupShowcaseCarousel();
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
