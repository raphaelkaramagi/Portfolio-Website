import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { hasPlayedHomeIntro } from '../lib/animationState'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'ML & AI',
    items: ['Python', 'TensorFlow / Keras', 'Java', 'MediaPipe'],
  },
  {
    title: 'Systems & Software',
    items: ['Docker', 'SQLite', 'Next.js', 'REST APIs'],
  },
  {
    title: 'Embedded & Hardware',
    items: ['Arduino', 'C / C++', 'SolidWorks'],
  },
]

const experiences = [
  {
    id: 'intelisoft',
    org: 'IntelliSOFT Consulting',
    role: 'Software Engineer Intern',
    location: 'Nairobi, Kenya · Internship',
    dates: 'Jul 2024 – Aug 2024',
    bullets: [
      'Implemented REST API endpoints for medical records management, enabling role-based access within OpenMRS EMR system; deployed to 20+ hospitals across South Sudan.',
      'Executed test suite covering patient-record CRUD endpoints; led deployment to 3 pilot sites in Nairobi achieving 98% uptime.',
    ],
  },
  {
    id: 'duke-oit',
    org: 'Duke University — Office of Information Technology',
    role: 'AI Model Security & Evaluation Infrastructure',
    location: 'Durham, NC · Paid contract',
    dates: 'May 2026 – Jul 2026',
    bullets: [
      'Summer project delivering security scanning and evaluation tooling for Duke’s locally deployed models — Hugging Face ingestion pipelines, artifact inspection before infrastructure access, and benchmark suites for IT-led deployments.',
      'Partnered with OIT on operationalizing automated checks and repeatable evaluation harnesses so candidate LLMs can be compared across representative workloads.',
    ],
  },
]

const CARD_CLASS =
  'rounded-[2rem] border border-dark/10 dark:border-dark-text/15 bg-offwhite/95 dark:bg-dark-card/95 backdrop-blur-[6px] shadow-[0_14px_44px_-18px_rgba(17,17,17,0.14)] dark:shadow-[0_22px_56px_-22px_rgba(0,0,0,0.65)]'

const ROTATE_MS = 5600

