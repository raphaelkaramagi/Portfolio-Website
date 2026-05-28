import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'

const RESUME_URL = '/resume/Raphael_Karamagi_May_2026.pdf'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Resume', href: RESUME_URL, external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, link) => {
    if (link.external) return
    if (link.href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault()
        const id = link.href.replace('/#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
          px-5 sm:px-8 py-3 rounded-full transition-shadow duration-500 w-[92vw] max-w-4xl
          animate-navbar-in glass-card
          ${scrolled
            ? 'shadow-[0_22px_64px_-20px_rgba(0,0,0,0.7)]'
            : 'shadow-[0_14px_40px_-18px_rgba(0,0,0,0.55)]'}`}
      >
        <Link
          to="/"
          className="font-grotesk text-lg font-extrabold tracking-tight text-dark-text relative z-10"
        >
          Raphael Karamagi.
        </Link>

        <div className="hidden md:flex items-center gap-5 lg:gap-6 relative z-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="gradient-underline font-grotesk text-sm font-semibold text-dark-text/85 hover:text-dark-text transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-3 ml-1">
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text/55 hover:text-aurora-violet transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/raphaelkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text/55 hover:text-aurora-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <a
            href="mailto:raphael.karamagi@duke.edu"
            className="btn-aurora font-grotesk text-sm font-semibold px-5 py-2 rounded-full"
          >
            Contact Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2 relative z-10">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-dark-text transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark-text transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark-text transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-[92px] left-1/2 -translate-x-1/2 w-[92vw] max-w-4xl z-40 glass-card rounded-[2rem] p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link)
                if (!link.external) setMobileOpen(false)
              }}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="font-grotesk text-base font-bold text-dark-text hover:text-aurora-violet transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 py-1">
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text/55 hover:text-aurora-violet transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/raphaelkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text/55 hover:text-aurora-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <a
            href="mailto:raphael.karamagi@duke.edu"
            className="btn-aurora font-grotesk text-sm font-semibold px-5 py-2 rounded-full text-center"
          >
            Contact Me
          </a>
        </div>
      )}
    </>
  )
}
