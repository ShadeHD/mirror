/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mirror-bg': '#0A0A0F',
        'mirror-panel': '#13131A',
        'mirror-purple': '#6C63FF',
        'mirror-red': '#FF6584',
        'mirror-cyan': '#00D9FF',
        'mirror-text': '#E8E8F0',
        'mirror-text-dim': '#8B8B9F',
        'mirror-border': '#1F1F2E',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(108, 99, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-red': '0 0 20px rgba(255, 101, 132, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}