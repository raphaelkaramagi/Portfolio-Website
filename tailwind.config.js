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
        paper: '#E8E4DD',
        offwhite: '#F5F3EE',
        dark: '#111111',
        'dark-bg': '#0A0A0F',
        'dark-card': '#15151B',
        'dark-card-alt': '#1B1B22',
        'dark-text': '#EDEDF0',
        aurora: {
          violet: '#8B5CF6',
          blue: '#3B82F6',
          pink: '#EC4899',
          cyan: '#22D3EE',
        },
      },
      backgroundImage: {
        'gradient-aurora':
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)',
        'gradient-aurora-soft':
          'linear-gradient(135deg, rgba(139,92,246,0.85) 0%, rgba(59,130,246,0.85) 50%, rgba(236,72,153,0.85) 100%)',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl-plus': '2rem',
        '4xl': '4rem',
      },
      boxShadow: {
        'glass': '0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
        'glow-violet': '0 0 60px -10px rgba(139,92,246,0.45)',
        'glow-pink': '0 0 60px -10px rgba(236,72,153,0.45)',
      },
    },
  },
  plugins: [],
}
