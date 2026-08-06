import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Github, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const statusBadgeClass = {
  Ongoing: 'badge-ongoing',
  Completed: 'badge-completed',
  Planned: 'badge-planned',
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

const VISIBLE_COUNT = 3

function Lightbox({ src, caption, overlayRef, imgRef, onClose }) {
  useEffect(() => {
    const overlay = overlayRef.current
    const img = imgRef.current
    if (!overlay || !img) return
    gsap.set(overlay, { opacity: 0 })
    gsap.set(img, { scale: 0.85, opacity: 0 })
    const tl = gsap.timeline()
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
    tl.to(img, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.05)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-md px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption || 'Enlarged gallery image'}
    >
      <img
        ref={imgRef}
        src={src}
        alt={caption || 'Enlarged view'}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-[0_24px_80px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
      />
      {caption && (
        <p
          className="max-w-xl text-center font-grotesk text-sm sm:text-base text-white/85 px-2"
          onClick={(e) => e.stopPropagation()}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const pageRef = useRef(null)
  const project = projects.find((p) => p.slug === slug)
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const overlayRef = useRef(null)
  const lightboxImgRef = useRef(null)

  const closeLightbox = () => {
    const overlay = overlayRef.current
    const img = lightboxImgRef.current
    if (!overlay || !img) { setLightbox(null); return }
    const tl = gsap.timeline({ onComplete: () => setLightbox(null) })
    tl.to(img, { scale: 0.85, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
    tl.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
  }

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
    gsap.set('.footer-content', { clearProps: 'all' })
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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

  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  if (!project) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
        <h1 className="font-grotesk text-4xl font-bold text-dark-text mb-4">
          Project not found
        </h1>
        <p className="font-mono text-sm text-dark-text/55 mb-8">
          No project matches that URL.
        </p>
        <Link
          to="/"
          className="btn-aurora font-grotesk text-sm font-semibold px-6 py-3 rounded-full"
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
          to="/"
          className={`proj-animate inline-flex items-center gap-2 font-mono text-sm text-dark-text/55 hover:text-brand-red transition-colors duration-300 mb-12 ${focusRing} rounded-sm`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="proj-animate flex items-start justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-6xl sm:text-8xl font-bold text-dark-text/8 leading-none">
            {project.number}
          </span>
          <div className="flex flex-col items-end gap-2">
            <span className={statusBadgeClass[project.status]}>
              {project.status}
            </span>
            {project.client && (
              <span className="badge-client max-w-full text-right">
                Client Project — {project.client}
              </span>
            )}
          </div>
        </div>

        <h1 className="proj-animate font-grotesk text-3xl sm:text-5xl font-bold text-dark-text tracking-tight mb-6">
          {project.title}
        </h1>

        <div className="proj-animate flex flex-wrap items-center gap-2 mb-10">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs bg-overlay/[0.04] border border-overlay/10 text-dark-text/75 px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass btn-glass-white-hover inline-flex items-center gap-1.5 font-mono text-xs px-4 py-1.5 rounded-full ml-1"
            >
              <Github className="w-3.5 h-3.5" />
              Repository
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora inline-flex items-center gap-1.5 font-mono text-xs px-4 py-1.5 rounded-full ml-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>

        <div className="proj-animate mb-16 glass-card-soft rounded-[2rem] p-7 sm:p-10">
          {project.longDescription.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="font-grotesk text-base sm:text-lg text-dark-text/80 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {hasImages && (
          <div className="proj-animate">
            <h2 className="font-grotesk text-xl font-semibold text-dark-text mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleImages.map((image, i) => (
                <button
                  key={image.full}
                  type="button"
                  title={image.caption || undefined}
                  aria-label={image.caption || `${project.title} screenshot ${i + 1}`}
                  onClick={() => setLightbox({ src: image.full, caption: image.caption })}
                  className={`group relative block w-full overflow-hidden rounded-2xl text-left cursor-pointer ring-1 ring-overlay/10
                    shadow-[0_18px_44px_-18px_rgba(0,0,0,0.72)]
                    hover:scale-[1.02] hover:ring-brand-red/45 hover:shadow-[0_24px_56px_-18px_rgba(220,38,38,0.35)]
                    ${focusRing}
                    transition-[transform,box-shadow] duration-300`}
                >
                  <img
                    src={image.preview}
                    alt={image.caption || `${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-video object-cover pointer-events-none"
                  />
                  {image.caption && (
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2.5
                        bg-gradient-to-t from-black/75 via-black/45 to-transparent
                        font-grotesk text-[11px] sm:text-xs text-white/95 leading-snug
                        opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                        group-focus-visible:opacity-100 group-focus-visible:translate-y-0
                        transition-all duration-300"
                    >
                      {image.caption}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {hasMany && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={`mt-6 mx-auto flex items-center gap-2 font-mono text-sm text-dark-text/55
                  hover:text-brand-red transition-colors duration-300 ${focusRing} rounded-sm`}
              >
                {expanded ? 'Show less' : `Show all ${project.images.length} images`}
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          overlayRef={overlayRef}
          imgRef={lightboxImgRef}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
