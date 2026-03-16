import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowLeft, Github, ImageIcon, ChevronDown } from 'lucide-react'
import { projects } from '../data/projects'

const statusColors = {
  Ongoing: 'bg-signal/15 text-signal border-signal/30',
  Completed: 'bg-green-500/15 text-green-600 border-green-500/30',
  Planned: 'bg-dark/8 text-dark/60 border-dark/15',
}

const VISIBLE_COUNT = 3

export default function ProjectPage() {
  const { slug } = useParams()
  const pageRef = useRef(null)
  const project = projects.find((p) => p.slug === slug)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [slug])

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.proj-animate', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, pageRef)
    return () => ctx.revert()
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
        <h1 className="font-grotesk text-4xl font-bold text-dark mb-4">
          Project not found
        </h1>
        <p className="font-mono text-sm text-dark/50 mb-8">
          No project matches that URL.
        </p>
        <Link
          to="/"
          className="font-grotesk text-sm font-semibold bg-signal text-offwhite px-6 py-3 rounded-full hover:bg-dark transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const hasImages = project.images.length > 0
  const hasMany = project.images.length > VISIBLE_COUNT
  const visibleImages = expanded ? project.images : project.images.slice(0, VISIBLE_COUNT)

  return (
    <div ref={pageRef} className="min-h-[100dvh] pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#projects"
          className="proj-animate inline-flex items-center gap-2 font-mono text-sm text-dark/50 hover:text-signal transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>

        <div className="proj-animate flex items-start justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-6xl sm:text-8xl font-bold text-dark/6 leading-none">
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

        <h1 className="proj-animate font-grotesk text-3xl sm:text-5xl font-bold text-dark tracking-tight mb-6">
          {project.title}
        </h1>

        <div className="proj-animate flex flex-wrap items-center gap-2 mb-10">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs bg-paper border border-dark/8 text-dark/70 px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs bg-dark text-offwhite px-4 py-1.5 rounded-full
                hover:bg-signal transition-colors duration-300 ml-1"
            >
              <Github className="w-3.5 h-3.5" />
              Repository
            </a>
          )}
        </div>

        <div className="proj-animate mb-16">
          {project.longDescription.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="font-grotesk text-base sm:text-lg text-dark/70 leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {hasImages && (
          <div className="proj-animate">
            <h2 className="font-grotesk text-xl font-semibold text-dark mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full aspect-video object-cover rounded-2xl border border-dark/8"
                />
              ))}
            </div>
            {hasMany && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="mt-6 mx-auto flex items-center gap-2 font-mono text-sm text-dark/50
                  hover:text-signal transition-colors duration-300"
              >
                Show all {project.images.length} images
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
