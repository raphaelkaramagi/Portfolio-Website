import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { hasPlayedHomeIntro, markHomeIntroPlayed } from '../lib/animationState'
import { useTheme } from '../lib/themeContext'

const isTouchDevice = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

function NodeField() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const mouseInsideHero = useRef(false)
  const interactionStrength = useRef(0)
  const nodesRef = useRef([])
  const dimsRef = useRef({ w: 0, h: 0 })
  const { dark } = useTheme()
  const darkRef = useRef(dark)
  darkRef.current = dark

  const initNodes = useCallback((w, h) => {
    const count = Math.min(52, Math.floor((w * h) / 12500))
    nodesRef.current = Array.from({ length: count }, () => ({
      baseX: w * 0.12 + Math.random() * w * 0.83,
      baseY: Math.random() * h,
      x: 0,
      y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      amp: 11 + Math.random() * 24,
      r: 1.3 + Math.random() * 2.2,
      accent: Math.random() < 0.34,
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

      let mx = 0
      let my = 0
      let str = 0
      if (!isTouchDevice) {
        const targetStr = mouseInsideHero.current ? 1 : 0
        interactionStrength.current +=
          (targetStr - interactionStrength.current) * 0.048
        str = interactionStrength.current

        const lerpAmt = 0.075 + str * 0.035
        smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * lerpAmt
        smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * lerpAmt
        mx = smoothMouse.current.x
        my = smoothMouse.current.y
      }

      const attractRadius = 268
      const attractStrength = 0.39 * str

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x = n.baseX + Math.sin(t * n.speed + n.phase) * n.amp
        n.y = n.baseY + Math.cos(t * n.speed * 0.7 + n.phase + 1) * n.amp * 0.6

        if (!isTouchDevice && str > 0.004) {
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

      const connThresh = 162
      const lineAlphaMul = 0.82 + str * 0.18
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connThresh) {
            const alpha =
              (1 - dist / connThresh) * (isDark ? 0.26 : 0.3) * lineAlphaMul
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(230,59,46,${alpha})`
            ctx.lineWidth = isDark ? 0.55 : 0.78
            ctx.stroke()
          }
        }
      }

      const glowRadius = 172

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        let proximity = 0
        if (!isTouchDevice && str > 0.004) {
          const dx = mx - n.x
          const dy = my - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          proximity =
            dist < glowRadius ? (1 - dist / glowRadius) * str : 0
        }

        if (proximity > 0.02) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 5 * proximity, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(230,59,46,${proximity * 0.38})`
          ctx.fill()
        }

        const baseR = n.r + proximity * 1.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, baseR, 0, Math.PI * 2)
        ctx.fillStyle = n.accent || proximity > 0.35
          ? `rgba(230,59,46,${0.42 + proximity * 0.48})`
          : isDark
            ? 'rgba(229,229,229,0.3)'
            : 'rgba(17,17,17,0.26)'
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
      const onEnter = () => {
        mouseInsideHero.current = true
      }
      const onLeave = () => {
        mouseInsideHero.current = false
      }
      heroEl.addEventListener('mousemove', onMove)
      heroEl.addEventListener('mouseenter', onEnter)
      heroEl.addEventListener('mouseleave', onLeave)

      window.addEventListener('resize', resize)
      return () => {
        cancelAnimationFrame(raf)
        heroEl.removeEventListener('mousemove', onMove)
        heroEl.removeEventListener('mouseenter', onEnter)
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.62] sm:opacity-[0.82] lg:opacity-[0.94]"
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

      tl.from('.hero-card-panel', {
        opacity: 0,
        duration: 0.58,
        ease: 'power2.out',
      }).from(
        '.hero-line-1',
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.34'
      )
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
      className="relative min-h-[100dvh] w-full flex items-center overflow-x-hidden"
    >
      <NodeField />

      <div className="relative z-10 w-full max-w-7xl mx-auto min-w-0 px-4 sm:px-8 lg:px-12 box-border">
        <div
          className="hero-card-panel relative max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full min-w-0 rounded-[2rem] px-6 py-8 pe-8 sm:px-10 sm:py-10 sm:pe-12 xl:px-12 xl:py-11 xl:pe-14 sm:mx-0 flex flex-col
            bg-offwhite/[0.44] dark:bg-dark-bg/[0.5]
            backdrop-blur-[3px] sm:backdrop-blur-[5px]
            shadow-[0_28px_72px_-20px_rgba(17,17,17,0.13)]
            dark:shadow-[0_36px_96px_-28px_rgba(0,0,0,0.48)]"
        >
          <div className="min-w-0 w-full max-w-full [container-type:inline-size] flex flex-col">
            <div>
              <h1 className="hero-line-1 hero-display-text font-grotesk font-bold text-dark dark:text-dark-text tracking-tight leading-none mb-2
                text-[clamp(2rem,min(100cqw_/_17.5,5.85rem),5.85rem)]">
                Engineering the
              </h1>
              <h1 className="hero-line-2 hero-display-text font-serif italic text-signal leading-[0.95] mb-6 sm:mb-8 block min-w-0 w-full max-w-full box-border pr-[0.2em]
                text-[clamp(2.85rem,min(100cqw_/_6.85,12rem),12rem)]">
                Architecture.
              </h1>
            </div>
            <p className="hero-subtitle hero-display-text font-mono text-sm sm:text-base text-dark/55 dark:text-dark-text/55 max-w-lg xl:max-w-2xl mb-6 sm:mb-10 leading-relaxed">
              Duke ECE &amp; CS &apos;29. Machine learning, embedded hardware, and systems infrastructure.
            </p>
            <div className="flex flex-col gap-4 shrink-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-3">
              <div className="hero-cta flex flex-row flex-nowrap gap-2 sm:flex-wrap sm:gap-4 flex-1 min-w-0 sm:max-w-none">
                <a
                  href="https://github.com/raphaelkaramagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-grotesk text-xs sm:text-sm font-semibold bg-signal text-offwhite px-4 py-2.5 sm:px-7 sm:py-3 rounded-full text-center flex-1 min-w-0 sm:flex-none sm:shrink-0
                  hover:bg-dark dark:hover:bg-dark-text dark:hover:text-dark-bg transition-all duration-300"
                >
                  View My GitHub
                </a>
                <a
                  href="mailto:raphael.karamagi@duke.edu"
                  className="font-grotesk text-xs sm:text-sm font-semibold border border-dark/20 dark:border-dark-text/20 text-dark dark:text-dark-text px-4 py-2.5 sm:px-7 sm:py-3 rounded-full text-center flex-1 min-w-0 sm:flex-none sm:shrink-0
                  hover:bg-dark hover:text-offwhite dark:hover:bg-dark-text dark:hover:text-dark-bg transition-all duration-300"
                >
                  Contact Me
                </a>
              </div>
              <div className="hero-scroll flex flex-col items-center gap-2 shrink-0 pointer-events-none self-center sm:self-auto">
                <span className="font-mono text-xs text-dark/30 dark:text-dark-text/30 tracking-widest uppercase">
                  Scroll
                </span>
                <ArrowDown className="w-4 h-4 text-dark/30 dark:text-dark-text/30 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
