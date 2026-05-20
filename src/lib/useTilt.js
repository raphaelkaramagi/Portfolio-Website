import { useEffect, useRef } from 'react'

function shouldDisable() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(pointer: coarse)').matches) return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  return false
}

export default function useTilt({ max = 5, scale = 1.0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldDisable()) return

    let rafId = 0
    let rx = 0
    let ry = 0

    const apply = () => {
      rafId = 0
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      ry = (px - 0.5) * 2 * max
      rx = -(py - 0.5) * 2 * max
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      rx = 0
      ry = 0
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)'
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
      el.style.transform = ''
      el.style.transition = ''
      el.style.transformStyle = ''
    }
  }, [max, scale])

  return ref
}
