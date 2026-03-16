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
      className="relative bg-dark rounded-t-[4rem] mt-16"
    >
      <div className="footer-content max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-offwhite mb-3">
              Raphael
              <br />
              Karamagi.
            </h3>
            <p className="font-grotesk text-sm text-paper/40 leading-relaxed max-w-xs">
              ECE &amp; CS at Duke University. Building at the intersection of
              intelligence and systems.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-paper/30 tracking-widest uppercase mb-2">
              Connect
            </span>
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 text-paper/60 hover:text-signal transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="font-grotesk text-sm">{label}</span>
                <span className="font-mono text-xs text-paper/20 group-hover:text-signal/50 transition-colors duration-300">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="font-mono text-xs text-paper/50">
                System Operational
              </span>
            </div>

            <span className="font-mono text-xs text-paper/20">
              &copy; {new Date().getFullYear()} Raphael Karamagi
            </span>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/8 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-paper/20">
            Built with precision — React, GSAP, Tailwind
          </span>
          <span className="font-mono text-xs text-paper/20">
            Durham, NC
          </span>
        </div>
      </div>
    </footer>
  )
}
