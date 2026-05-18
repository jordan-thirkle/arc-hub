/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Inter"', 'system-ui', 'sans-serif'],
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
        danger: 'rgb(var(--danger))',
        'stat-bar': 'rgb(var(--stat-bar-bg))',
        'stat-fill': 'rgb(var(--stat-bar-fill))',
      },
    },
  },
  plugins: [],
};
