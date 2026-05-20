import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const links = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/raphaelkaramagi',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/raphaelkar',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:raphael.karamagi@duke.edu',
  },
]

export default function Footer() {
  const footerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [pathname])

  return (
    <footer
      ref={footerRef}
      className="relative mt-16 rounded-t-[4rem] overflow-hidden border-t border-white/10 bg-[#08080c]/85 backdrop-blur-2xl"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.55) 30%, rgba(59,130,246,0.55) 50%, rgba(236,72,153,0.55) 70%, transparent 100%)',
        }}
      />

      <div className="footer-content relative max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-dark-text mb-3">
              Raphael
              <br />
              Karamagi.
            </h3>
            <p className="font-grotesk text-sm text-dark-text/50 leading-relaxed max-w-xs">
              ECE &amp; CS at Duke University.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-dark-text/35 tracking-widest uppercase mb-2">
              Connect
            </span>
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 text-dark-text/65 hover:text-aurora-violet transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="font-grotesk text-sm">{label}</span>
                <span className="font-mono text-xs text-dark-text/25 group-hover:text-aurora-pink transition-colors duration-300">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-dark-text/55">
                System Operational
              </span>
            </div>

            <span className="font-mono text-xs text-dark-text/30">
              &copy; {new Date().getFullYear()} Raphael Karamagi
            </span>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-dark-text/30">
            Built with precision.
          </span>
          <span className="font-mono text-xs text-dark-text/30">
            Durham, NC
          </span>
        </div>
      </div>
    </footer>
  )
}
