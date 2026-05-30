import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { hasPlayedHomeIntro, markHomeIntroPlayed } from '../lib/animationState'
import useCursorVars from '../lib/useCursorVars'
import useTilt from '../lib/useTilt'

export default function Hero() {
  const heroRef = useRef(null)
  const tiltRef = useTilt({ max: 2.5 })
  const cursorRef = useCursorVars()
  const cardRef = useCallback(
    (node) => {
      tiltRef.current = node
      cursorRef.current = node
    },
    [tiltRef, cursorRef],
  )

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
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex items-center overflow-x-hidden pt-28 sm:pt-32 pb-12 sm:pb-16"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto min-w-0 px-4 sm:px-8 lg:px-12 box-border">
        <div
          ref={cardRef}
          className="hero-card-panel glass-card glass-card-hoverable relative max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full min-w-0 rounded-[2rem] px-6 py-8 pe-8 sm:px-10 sm:py-10 sm:pe-12 xl:px-12 xl:py-11 xl:pe-14 sm:mx-0 flex flex-col"
        >
          <div className="relative z-10 min-w-0 w-full max-w-full [container-type:inline-size] flex flex-col">
            <div>
              <h1 className="hero-line-1 hero-display-text font-grotesk font-bold text-dark-text tracking-tight leading-none mb-2
                text-[clamp(2rem,min(100cqw_/_17.5,5.85rem),5.85rem)]">
                Engineering the
              </h1>
              <h1 className="hero-line-2 hero-display-text font-serif italic text-aurora-animated leading-[0.95] mb-6 sm:mb-8 block min-w-0 w-full max-w-full box-border pr-[0.2em]
                text-[clamp(2.85rem,min(100cqw_/_6.85,12rem),12rem)]">
                Architecture.
              </h1>
            </div>
            <p className="hero-subtitle hero-display-text font-mono text-sm sm:text-base text-dark-text/55 max-w-lg xl:max-w-2xl mb-6 sm:mb-10 leading-relaxed">
              Duke ECE &amp; CS &apos;29. Machine learning, embedded hardware, and systems infrastructure.
            </p>
            <div className="flex flex-col gap-4 shrink-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-3">
              <div className="hero-cta flex flex-row flex-nowrap gap-2 sm:flex-wrap sm:gap-4 flex-1 min-w-0 sm:max-w-none">
                <a
                  href="mailto:raphael.karamagi@duke.edu"
                  className="btn-aurora font-grotesk text-xs sm:text-sm font-semibold px-4 py-2.5 sm:px-7 sm:py-3 rounded-full text-center flex-1 min-w-0 sm:flex-none sm:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                >
                  Contact Me
                </a>
                <a
                  href="https://github.com/raphaelkaramagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass font-grotesk text-xs sm:text-sm font-semibold px-4 py-2.5 sm:px-7 sm:py-3 rounded-full text-center flex-1 min-w-0 sm:flex-none sm:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                >
                  View My GitHub
                </a>
              </div>
              <div className="hero-scroll flex flex-col items-center gap-2 shrink-0 pointer-events-none self-center sm:self-auto">
                <span className="font-mono text-xs text-dark-text/35 tracking-widest uppercase">
                  Scroll
                </span>
                <ArrowDown className="w-4 h-4 text-dark-text/35 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
