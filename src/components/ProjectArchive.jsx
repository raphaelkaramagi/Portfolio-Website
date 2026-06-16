import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects, resolveProjectCover } from '../data/projects'
import { hasPlayedHomeIntro } from '../lib/animationState'
import useTilt from '../lib/useTilt'
import useCursorVars from '../lib/useCursorVars'

gsap.registerPlugin(ScrollTrigger)

const statusBadgeClass = {
  Ongoing: 'badge-ongoing',
  Completed: 'badge-completed',
  Planned: 'badge-planned',
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

const ProjectCard = forwardRef(function ProjectCard({ project, stackIndex }, ref) {
  const tiltRef = useTilt({ max: 3.5 })
  const cursorRef = useCursorVars()
  const cover = resolveProjectCover(project)

  const innerRef = useCallback(
    (node) => {
      tiltRef.current = node
      cursorRef.current = node
    },
    [tiltRef, cursorRef],
  )

  return (
    <div
      ref={ref}
      className="project-card will-change-transform origin-top w-full"
      style={{ zIndex: stackIndex + 1 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`block group rounded-[2rem] ${focusRing}`}
      >
        <div
          ref={innerRef}
          className={`glass-card glass-card-hoverable rounded-[2rem] overflow-hidden flex flex-col justify-between ${
            cover ? '' : 'min-h-[380px] px-6 py-8 sm:p-12'
          }`}
        >
          {cover && (
            <div className="relative w-full h-40 sm:h-52 shrink-0 overflow-hidden">
              <img
                src={cover}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-dark-bg/90 via-dark-bg/35 to-transparent pointer-events-none"
                aria-hidden
              />
            </div>
          )}

          <div
            className={`relative z-10 flex flex-col flex-1 justify-between ${
              cover ? 'px-6 py-6 sm:px-10 sm:py-8' : ''
            } ${cover ? 'min-h-[280px] sm:min-h-[300px]' : ''}`}
          >
            <div className="flex items-start gap-4 sm:gap-8 mb-8 min-w-0">
              <span className="font-mono text-5xl sm:text-7xl font-bold text-dark-text/10 leading-none shrink-0 tabular-nums">
                {project.number}
              </span>
              <div className="flex flex-1 flex-wrap justify-end items-center gap-2 min-w-0">
                {project.client && (
                  <span className="badge-client">
                    Client Project
                  </span>
                )}
                <span className={statusBadgeClass[project.status]}>
                  {project.status}
                </span>
              </div>
            </div>

            <h3 className="font-grotesk text-2xl sm:text-4xl font-bold text-dark-text tracking-tight mb-6 max-w-3xl transition-colors duration-300">
              {project.title}
            </h3>

            <div>
              <p className="font-grotesk text-sm sm:text-base text-dark-text/65 leading-relaxed mb-6 max-w-3xl">
                {project.description}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs bg-overlay/[0.04] border border-overlay/10 text-dark-text/75 px-3 py-1.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-4 shrink-0">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1.5 font-mono text-xs link-demo ${focusRing} rounded-full`}
                    >
                      Live Demo
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="flex items-center gap-1.5 font-mono text-xs text-dark-text/45 group-hover:text-brand-red transition-colors duration-300">
                    View project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
})

const sectionOrder = ['Ongoing', 'Completed', 'Planned']

const sectionMeta = {
  Ongoing: { label: 'In Progress', accent: 'accent-ongoing' },
  Completed: { label: 'Completed', accent: 'accent-completed' },
  Planned: { label: 'Planned', accent: 'accent-planned' },
}

function mountCardBlur(nodes) {
  const ctx = gsap.context(() => {
    nodes.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 1, filter: 'blur(0px)', scale: 1 },
        {
          opacity: 0.3,
          filter: 'blur(14px)',
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'center top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      )
    })
    ScrollTrigger.refresh()
  })
  return ctx
}

export default function ProjectArchive() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const stackCtxRef = useRef(null)

  const grouped = useMemo(
    () =>
      sectionOrder
        .map((status) => ({
          status,
          ...sectionMeta[status],
          items: projects.filter((p) => p.status === status),
        }))
        .filter((g) => g.items.length > 0),
    [],
  )

  const deckKey = useMemo(
    () => grouped.flatMap((g) => g.items).map((p) => p.slug).join('|'),
    [grouped],
  )

  const deckCount = grouped.reduce((n, g) => n + g.items.length, 0)

  useEffect(() => {
    stackCtxRef.current?.revert()
    stackCtxRef.current = null

    let cancelled = false
    let tries = 0

    const tryMount = () => {
      if (cancelled || tries++ > 24) return

      const nodes = []
      for (let i = 0; i < deckCount; i++) {
        const node = cardsRef.current[i]
        if (!node) {
          requestAnimationFrame(tryMount)
          return
        }
        nodes.push(node)
      }

      stackCtxRef.current = mountCardBlur(nodes)
    }

    requestAnimationFrame(tryMount)

    return () => {
      cancelled = true
      stackCtxRef.current?.revert()
      stackCtxRef.current = null
    }
  }, [deckKey, deckCount])

  useEffect(() => {
    if (hasPlayedHomeIntro) return

    const ctx = gsap.context(() => {
      gsap.from('.archive-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let stackIndex = 0

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <div id="projects" className="archive-header mb-10 sm:mb-12">
        <span className="font-mono text-xs text-aurora-animated tracking-widest uppercase">
          Archive
        </span>
        <h2 className="font-grotesk text-3xl sm:text-5xl font-bold text-dark-text mt-3 tracking-tight">
          Project Archive
        </h2>
      </div>

      {grouped.map((group, gi) => (
        <div key={group.status} className="mb-12 last:mb-0">
          {gi > 0 && (
            <div className="relative z-20 pt-16 pb-2 mb-8">
              <div className="border-t border-overlay/10" />
            </div>
          )}
          <div className="relative z-20 mb-8">
            <span className={`font-mono text-xs tracking-widest uppercase ${group.accent}`}>
              {group.label}
            </span>
          </div>
          <div className="flex flex-col gap-8">
            {group.items.map((project) => {
              const idx = stackIndex++
              return (
                <ProjectCard
                  key={project.slug}
                  ref={(el) => {
                    cardsRef.current[idx] = el
                  }}
                  project={project}
                  stackIndex={idx}
                />
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
