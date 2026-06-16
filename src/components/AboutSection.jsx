import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hasPlayedHomeIntro } from '../lib/animationState'
import useCursorVars from '../lib/useCursorVars'
import useTilt from '../lib/useTilt'

gsap.registerPlugin(ScrollTrigger)

const CARD_CLASS = 'glass-card glass-card-hoverable rounded-[2rem]'

export default function AboutSection() {
  const sectionRef = useRef(null)

  const introTiltRef = useTilt({ max: 2.5 })
  const introCursorRef = useCursorVars()
  const introCardRef = useCallback(
    (node) => { introTiltRef.current = node; introCursorRef.current = node },
    [introTiltRef, introCursorRef],
  )

  useEffect(() => {
    if (hasPlayedHomeIntro) return

    const ctx = gsap.context(() => {
      gsap.from('.about-section-label', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        y: 32,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
      })

      gsap.from('.about-card-intro', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
        y: 36,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <div id="about" className="about-section-label mb-6 sm:mb-8">
        <span className="font-mono text-xs text-aurora-animated tracking-widest uppercase">
          About
        </span>
      </div>

      <div ref={introCardRef} className={`about-card-intro ${CARD_CLASS} p-8 sm:p-10 lg:p-12`}>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,220px)] gap-10 lg:gap-12 items-start">
          <div className="flex justify-center lg:justify-start shrink-0 mx-auto lg:mx-0 w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[200px]">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_48px_-18px_rgba(0,0,0,0.72)] ring-1 ring-overlay/5">
              <img
                src="/images/raphael-portrait.png"
                alt="Raphael Karamagi"
                width={800}
                height={788}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_12%] scale-[1.32] origin-[50%_18%]"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            <div className="min-w-0 space-y-3">
              <span className="font-grotesk block text-[clamp(1.875rem,4vw,2.75rem)] font-bold tracking-tight text-dark-text leading-tight">
                Raphael Karamagi
              </span>
              <p className="font-grotesk text-base sm:text-lg text-dark-text/75 leading-relaxed">
                is a software and hardware engineer at Duke University passionate about turning engineering problems into solutions that work in the real world,
                whether that&apos;s hardware, software, or the infrastructure that suppots them. He&apos;s drawn to thoughtful craft
                and building dependable systems.
              </p>
            </div>

            <p className="font-mono text-xs sm:text-sm text-dark-text/55 leading-relaxed tracking-wide">
              <span className="text-brand-red/90">//</span> Machine Learning{' '}
              <span className="text-dark-text/35 mx-1">·</span>{' '}
              <span className="text-brand-orange/90">//</span> Embedded Systems &amp; Hardware{' '}
              <span className="text-dark-text/35 mx-1">·</span>{' '}
              <span className="text-brand-amber/90">//</span> Software Engineering
            </p>
          </div>

          <div className="w-full lg:w-auto lg:border-l border-t lg:border-t-0 border-overlay/10 pt-8 lg:pt-0 lg:pl-10">
            <ul className="space-y-0 font-grotesk text-sm sm:text-base">
              {[
                { n: '1+', label: 'Years of experience' },
                { n: '3+', label: 'Products shipped' },
                { n: '2+', label: 'Happy clients' },
              ].map((row, i) => (
                <li
                  key={row.label}
                  className={`flex items-baseline justify-between gap-6 py-4 ${
                    i > 0 ? 'border-t border-overlay/10' : ''
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-bold text-dark-text tabular-nums">
                    {row.n}
                  </span>
                  <span className="text-right text-dark-text/65 text-sm sm:text-base leading-snug max-w-[11rem]">
                    {row.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
