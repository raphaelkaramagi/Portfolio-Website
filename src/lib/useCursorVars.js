import { useEffect, useRef } from 'react'

function shouldDisable() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(pointer: coarse)').matches) return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  return false
}

export default function useCursorVars() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldDisable()) return

    let rafId = 0
    let pendingX = 50
    let pendingY = 50

    const flush = () => {
      rafId = 0
      el.style.setProperty('--mx', `${pendingX}%`)
      el.style.setProperty('--my', `${pendingY}%`)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      pendingX = ((e.clientX - rect.left) / rect.width) * 100
      pendingY = ((e.clientY - rect.top) / rect.height) * 100
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    const onLeave = () => {
      pendingX = 50
      pendingY = 50
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return ref
}
