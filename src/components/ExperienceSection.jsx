import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { hasPlayedHomeIntro } from '../lib/animationState'
import useCursorVars from '../lib/useCursorVars'
import useTilt from '../lib/useTilt'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Languages',
    items: ['Python', 'C','C++', 'Java','HTML/CSS'],
  },
  {
    title: 'Data & Hardware',
    items: ['PostgreSQL','NumPy', 'Pandas', 'Arduino', 'SolidWorks'],
  },
  {
    title: 'Frameworks & Tools',
    items: ['TensorFlow / Keras', 'Docker', 'CI/CD', 'Flask', 'Next.js', 'React'],
  },
]

const experiences = [
  {
    id: 'duke-oit',
    org: 'Duke University — Office of Information Technology',
    role: 'Software Engineer Intern',
    location: 'Durham, NC · Paid contract',
    dates: 'May 2026 – Jul 2026',
    bullets: [
      'Summer project delivering security scanning and evaluation tooling for Duke’s locally deployed models — Hugging Face ingestion pipelines, artifact inspection before infrastructure access, and benchmark suites for IT-led deployments.',
      'Partnered with OIT on operationalizing automated checks and repeatable evaluation harnesses so candidate LLMs can be compared across representative workloads.',
    ],
    skills: ['Python', 'Flask', 'Celery', 'Redis', 'Docker', 'LiteLLM', 'GitLab CI'],
  },
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
    skills: ['Java', 'OpenMRS', 'REST APIs', 'PostgreSQL', 'Testing'],
  },
]

const CARD_CLASS = 'glass-card glass-card-hoverable rounded-[2rem]'

const ROTATE_MS = 7600

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const [expIndex, setExpIndex] = useState(0)
  const [experiencePaused, setExperiencePaused] = useState(false)
  const [progressCycle, setProgressCycle] = useState(0)

  const expTiltRef = useTilt({ max: 3 })
  const expCursorRef = useCursorVars()
  const experienceCardRef = useCallback(
    (node) => { expTiltRef.current = node; expCursorRef.current = node },
    [expTiltRef, expCursorRef],
  )

  const skillsTiltRef = useTilt({ max: 3 })
  const skillsCursorRef = useCursorVars()
  const skillsCardRef = useCallback(
    (node) => { skillsTiltRef.current = node; skillsCursorRef.current = node },
    [skillsTiltRef, skillsCursorRef],
  )

  const mouseOverCardRef = useRef(false)
  const advanceTimeoutRef = useRef(null)
  const deadlineRef = useRef(null)
  const remainingOnPauseRef = useRef(ROTATE_MS)
  const slideChangedWhilePausedRef = useRef(false)
  const prevExpIndexRef = useRef(null)
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
      gsap.from('.experience-section-label', {
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

      gsap.from('.experience-section-body', {
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

  const activeExp = experiences[expIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <div id="experience" className="experience-section-label mb-6 sm:mb-8">
        <span className="font-mono text-xs text-aurora-animated tracking-widest uppercase">
          Experience
        </span>
        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-dark-text mt-3 tracking-tight">
          Experience &amp; Skills
        </h2>
      </div>

      <div className="experience-section-body flex flex-col gap-6 lg:gap-8">
        <div
          ref={experienceCardRef}
          className={`${CARD_CLASS} p-5 sm:p-6 flex flex-col`}
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
          <div className="relative z-10 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
              <span className="font-mono text-[11px] sm:text-xs text-dark-text/45 tracking-widest uppercase">
                Roles
              </span>
              <div className="flex gap-1.5 items-center">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-overlay/12 text-dark-text/65 hover:border-brand-red/55 hover:text-brand-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                  aria-label="Previous role"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-overlay/12 text-dark-text/65 hover:border-brand-red/55 hover:text-brand-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                  aria-label="Next role"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="h-[3px] w-full rounded-full bg-overlay/8 overflow-hidden mb-3 shrink-0"
              aria-hidden
            >
              <div
                key={`${expIndex}-${progressCycle}`}
                className="h-full rounded-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-amber"
                style={{
                  animation: `about-exp-progress ${ROTATE_MS}ms linear forwards`,
                  animationPlayState: experiencePaused ? 'paused' : 'running',
                }}
              />
            </div>

            <div key={activeExp.id} className="flex-1 flex flex-col min-h-0" aria-live="polite">
              <div className="font-grotesk text-base sm:text-lg font-bold text-dark-text leading-snug">
                {activeExp.org}
              </div>
              <div className="h-px w-full bg-overlay/10 my-2" />
              <div className="font-grotesk text-lg sm:text-xl font-semibold text-dark-text leading-snug">
                {activeExp.role}
              </div>
              <p className="font-mono text-xs sm:text-sm text-dark-text/55 mt-1">
                {activeExp.location}
              </p>
              <ul className="mt-2 space-y-2">
                {activeExp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="font-grotesk text-sm sm:text-base text-dark-text/75 leading-relaxed pl-2.5 border-l-2 border-brand-red/45"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              {activeExp.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeExp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs bg-overlay/[0.04] border border-overlay/10 text-dark-text/75 px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-overlay/10 shrink-0">
                <span className="font-mono text-xs sm:text-sm text-dark-text/55">
                  {activeExp.dates}
                </span>
                <div className="flex gap-1" aria-hidden>
                  {experiences.map((exp, i) => (
                    <span
                      key={exp.id}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i === expIndex ? 'bg-brand-red' : 'bg-overlay/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={skillsCardRef} className={`${CARD_CLASS} p-5 sm:p-6 flex flex-col`}>
          <div className="relative z-10 flex flex-col">
            <h3 className="font-grotesk text-base sm:text-lg font-bold text-dark-text mb-3 shrink-0">
              Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 auto-rows-min">
              {skillCategories.map(({ title, items }) => (
                <div key={title} className="min-w-0">
                  <div className="font-mono text-[10px] sm:text-[11px] lg:text-xs text-dark-text/50 uppercase tracking-wider mb-1.5 leading-tight">
                    {title}
                  </div>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="font-grotesk text-[11px] sm:text-sm text-dark-text/75 leading-snug"
                      >
                        <span className="text-brand-red font-mono text-[10px] sm:text-xs">//</span>{' '}
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