export default function AboutSection() {
  const sectionRef = useRef(null)
  const [expIndex, setExpIndex] = useState(0)
  const [experiencePaused, setExperiencePaused] = useState(false)
  const [progressCycle, setProgressCycle] = useState(0)

  const advanceTimeoutRef = useRef(null)
  const deadlineRef = useRef(null)
  const remainingOnPauseRef = useRef(ROTATE_MS)
  const slideChangedWhilePausedRef = useRef(false)
  const prevExpIndexRef = useRef(null)
  const mouseOverCardRef = useRef(false)
  const touchHoldCardRef = useRef(false)

  const syncExperiencePaused = useCallback(() => {
    setExperiencePaused(mouseOverCardRef.current || touchHoldCardRef.current)
  }, [])

  const clearAdvanceTimeout = useCallback(() => {
    if (advanceTimeoutRef.current !== null) {
      window.clearTimeout(advanceTimeoutRef.current)
      advanceTimeoutRef.current = null
    }
  }, [])

  const scheduleAdvance = useCallback(
    (ms) => {
      clearAdvanceTimeout()
      const safeMs = Math.max(50, ms)
      deadlineRef.current = Date.now() + safeMs
      advanceTimeoutRef.current = window.setTimeout(() => {
        advanceTimeoutRef.current = null
        deadlineRef.current = null
        setExpIndex((i) => (i + 1) % experiences.length)
      }, safeMs)
    },
    [clearAdvanceTimeout],
  )

  useEffect(() => {
    setProgressCycle((c) => c + 1)
  }, [expIndex])

  useEffect(() => {
    const indexChanged =
      prevExpIndexRef.current !== null && prevExpIndexRef.current !== expIndex
    prevExpIndexRef.current = expIndex

    clearAdvanceTimeout()

    if (experiencePaused) {
      if (!indexChanged) {
        remainingOnPauseRef.current = deadlineRef.current
          ? Math.max(0, deadlineRef.current - Date.now())
          : ROTATE_MS
      } else {
        slideChangedWhilePausedRef.current = true
        deadlineRef.current = null
      }
      return () => clearAdvanceTimeout()
    }

    let ms = ROTATE_MS
    if (indexChanged || slideChangedWhilePausedRef.current) {
      ms = ROTATE_MS
      slideChangedWhilePausedRef.current = false
    } else {
      ms = remainingOnPauseRef.current
    }

    scheduleAdvance(ms)
    return () => clearAdvanceTimeout()
  }, [expIndex, experiencePaused, clearAdvanceTimeout, scheduleAdvance])

  const goPrev = useCallback(() => {
    setExpIndex((i) => (i - 1 + experiences.length) % experiences.length)
  }, [])
  const goNext = useCallback(() => {
    setExpIndex((i) => (i + 1) % experiences.length)
  }, [])

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

      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.72,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeExp = experiences[expIndex]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-28 py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-dark/8 dark:border-dark-text/10"
    >
      <div className="about-section-label mb-8 sm:mb-10">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          About
        </span>
      </div>

      <div className="about-section-body flex flex-col gap-6 lg:gap-8">
        <div className={`about-card ${CARD_CLASS} p-8 sm:p-10 lg:p-12`}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,220px)] gap-10 lg:gap-12 items-start">
            <div className="flex justify-center lg:justify-start shrink-0 mx-auto lg:mx-0">
              <img
                src="/images/raphael-portrait.jpeg"
                alt="Raphael Karamagi"
                width={640}
                height={800}
                loading="lazy"
                className="w-full max-w-[200px] sm:max-w-[220px] lg:w-full lg:max-w-none aspect-[4/5] object-cover rounded-2xl
                  shadow-[0_12px_36px_-14px_rgba(17,17,17,0.22)] dark:shadow-[0_20px_48px_-18px_rgba(0,0,0,0.72)]"
              />
            </div>

            <div className="min-w-0 space-y-5">
              <div className="min-w-0 space-y-3">
                <span className="font-grotesk block text-[clamp(1.875rem,4vw,2.75rem)] font-bold tracking-tight text-dark dark:text-dark-text leading-tight">
                  Raphael Karamagi
                </span>
                <p className="font-grotesk text-base sm:text-lg text-dark/75 dark:text-dark-text/75 leading-relaxed">
                  is a self taught software and hardware engineer passionate about turning vague ideas into things that work in the real world,
                  whether that&apos;s software, hardware, or the learning systems layered on top. He&apos;s drawn to thoughtful craft, user experience,
                  and building dependable systems.
                </p>
              </div>

              <p className="font-mono text-xs sm:text-sm text-dark/55 dark:text-dark-text/55 leading-relaxed tracking-wide">
                <span className="text-signal/90">//</span> Machine Learning{' '}
                <span className="text-dark/35 dark:text-dark-text/35 mx-1">·</span>{' '}
                <span className="text-signal/90">//</span> Embedded Systems &amp; Hardware{' '}
                <span className="text-dark/35 dark:text-dark-text/35 mx-1">·</span>{' '}
                <span className="text-signal/90">//</span> Software Engineering
              </p>

              <p className="font-grotesk text-sm text-dark/60 dark:text-dark-text/60 leading-relaxed max-w-xl">
                Outside of STEM he&apos;s usually on the court for basketball or at the piano sketching compositions.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:border-l border-t lg:border-t-0 border-dark/10 dark:border-dark-text/12 pt-8 lg:pt-0 lg:pl-10">
              <ul className="space-y-0 font-grotesk text-sm sm:text-base">
                {[
                  { n: '1+', label: 'Years of experience' },
                  { n: '3+', label: 'Products shipped' },
                  { n: '2+', label: 'Happy clients' },
                ].map((row, i) => (
                  <li
                    key={row.label}
                    className={`flex items-baseline justify-between gap-6 py-4 ${
                      i > 0 ? 'border-t border-dark/10 dark:border-dark-text/10' : ''
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-dark dark:text-dark-text tabular-nums">
                      {row.n}
                    </span>
                    <span className="text-right text-dark/60 dark:text-dark-text/65 text-sm sm:text-base leading-snug max-w-[11rem]">
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-6 lg:gap-8 lg:items-stretch">
          <div
            className={`about-card ${CARD_CLASS} p-5 sm:p-6 flex flex-col lg:min-h-0 lg:h-full`}
            onMouseEnter={() => {
              mouseOverCardRef.current = true
              syncExperiencePaused()
            }}
            onMouseLeave={() => {
              mouseOverCardRef.current = false
              syncExperiencePaused()
            }}
            onPointerDown={(e) => {
              if (e.pointerType !== 'touch') return
              const t = e.target
              if (t instanceof Element && t.closest('button')) return
              try {
                e.currentTarget.setPointerCapture(e.pointerId)
              } catch {
                /* ignore */
              }
              touchHoldCardRef.current = true
              syncExperiencePaused()
            }}
            onPointerUp={(e) => {
              if (e.pointerType !== 'touch') return
              touchHoldCardRef.current = false
              syncExperiencePaused()
            }}
            onPointerCancel={(e) => {
              if (e.pointerType !== 'touch') return
              touchHoldCardRef.current = false
              syncExperiencePaused()
            }}
            onLostPointerCapture={(e) => {
              if (e.pointerType !== 'touch') return
              touchHoldCardRef.current = false
              syncExperiencePaused()
            }}
          >
            <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
              <span className="font-mono text-[11px] sm:text-xs text-dark/45 dark:text-dark-text/45 tracking-widest uppercase">
                Experience
              </span>
              <div className="flex gap-1.5 items-center">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-dark/12 dark:border-dark-text/18 text-dark/60 dark:text-dark-text/65 hover:border-signal/40 hover:text-signal transition-colors duration-300"
                  aria-label="Previous role"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-dark/12 dark:border-dark-text/18 text-dark/60 dark:text-dark-text/65 hover:border-signal/40 hover:text-signal transition-colors duration-300"
                  aria-label="Next role"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="h-[3px] w-full rounded-full bg-dark/10 dark:bg-dark-text/15 overflow-hidden mb-3 shrink-0"
              aria-hidden
            >
              <div
                key={`${expIndex}-${progressCycle}`}
                className="h-full rounded-full bg-signal"
                style={{
                  animation: `about-exp-progress ${ROTATE_MS}ms linear forwards`,
                  animationPlayState: experiencePaused ? 'paused' : 'running',
                }}
              />
            </div>

            <div key={activeExp.id} className="flex-1 flex flex-col min-h-0" aria-live="polite">
              <div className="font-grotesk text-base sm:text-lg font-bold text-dark dark:text-dark-text leading-snug">
                {activeExp.org}
              </div>
              <div className="h-px w-full bg-dark/10 dark:bg-dark-text/12 my-2" />
              <div className="font-grotesk text-lg sm:text-xl font-semibold text-dark dark:text-dark-text leading-snug">
                {activeExp.role}
              </div>
              <p className="font-mono text-xs sm:text-sm text-dark/50 dark:text-dark-text/55 mt-1">
                {activeExp.location}
              </p>
              <ul className="mt-2 space-y-2 flex-1 min-h-0">
                {activeExp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="font-grotesk text-sm sm:text-base text-dark/75 dark:text-dark-text/75 leading-relaxed pl-2.5 border-l-2 border-signal/35"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-dark/8 dark:border-dark-text/10 shrink-0">
                <span className="font-mono text-xs sm:text-sm text-dark/50 dark:text-dark-text/55">
                  {activeExp.dates}
                </span>
                <div className="flex gap-1" aria-hidden>
                  {experiences.map((exp, i) => (
                    <span
                      key={exp.id}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i === expIndex ? 'bg-signal' : 'bg-dark/20 dark:bg-dark-text/25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`about-card ${CARD_CLASS} p-5 sm:p-6 flex flex-col lg:min-h-0 lg:h-full`}>
            <h3 className="font-grotesk text-lg font-bold text-dark dark:text-dark-text mb-3 shrink-0">
              Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1 min-h-0 auto-rows-min">
              {skillCategories.map(({ title, items }, idx) => (
                <div key={title} className={idx === 2 ? 'sm:col-span-2' : ''}>
                  <div className="font-mono text-xs sm:text-sm text-dark/50 dark:text-dark-text/50 uppercase tracking-wider mb-2">
                    {title}
                  </div>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="font-grotesk text-sm sm:text-base text-dark/70 dark:text-dark-text/70 leading-relaxed"
                      >
                        <span className="text-signal font-mono text-xs sm:text-sm">//</span>{' '}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
