import { useEffect, useRef } from 'react'

function shouldDisable() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(pointer: coarse)').matches) return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  return false
}

export default function useMagnetic({ strength = 0.22, max = 7 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldDisable()) return

    let rafId = 0
    let tx = 0
    let ty = 0

    const apply = () => {
      rafId = 0
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      tx = Math.max(-max, Math.min(max, dx))
      ty = Math.max(-max, Math.min(max, dy))
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    el.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
      el.style.transform = ''
      el.style.transition = ''
    }
  }, [strength, max])

  return ref
}
