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
        'dark-bg': 'rgb(var(--c-bg) / <alpha-value>)',
        'dark-text': 'rgb(var(--c-text) / <alpha-value>)',
        overlay: 'rgb(var(--c-overlay) / <alpha-value>)',
        brand: {
          red: 'rgb(var(--c-brand-red) / <alpha-value>)',
          orange: 'rgb(var(--c-brand-orange) / <alpha-value>)',
          amber: 'rgb(var(--c-brand-amber) / <alpha-value>)',
          cream: 'rgb(var(--c-brand-cream) / <alpha-value>)',
        },
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
