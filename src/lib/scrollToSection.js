const NAV_SCROLL_OFFSET = 88

export default function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const y = window.scrollY + el.getBoundingClientRect().top - NAV_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}
