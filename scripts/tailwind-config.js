tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#064E3B',
          main: '#10B981',
          light: '#ECFDF5',
          accent: '#F59E0B',
          text: '#1F2937'
        }
      },
      boxShadow: {
        soft: '0 30px 80px rgba(0, 0, 0, 0.18)',
        glow: '0 0 0 1px rgba(16, 185, 129, 0.2), 0 18px 60px rgba(16, 185, 129, 0.22)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
      }
    }
  }
};
