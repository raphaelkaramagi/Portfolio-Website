import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { hasPlayedHomeIntro } from '../lib/animationState'

gsap.registerPlugin(ScrollTrigger)

const statusColors = {
  Ongoing: 'bg-signal/15 text-signal border-signal/30',
  Completed: 'bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30',
  Planned: 'bg-dark/8 dark:bg-dark-text/8 text-dark/60 dark:text-dark-text/60 border-dark/15 dark:border-dark-text/15',
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 15%',
        end: 'bottom 15%',
        pin: true,
        pinSpacing: false,
      })

      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'bottom 85%',
          end: 'bottom 15%',
          scrub: 0.5,
        },
        scale: 0.9,
        filter: 'blur(20px)',
        opacity: 0.5,
        ease: 'power2.inOut',
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card w-full max-w-5xl mx-auto"
      style={{ zIndex: index + 1 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block group"
      >
        <div className="bg-offwhite dark:bg-dark-card border border-dark/8 dark:border-dark-text/15 rounded-[2rem] p-8 sm:p-12 min-h-[380px] flex flex-col justify-between shadow-sm
          group-hover:border-signal/30 dark:group-hover:border-signal/50 dark:group-hover:shadow-[0_0_20px_rgba(230,59,46,0.08)] transition-all duration-300">
          <div className="flex items-start justify-between mb-8">
            <span className="font-mono text-5xl sm:text-7xl font-bold text-dark/8 dark:text-dark-text/8 leading-none">
              {project.number}
            </span>
            <div className="flex items-center gap-2">
              {project.client && (
                <span className="font-mono text-xs text-dark/40 dark:text-dark-text/40">
                  Client Project
                </span>
              )}
              <span
                className={`font-mono text-xs px-3 py-1 rounded-full border ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>

          <h3 className="font-grotesk text-2xl sm:text-4xl font-bold text-dark dark:text-dark-text tracking-tight mb-6 max-w-2xl">
            {project.title}
          </h3>

          <div>
            <p className="font-grotesk text-sm sm:text-base text-dark/60 dark:text-dark-text/60 leading-relaxed mb-6 max-w-2xl">
              {project.description}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs bg-paper dark:bg-dark-card-alt border border-dark/8 dark:border-dark-text/8 text-dark/70 dark:text-dark-text/70 px-3 py-1.5 rounded-full"
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
                    className="flex items-center gap-1.5 font-mono text-xs text-signal hover:text-signal/70 transition-colors duration-300"
                  >
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <span className="flex items-center gap-1.5 font-mono text-xs text-dark/30 dark:text-dark-text/30 group-hover:text-signal transition-colors duration-300">
                  View project
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

const sectionOrder = ['Completed', 'Ongoing', 'Planned']

const sectionMeta = {
  Ongoing: { label: 'In Progress', accent: 'text-signal' },
  Completed: { label: 'Completed', accent: 'text-green-600 dark:text-green-400' },
  Planned: { label: 'Planned', accent: 'text-dark/40 dark:text-dark-text/40' },
}

export default function ProjectArchive() {
  const sectionRef = useRef(null)

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

  const grouped = sectionOrder.map((status) => ({
    status,
    ...sectionMeta[status],
    items: projects.filter((p) => p.status === status),
  })).filter((g) => g.items.length > 0)

  let globalIndex = 0

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-12"
    >
      <div className="archive-header max-w-5xl mx-auto mb-16">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          Archive
        </span>
        <h2 className="font-grotesk text-3xl sm:text-5xl font-bold text-dark dark:text-dark-text mt-3 tracking-tight">
          Project Archive
        </h2>
      </div>

      {grouped.map((group, gi) => (
        <div key={group.status} className="mb-12 last:mb-0">
          {gi > 0 && (
            <div className="relative z-50 max-w-5xl mx-auto pt-16 pb-2 mb-8">
              <div className="border-t border-dark/8 dark:border-dark-text/10" />
            </div>
          )}
          <div className="relative z-50 max-w-5xl mx-auto mb-8">
            <span className={`font-mono text-xs tracking-widest uppercase ${group.accent}`}>
              {group.label}
            </span>
          </div>
          <div className="flex flex-col gap-8">
            {group.items.map((project) => {
              const idx = globalIndex++
              return <ProjectCard key={project.number} project={project} index={idx} />
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
