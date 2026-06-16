import { Sun, Moon } from 'lucide-react'
import useTheme from '../lib/useTheme'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`theme-toggle relative flex h-9 w-9 shrink-0 items-center justify-center text-dark-text/55 transition-colors duration-300 hover:text-brand-red ${focusRing} ${className}`}
    >
      <Sun
        className={`theme-toggle-icon absolute h-[18px] w-[18px] text-[#EAB308] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
        aria-hidden
      />
      <Moon
        className={`theme-toggle-icon absolute h-[18px] w-[18px] text-[#3B82F6] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
        aria-hidden
      />
    </button>
  )
}
