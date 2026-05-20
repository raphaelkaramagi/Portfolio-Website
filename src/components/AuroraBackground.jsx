import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DESKTOP_BLOBS = [
  {
    key: 'violet-tl',
    attraction: 180,
    style: {
      top: '-6%',
      left: '-4%',
      width: '58vw',
      height: '58vw',
    },
    inner: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.82), rgba(139,92,246,0) 60%)',
      animation: 'blob-drift-a 28s ease-in-out infinite',
    },
  },
  {
    key: 'blue-tr',
    attraction: 130,
    style: {
      top: '-10%',
      right: '-6%',
      width: '52vw',
      height: '52vw',
    },
    inner: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.74), rgba(59,130,246,0) 60%)',
      animation: 'blob-drift-b 36s ease-in-out infinite',
    },
  },
  {
    key: 'pink-bl',
    attraction: 220,
    style: {
      bottom: '-8%',
      left: '-4%',
      width: '62vw',
      height: '62vw',
    },
    inner: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.66), rgba(236,72,153,0) 62%)',
      animation: 'blob-drift-c 42s ease-in-out infinite',
    },
  },
  {
    key: 'cyan-br',
    attraction: 150,
    style: {
      bottom: '-12%',
      right: '-8%',
      width: '46vw',
      height: '46vw',
    },
    inner: {
      background:
        'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.46), rgba(34,211,238,0) 60%)',
      animation: 'blob-drift-d 32s ease-in-out infinite',
    },
  },
]

const MOBILE_BLOBS = [DESKTOP_BLOBS[0], DESKTOP_BLOBS[2]]

const AMBIENT_STRENGTH = 0.6

export default function AuroraBackground() {
  const blobRefs = useRef([])
  const [strength, setStrength] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    let raf = 0
    let attempts = 0
    let io = null

    const attach = () => {
      const hero = document.getElementById('hero')
      if (!hero) {
        if (attempts++ < 12) {
          raf = requestAnimationFrame(attach)
        } else {
          setStrength(AMBIENT_STRENGTH)
        }
        return
      }

      io = new IntersectionObserver(
        (entries) => {
          const e = entries[0]
          if (!e) return
          const ratio = Math.max(0, Math.min(1, e.intersectionRatio))
          setStrength(AMBIENT_STRENGTH + (1 - AMBIENT_STRENGTH) * ratio)
        },
        { threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
      )
      io.observe(hero)
    }

    raf = requestAnimationFrame(attach)

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let raf = 0
    let running = true

    const onMove = (e) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      target.x = e.clientX / w - 0.5
      target.y = e.clientY / h - 0.5
    }

    const tick = () => {
      if (!running) return
      current.x += (target.x - current.x) * 0.05
      current.y += (target.y - current.y) * 0.05

      const refs = blobRefs.current
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]
        if (!el) continue
        const a = parseFloat(el.dataset.attraction) || 80
        el.style.transform = `translate3d(${current.x * a}px, ${current.y * a}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [isMobile])

  const blobs = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS

  const baseBlur = isMobile ? 44 : 54
  const ambientBoost = isMobile ? 30 : 44
  const blurPx = baseBlur + (1 - strength) * ambientBoost

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${blurPx}px)`,
          transition: 'filter 0.8s ease',
        }}
      >
        {blobs.map((b, i) => (
          <div
            key={b.key}
            ref={(el) => {
              blobRefs.current[i] = el
            }}
            data-attraction={b.attraction}
            className="absolute will-change-transform"
            style={{
              ...b.style,
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <div
              data-aurora-blob
              className="h-full w-full will-change-transform"
              style={{
                ...b.inner,
                borderRadius: '50%',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10,10,15,0.4) 70%, rgba(10,10,15,0.85) 100%)',
          opacity: 0.55 + (1 - strength) * 0.45,
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  )
}
