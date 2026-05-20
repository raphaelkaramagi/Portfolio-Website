import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Github, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const statusColors = {
  Ongoing:
    'bg-amber-400/12 text-amber-300 border-amber-400/30',
  Completed:
    'bg-emerald-400/12 text-emerald-300 border-emerald-400/30',
  Planned:
    'bg-white/[0.05] text-dark-text/55 border-white/10',
}

const clientProjectBadge =
  'bg-aurora-violet/15 text-violet-300 border-aurora-violet/40'

const VISIBLE_COUNT = 3

function Lightbox({ src, overlayRef, imgRef, onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Enlarged view"
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-[0_24px_80px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
      />
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const pageRef = useRef(null)
  const project = projects.find((p) => p.slug === slug)
  const [expanded, setExpanded] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(null)
  const overlayRef = useRef(null)
  const lightboxImgRef = useRef(null)

  const closeLightbox = () => {
    const overlay = overlayRef.current
    const img = lightboxImgRef.current
    if (!overlay || !img) { setLightboxImg(null); return }
    const tl = gsap.timeline({ onComplete: () => setLightboxImg(null) })
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
    if (!lightboxImg) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxImg])

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
          className="proj-animate inline-flex items-center gap-2 font-mono text-sm text-dark-text/55 hover:text-aurora-violet transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="proj-animate flex items-start justify-between flex-wrap gap-4 mb-4">
          <span className="font-mono text-6xl sm:text-8xl font-bold text-dark-text/8 leading-none">
            {project.number}
          </span>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`font-mono text-xs px-3 py-1 rounded-full border ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
            {project.client && (
              <span
                className={`font-mono text-xs px-3 py-1 rounded-full border max-w-full text-right ${clientProjectBadge}`}
              >
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
              className="font-mono text-xs bg-white/[0.04] border border-white/10 text-dark-text/75 px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center gap-1.5 font-mono text-xs px-4 py-1.5 rounded-full ml-1"
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
              {visibleImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  onClick={() => setLightboxImg(img)}
                  className="w-full aspect-video object-cover rounded-2xl cursor-pointer ring-1 ring-white/10
                    shadow-[0_18px_44px_-18px_rgba(0,0,0,0.72)]
                    hover:scale-[1.02] hover:ring-aurora-violet/45 hover:shadow-[0_24px_56px_-18px_rgba(139,92,246,0.45)]
                    transition-[transform,box-shadow,outline] duration-300"
                />
              ))}
            </div>
            {hasMany && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-6 mx-auto flex items-center gap-2 font-mono text-sm text-dark-text/55
                  hover:text-aurora-violet transition-colors duration-300"
              >
                {expanded ? 'Show less' : `Show all ${project.images.length} images`}
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}
      </div>

      {lightboxImg && (
        <Lightbox
          src={lightboxImg}
          overlayRef={overlayRef}
          imgRef={lightboxImgRef}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
