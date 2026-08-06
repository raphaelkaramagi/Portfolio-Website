import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hasPlayedHomeIntro } from '../lib/animationState'
import useCursorVars from '../lib/useCursorVars'
import useTilt from '../lib/useTilt'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Languages',
    items: ['Python', 'C/C++', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Data & ML',
    items: ['TensorFlow / Keras','PyTorch', 'NumPy', 'Pandas', 'PostgreSQL'],
  },
  {
    title: 'Frameworks & Tools',
    items: ['Docker', 'CI/CD', 'Flask', 'OAuth', 'Next.js', 'React','SolidWorks'],
  },
]

/** Ordered most recent first — `year` drives the calendar markers on the spine. */
const experiences = [
  {
    id: 'duke-colab',
    org: 'Duke University — Office of Information Technology',
    role: 'Innovation Co-Lab Software Developer',
    location: 'Durham, NC',
    dates: 'Aug 2026 – Present',
    year: '2026',
    duration: 'Ongoing',
    current: true,
    bullets: [
      'Building and maintaining internal Co-Lab systems — Dockerized apps, web services, and AI-related tools that expand campus technology infrastructure for student makers.',
      'Holding weekly office hours and TA support for Co-Lab Roots classes, helping students ship personal projects and learn development practices across the Duke community.',
    ],
    skills: ['JavaScript', 'Python', 'Docker', 'APIs', 'Git', 'Web Development'],
  },
  {
    id: 'duke-oit',
    org: 'Duke University — Office of Information Technology',
    role: 'Software Engineer Intern (Code+)',
    location: 'Durham, NC',
    dates: 'May 2026 – Jul 2026',
    year: '2026',
    duration: '3 mos',
    bullets: [
      'Delivered Model Advisor with Duke OIT — automated report cards for AI Gateway models spanning Hugging Face artifact scanning, inference safety red-teaming, Duke LLM-as-judge evals, and public benchmarks.',
      'Shipped a Dockerized Flask + Postgres platform with background pillar jobs, a ranked model catalog, cross-pillar nutrition labels, and compare tooling so IT can make defensible model adoption decisions.',
    ],
    skills: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'LiteLLM', 'GitLab CI'],
  },
  {
    id: 'intelisoft',
    org: 'IntelliSOFT Consulting',
    role: 'Software Engineer Intern',
    location: 'Nairobi, Kenya',
    dates: 'Jul 2024 – Aug 2024',
    year: '2024',
    duration: '2 mos',
    bullets: [
      'Implemented REST API endpoints for medical records management, enabling role-based access within OpenMRS EMR system; deployed to 20+ hospitals across South Sudan.',
      'Executed test suite covering patient-record CRUD endpoints; led deployment to 3 pilot sites in Nairobi achieving 98% uptime.',
    ],
    skills: ['Java', 'OpenMRS', 'REST APIs', 'SQL', 'Testing'],
  },
]

const CARD_CLASS = 'glass-card glass-card-hoverable rounded-[2rem]'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(experiences[0].id)

  const timelineTiltRef = useTilt({ max: 2.5 })
  const timelineCursorRef = useCursorVars()
  const timelineCardRef = useCallback(
    (node) => { timelineTiltRef.current = node; timelineCursorRef.current = node },
    [timelineTiltRef, timelineCursorRef],
  )

  const skillsTiltRef = useTilt({ max: 3 })
  const skillsCursorRef = useCursorVars()
  const skillsCardRef = useCallback(
    (node) => { skillsTiltRef.current = node; skillsCursorRef.current = node },
    [skillsTiltRef, skillsCursorRef],
  )

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
        <div ref={timelineCardRef} className={`${CARD_CLASS} p-5 sm:p-7`}>
          <div className="relative z-10">
            <div className="mb-5 sm:mb-6">
              <span className="font-mono text-[11px] sm:text-xs text-dark-text/45 tracking-widest uppercase">
                Career timeline
              </span>
            </div>

            <ol className="relative">
              <span
                className="timeline-spine absolute left-[6px] top-1.5 bottom-1.5 w-px rounded-full"
                aria-hidden
              />

              {experiences.map((exp, i) => {
                const isActive = exp.id === activeId
                const showYear = i === 0 || experiences[i - 1].year !== exp.year

                return (
                  <li key={exp.id} className="relative">
                    {showYear && (
                      <div className={`relative pl-7 sm:pl-9 ${i === 0 ? 'pb-3' : 'pt-5 pb-3'}`}>
                        <span
                          className="absolute left-[6px] top-1/2 h-px w-3 bg-overlay/25"
                          aria-hidden
                        />
                        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-dark-text/45 tabular-nums">
                          {exp.year}
                        </span>
                      </div>
                    )}

                    <div className="relative pl-7 sm:pl-9 pb-6 sm:pb-7 last:pb-0">
                      <span
                        className="absolute left-0 top-[7px] flex h-[13px] w-[13px] items-center justify-center"
                        aria-hidden
                      >
                        {isActive && (
                          <span className="timeline-pulse absolute inline-flex h-full w-full rounded-full bg-brand-red/40 animate-ping" />
                        )}
                        <span
                          className={`timeline-node relative h-[11px] w-[11px] rounded-full ${
                            exp.current ? 'timeline-node-current' : ''
                          } ${isActive ? 'timeline-node-active' : ''}`}
                        />
                      </span>

                      <button
                        type="button"
                        onClick={() => setActiveId(exp.id)}
                        aria-expanded={isActive}
                        aria-controls={`exp-panel-${exp.id}`}
                        className={`group/row w-full text-left rounded-lg ${focusRing}`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <div className="min-w-0">
                            <span
                              className={`block font-grotesk text-base sm:text-lg font-bold leading-snug transition-colors duration-300 ${
                                isActive
                                  ? 'text-dark-text'
                                  : 'text-dark-text/70 group-hover/row:text-dark-text'
                              }`}
                            >
                              {exp.role}
                            </span>
                            <span className="block font-mono text-xs sm:text-sm text-dark-text/50 mt-1">
                              {exp.org} · {exp.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-[11px] sm:text-xs text-dark-text/55 tabular-nums">
                              {exp.dates}
                            </span>
                            <span className="font-mono text-[10px] sm:text-[11px] bg-overlay/[0.04] border border-overlay/10 text-dark-text/55 px-2 py-0.5 rounded-full">
                              {exp.duration}
                            </span>
                          </div>
                        </div>
                      </button>

                      <div
                        id={`exp-panel-${exp.id}`}
                        className="timeline-panel"
                        data-open={isActive}
                      >
                        <div className="pb-2">
                          <ul className="mt-3 space-y-2">
                            {exp.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                className="font-grotesk text-sm sm:text-base text-dark-text/75 leading-relaxed pl-2.5 border-l-2 border-brand-red/45"
                              >
                                {b}
                              </li>
                            ))}
                          </ul>

                          {exp.skills?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="font-mono text-xs bg-overlay/[0.04] border border-overlay/10 text-dark-text/75 px-3 py-1.5 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
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
