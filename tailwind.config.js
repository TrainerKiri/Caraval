/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0d1b2a',
        'light-deep-blue': '#1e2a3a',
        'soft-white': '#f5f5f5',
        'gold': '#d4af37',
        'caraval-red': '#8b1e3f',
        'caraval-purple': '#4c2c72',
        'caraval-blue': '#1e3f5a',
        'mystical-gold': '#c9a227',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'mystical': ['Playfair Display', 'serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out forwards',
        'bounce-x': 'bounceX 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(to right, #0d1b2a, #1e3f5a, #4c2c72)',
        'card-texture': 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
};