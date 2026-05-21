/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Barlow Condensed"', 'sans-serif'],
        heading: ['"Barlow Condensed"', 'sans-serif'],
        subheading: ['"Prompt"', 'sans-serif'],
      },
      colors: {
        page: 'rgb(var(--bg-page))',
        surface: 'rgb(var(--bg-surface))',
        elevated: 'rgb(var(--bg-elevated))',
        'border-primary': 'rgb(var(--border-primary))',
        'border-accent': 'rgb(var(--border-accent))',
        primary: 'rgb(var(--text-primary))',
        secondary: 'rgb(var(--text-secondary))',
        tertiary: 'rgb(var(--text-tertiary))',
        accent: 'rgb(var(--accent))',
        'accent-hover': 'rgb(var(--accent-hover))',
        'accent-orange': 'rgb(var(--accent-orange))',
        'accent-cyan': 'rgb(var(--accent-cyan))',
        'accent-blue': 'rgb(var(--accent-blue))',
        'accent-green': 'rgb(var(--accent-green))',
        'accent-warning': 'rgb(var(--accent-warning))',
        danger: 'rgb(var(--danger))',
        'stat-bar': 'rgb(var(--stat-bar-bg))',
        'stat-fill': 'rgb(var(--stat-bar-fill))',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.4)',
        'elevated': '0 8px 32px rgba(0,0,0,0.5)',
        'modal': '0 16px 48px rgba(0,0,0,0.6)',
        'glow-accent': '0 0 20px rgba(232,168,50,0.15)',
        'glow-accent-strong': '0 0 40px rgba(232,168,50,0.25)',
        'glow-blue': '0 0 20px rgba(0,184,255,0.15)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232,168,50,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(232,168,50,0.25)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scan-line': {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse at 50% 100%, rgba(232,168,50,0.08) 0%, transparent 60%)',
        'gradient-card': 'linear-gradient(180deg, rgba(232,237,242,0.03) 0%, transparent 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(232,168,50,0.15) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
