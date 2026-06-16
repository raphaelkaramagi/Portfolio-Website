import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'theme'
const DEFAULT_THEME = 'light'
const VALID = new Set(['light', 'dark'])

function readStoredTheme() {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return VALID.has(stored) ? stored : null
}

function readDomTheme() {
  if (typeof document === 'undefined') return DEFAULT_THEME
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.content = theme === 'light' ? '#F5EEE6' : '#0A0A0F'
  }
}

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readDomTheme)
  const [userChoice, setUserChoice] = useState(() => readStoredTheme() !== null)

  useEffect(() => {
    applyTheme(theme)
    if (userChoice) {
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme, userChoice])

  const setTheme = useCallback((next) => {
    if (!VALID.has(next)) return
    setUserChoice(true)
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setUserChoice(true)
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggle, isLight: theme === 'light' }),
    [theme, setTheme, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
