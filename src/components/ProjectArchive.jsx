import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const statusColors = {
  Ongoing: 'bg-signal/15 text-signal border-signal/30',
  Completed: 'bg-green-500/15 text-green-600 border-green-500/30',
  Planned: 'bg-dark/8 text-dark/60 border-dark/15',
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
        <div className="bg-offwhite border border-dark/8 rounded-[2rem] p-8 sm:p-12 min-h-[380px] flex flex-col justify-between shadow-sm
          group-hover:border-signal/30 transition-colors duration-300">
          <div className="flex items-start justify-between mb-8">
            <span className="font-mono text-5xl sm:text-7xl font-bold text-dark/8 leading-none">
              {project.number}
            </span>
            <span
              className={`font-mono text-xs px-3 py-1 rounded-full border ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
          </div>

          <h3 className="font-grotesk text-2xl sm:text-4xl font-bold text-dark tracking-tight mb-6 max-w-2xl">
            {project.title}
          </h3>

          <div>
            <p className="font-grotesk text-sm sm:text-base text-dark/60 leading-relaxed mb-6 max-w-2xl">
              {project.description}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs bg-paper border border-dark/8 text-dark/70 px-3 py-1.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-dark/30 group-hover:text-signal transition-colors duration-300 shrink-0">
                View project
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function ProjectArchive() {
  const sectionRef = useRef(null)

  useEffect(() => {
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
        <h2 className="font-grotesk text-3xl sm:text-5xl font-bold text-dark mt-3 tracking-tight">
          Project Archive
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
