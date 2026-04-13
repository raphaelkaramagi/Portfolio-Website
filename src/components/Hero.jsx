import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { hasPlayedHomeIntro, markHomeIntroPlayed } from '../lib/animationState'
import { useTheme } from '../lib/themeContext'

const isTouchDevice = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

function NodeField() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const smoothMouse = useRef({ x: -1000, y: -1000 })
  const nodesRef = useRef([])
  const dimsRef = useRef({ w: 0, h: 0 })
  const { dark } = useTheme()
  const darkRef = useRef(dark)
  darkRef.current = dark

  const initNodes = useCallback((w, h) => {
    const count = Math.min(35, Math.floor((w * h) / 18000))
    nodesRef.current = Array.from({ length: count }, () => ({
      baseX: w * 0.15 + Math.random() * w * 0.8,
      baseY: Math.random() * h,
      x: 0,
      y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      amp: 12 + Math.random() * 22,
      r: 1.2 + Math.random() * 1.8,
      accent: Math.random() < 0.25,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      dimsRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes(rect.width, rect.height)
    }

    resize()

    function draw(time) {
      const { w, h } = dimsRef.current
      const nodes = nodesRef.current
      const isDark = darkRef.current
      ctx.clearRect(0, 0, w, h)

      const t = time * 0.001

      let mx = -2000, my = -2000
      if (!isTouchDevice) {
        const lerpAmt = 0.08
        smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * lerpAmt
        smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * lerpAmt
        mx = smoothMouse.current.x
        my = smoothMouse.current.y
      }

      const attractRadius = 250
      const attractStrength = 0.35

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x = n.baseX + Math.sin(t * n.speed + n.phase) * n.amp
        n.y = n.baseY + Math.cos(t * n.speed * 0.7 + n.phase + 1) * n.amp * 0.6

        if (!isTouchDevice) {
          const dx = mx - n.x
          const dy = my - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < attractRadius) {
            const force = ((attractRadius - dist) / attractRadius) * attractStrength
            n.x += dx * force
            n.y += dy * force
          }
        }
      }

      const connThresh = 150
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connThresh) {
            const alpha = (1 - dist / connThresh) * (isDark ? 0.18 : 0.22)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(230,59,46,${alpha})`
            ctx.lineWidth = isDark ? 0.5 : 0.7
            ctx.stroke()
          }
        }
      }

      const glowRadius = 160

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = mx - n.x
        const dy = my - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = dist < glowRadius ? 1 - dist / glowRadius : 0

        if (proximity > 0) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 5 * proximity, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(230,59,46,${proximity * 0.3})`
          ctx.fill()
        }

        const baseR = n.r + proximity * 1.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, baseR, 0, Math.PI * 2)
        ctx.fillStyle = n.accent || proximity > 0.4
          ? `rgba(230,59,46,${0.4 + proximity * 0.4})`
          : isDark
            ? 'rgba(229,229,229,0.25)'
            : 'rgba(17,17,17,0.22)'
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const heroEl = canvas.parentElement

    if (!isTouchDevice) {
      const onMove = (e) => {
        const rect = canvas.getBoundingClientRect()
        mouse.current.x = e.clientX - rect.left
        mouse.current.y = e.clientY - rect.top
      }
      const onLeave = (e) => {
        if (!heroEl.contains(e.relatedTarget)) {
          mouse.current.x = -2000
          mouse.current.y = -2000
        }
      }
      heroEl.addEventListener('mousemove', onMove)
      heroEl.addEventListener('mouseleave', onLeave)

      window.addEventListener('resize', resize)
      return () => {
        cancelAnimationFrame(raf)
        heroEl.removeEventListener('mousemove', onMove)
        heroEl.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('resize', resize)
      }
    }

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 sm:opacity-80 lg:opacity-100"
    />
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (hasPlayedHomeIntro) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.6,
        onComplete: markHomeIntroPlayed,
      })

      tl.from('.hero-line-1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          '.hero-line-2',
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          '.hero-subtitle',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          '.hero-scroll',
          {
            y: 10,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] w-full flex items-center overflow-hidden"
    >
      <NodeField />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-3xl">
          <h1 className="hero-line-1 font-grotesk text-4xl sm:text-6xl lg:text-7xl font-bold text-dark dark:text-dark-text tracking-tight leading-none mb-2">
            Engineering the
          </h1>
          <h1 className="hero-line-2 font-serif italic text-6xl sm:text-8xl lg:text-[9rem] text-signal leading-[0.9] mb-8">
            Architecture.
          </h1>
          <p className="hero-subtitle font-mono text-sm sm:text-base text-dark/50 dark:text-dark-text/50 max-w-lg mb-10 leading-relaxed">
            Duke ECE &amp; CS &apos;29. Machine learning, embedded hardware, and systems infrastructure.
          </p>
          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk text-sm font-semibold bg-signal text-offwhite px-7 py-3 rounded-full
                hover:bg-dark dark:hover:bg-dark-text dark:hover:text-dark-bg transition-all duration-300"
            >
              View My GitHub
            </a>
            <a
              href="mailto:raphael.karamagi@duke.edu"
              className="font-grotesk text-sm font-semibold border border-dark/20 dark:border-dark-text/20 text-dark dark:text-dark-text px-7 py-3 rounded-full
                hover:bg-dark hover:text-offwhite dark:hover:bg-dark-text dark:hover:text-dark-bg transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-12 right-6 sm:right-12 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-dark/30 dark:text-dark-text/30 tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-dark/30 dark:text-dark-text/30 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
