import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'
import scrollToSection from '../lib/scrollToSection'
import ThemeToggle from './ThemeToggle'

// Keep this filename stable. 
const RESUME_URL = '/resume/Raphael_Karamagi_Resume.pdf'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Resume', href: RESUME_URL, external: true },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

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
        scrollToSection(link.href.replace('/#', ''))
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between
          px-5 sm:px-8 py-3 rounded-full transition-shadow duration-300 w-[92vw] max-w-4xl
          animate-navbar-in glass-nav pointer-events-auto
          ${scrolled ? 'nav-shadow-scrolled' : 'nav-shadow'}`}
      >
        <Link
          to="/"
          className={`font-grotesk text-lg font-extrabold tracking-tight text-dark-text relative z-10 ${focusRing} rounded-sm`}
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
              className={`gradient-underline font-grotesk text-sm font-semibold text-dark-text/85 hover:text-dark-text transition-colors duration-300 ${focusRing} rounded-sm`}
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-3 ml-1">
            <ThemeToggle />
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-dark-text/55 hover:text-brand-red transition-colors duration-300 ${focusRing} rounded-sm`}
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/raphaelkar"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-dark-text/55 hover:text-[#0A66C2] transition-colors duration-300 ${focusRing} rounded-sm`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <a
            href="mailto:raphael.karamagi@duke.edu"
            className={`btn-aurora font-grotesk text-sm font-semibold px-5 py-2 rounded-full ${focusRing}`}
          >
            Contact Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2 relative z-10">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex flex-col gap-1.5 p-2 ${focusRing} rounded-full`}
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
        <div className="fixed top-[92px] left-1/2 -translate-x-1/2 w-[92vw] max-w-4xl z-[90] glass-nav rounded-[2rem] p-6 flex flex-col gap-4 md:hidden pointer-events-auto">
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
              className={`font-grotesk text-base font-bold text-dark-text hover:text-brand-red transition-colors ${focusRing} rounded-sm`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 py-1">
            <ThemeToggle />
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-dark-text/55 hover:text-brand-red transition-colors duration-300 ${focusRing} rounded-sm`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/raphaelkar"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-dark-text/55 hover:text-[#0A66C2] transition-colors duration-300 ${focusRing} rounded-sm`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <a
            href="mailto:raphael.karamagi@duke.edu"
            className={`btn-aurora font-grotesk text-sm font-semibold px-5 py-2 rounded-full text-center ${focusRing}`}
          >
            Contact Me
          </a>
        </div>
      )}
    </>
  )
}
