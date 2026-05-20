import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DESKTOP_BLOBS = [
  {
    key: 'violet-tl',
    style: {
      top: '-12%',
      left: '-10%',
      width: '62vw',
      height: '62vw',
      background:
        'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.62), rgba(139,92,246,0) 62%)',
      animation: 'blob-drift-a 32s ease-in-out infinite',
    },
  },
  {
    key: 'blue-tr',
    style: {
      top: '-18%',
      right: '-14%',
      width: '58vw',
      height: '58vw',
      background:
        'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.55), rgba(59,130,246,0) 60%)',
      animation: 'blob-drift-b 38s ease-in-out infinite',
    },
  },
  {
    key: 'pink-bl',
    style: {
      bottom: '-22%',
      left: '-8%',
      width: '64vw',
      height: '64vw',
      background:
        'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.48), rgba(236,72,153,0) 62%)',
      animation: 'blob-drift-c 44s ease-in-out infinite',
    },
  },
  {
    key: 'cyan-br',
    style: {
      bottom: '-18%',
      right: '-12%',
      width: '50vw',
      height: '50vw',
      background:
        'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.32), rgba(34,211,238,0) 60%)',
      animation: 'blob-drift-d 36s ease-in-out infinite',
    },
  },
]

const MOBILE_BLOBS = [DESKTOP_BLOBS[0], DESKTOP_BLOBS[2]]

const AMBIENT_STRENGTH = 0.45

export default function AuroraBackground() {
  const rootRef = useRef(null)
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
        { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
      )
      io.observe(hero)
    }

    raf = requestAnimationFrame(attach)

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [pathname])

  const blobs = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div
        className="absolute inset-0"
        style={{
          opacity: strength,
          transition: 'opacity 0.6s ease',
          filter: isMobile ? 'blur(48px)' : 'blur(72px)',
        }}
      >
        {blobs.map((b) => (
          <div
            key={b.key}
            data-aurora-blob
            className="absolute will-change-transform"
            style={{
              ...b.style,
              borderRadius: '50%',
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10,10,15,0.55) 65%, rgba(10,10,15,0.92) 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
        }}
      />
    </div>
  )
}
