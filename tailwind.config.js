/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vercel / Geist-inspired neutral scale (dark-first)
        gray: {
          50: '#fafafa',
          100: '#ededed',
          200: '#a1a1a1',
          300: '#8f8f8f',
          400: '#7d7d7d',
          500: '#666666',
          600: '#4d4d4d',
          700: '#2e2e2e',
          800: '#1f1f1f',
          900: '#161616',
          950: '#0a0a0a',
        },
        // Page + surface backgrounds
        canvas: '#000000',
        surface: {
          DEFAULT: '#0a0a0a',
          raised: '#111111',
          hover: '#1a1a1a',
        },
        line: {
          DEFAULT: '#2e2e2e',
          subtle: '#1f1f1f',
        },
        // Accent — Vercel blue
        primary: {
          DEFAULT: '#0072f5',
          light: '#3291ff',
          dark: '#005cc5',
        },
        status: {
          live: '#0cce6b',
          building: '#f5a623',
          upcoming: '#8a63d2',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      backgroundImage: {
        'grid-line':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'dot': 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-line': '56px 56px',
        'dot': '22px 22px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 24s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      borderRadius: {
        'lg': '10px',
        'xl': '14px',
        '2xl': '18px',
      },
      boxShadow: {
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 2px 8px rgba(0,0,0,0.4)',
        'glow': '0 0 0 1px rgba(255,255,255,0.14), 0 8px 40px rgba(0,0,0,0.6)',
        'accent-glow': '0 0 40px -8px rgba(0,114,245,0.5)',
      },
    },
  },
  plugins: [],
}
