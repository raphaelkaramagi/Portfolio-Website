import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DESKTOP_BLOBS = [
  {
    key: 'red-tl',
    attraction: 180,
    fill: 'rgb(196, 30, 30)',
    fillOpacity: 0.2,
    style: {
      top: '-6%',
      left: '-4%',
      width: '36vw',
      height: '36vw',
    },
    animation: 'blob-drift-a 26s ease-in-out infinite',
  },
  {
    key: 'orange-tr',
    attraction: 130,
    fill: 'rgb(234, 88, 12)',
    fillOpacity: 0.17,
    style: {
      top: '-10%',
      right: '-6%',
      width: '30vw',
      height: '30vw',
    },
    animation: 'blob-drift-b 32s ease-in-out infinite',
  },
  {
    key: 'amber-bl',
    attraction: 220,
    fill: 'rgb(245, 158, 11)',
    fillOpacity: 0.14,
    style: {
      bottom: '-8%',
      left: '-4%',
      width: '40vw',
      height: '40vw',
    },
    animation: 'blob-drift-c 38s ease-in-out infinite',
  },
  {
    key: 'ember-br',
    attraction: 150,
    fill: 'rgb(220, 80, 40)',
    fillOpacity: 0.11,
    style: {
      bottom: '-12%',
      right: '-8%',
      width: '26vw',
      height: '26vw',
    },
    animation: 'blob-drift-d 28s ease-in-out infinite',
  },
]

const MOBILE_BLOBS = [DESKTOP_BLOBS[0], DESKTOP_BLOBS[2]]

const AMBIENT_STRENGTH = 0.6

/** Per-blob idle motion — dual sine waves for organic, non-repeating drift */
const IDLE_PROFILES = [
  { ax: 58, ay: 50, sx: 0.00041, sy: 0.00035, px: 0, py: 1.1, ax2: 30, ay2: 34, sx2: 0.00068, sy2: 0.00058, px2: 2.4, py2: 0.7 },
  { ax: 48, ay: 56, sx: 0.00038, sy: 0.00044, px: 0.8, py: 2.2, ax2: 24, ay2: 28, sx2: 0.00061, sy2: 0.00071, px2: 1.5, py2: 3.1 },
  { ax: 66, ay: 54, sx: 0.00033, sy: 0.00039, px: 1.6, py: 0.3, ax2: 32, ay2: 30, sx2: 0.00055, sy2: 0.00064, px2: 3.8, py2: 1.9 },
  { ax: 44, ay: 48, sx: 0.00047, sy: 0.00042, px: 2.1, py: 2.8, ax2: 22, ay2: 24, sx2: 0.00074, sy2: 0.00067, px2: 0.5, py2: 4.2 },
]

const IDLE_RAMP_MS = 180
const IDLE_BLEND = 0.022

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let idleMix = isCoarse ? 1 : 0
    let lastMove = performance.now()
    let raf = 0
    let running = true

    const onMove = (e) => {
      if (isCoarse) return
      lastMove = performance.now()
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      target.x = e.clientX / w - 0.5
      target.y = e.clientY / h - 0.5
    }

    const idleOffset = (profile, t, mix) => {
      const ix =
        Math.sin(t * profile.sx + profile.px) * profile.ax +
        Math.sin(t * profile.sx2 + profile.px2) * profile.ax2
      const iy =
        Math.cos(t * profile.sy + profile.py) * profile.ay +
        Math.cos(t * profile.sy2 + profile.py2) * profile.ay2
      return { x: ix * mix, y: iy * mix }
    }

    const tick = (now) => {
      if (!running) return

      if (isCoarse) {
        idleMix = 1
      } else {
        const idleTarget = now - lastMove > IDLE_RAMP_MS ? 1 : 0
        idleMix += (idleTarget - idleMix) * IDLE_BLEND
        current.x += (target.x - current.x) * 0.05
        current.y += (target.y - current.y) * 0.05
      }

      const refs = blobRefs.current
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]
        if (!el) continue
        const attraction = parseFloat(el.dataset.attraction) || 80
        const profile = IDLE_PROFILES[i] ?? IDLE_PROFILES[0]
        const idle = idleOffset(profile, now, idleMix)

        const px = isCoarse ? idle.x : current.x * attraction + idle.x
        const py = isCoarse ? idle.y : current.y * attraction + idle.y

        el.style.transform = `translate3d(${px}px, ${py}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    if (!isCoarse) {
      window.addEventListener('mousemove', onMove, { passive: true })
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      if (!isCoarse) {
        window.removeEventListener('mousemove', onMove)
      }
    }
  }, [isMobile])

  const blobs = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS

  const baseBlur = isMobile ? 30 : 34
  const ambientBoost = 18
  const blurPx = baseBlur + (1 - strength) * ambientBoost
  const blobLayerOpacity = isMobile ? 1 : 0.52

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${blurPx}px)`,
          opacity: blobLayerOpacity,
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
              className="h-full w-full will-change-transform rounded-full"
              style={{
                background: b.fill,
                opacity: b.fillOpacity,
                animation: b.animation,
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
            'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10,10,15,0.55) 65%, rgba(10,10,15,0.92) 100%)',
          opacity: 0.7 + (1 - strength) * 0.3,
          transition: 'opacity 0.8s ease',
        }}
      />

      <div className="absolute inset-0 aurora-dither" aria-hidden />
    </div>
  )
}
