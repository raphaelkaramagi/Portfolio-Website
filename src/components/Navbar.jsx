import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Github, Linkedin, Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/themeContext'

const RESUME_URL =
  'https://docs.google.com/document/d/e/2PACX-1vTAwbKjKBeitz8um71lzTx__5dS8nAPpiRBLBeJJi7IFbsKAVBI9r3_3eO0YEolfw/pub'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Resume', href: RESUME_URL, external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { dark, toggleDark } = useTheme()

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
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
        px-5 sm:px-8 py-3 rounded-full transition-all duration-500 w-[92vw] max-w-4xl
        animate-navbar-in bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md border border-dark/15 dark:border-dark-text/15
        ${scrolled ? 'shadow-xl' : 'shadow-lg'}`}
    >
      <Link to="/" className="font-grotesk text-lg font-extrabold tracking-tight text-dark dark:text-dark-text">
        Raphael Karamagi.
      </Link>

      <div className="hidden md:flex items-center gap-5 lg:gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link)}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="font-grotesk text-sm font-bold text-dark dark:text-dark-text hover:text-signal dark:hover:text-signal transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}

        <div className="flex items-center gap-3 ml-1">
          <a
            href="https://github.com/raphaelkaramagi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark/50 dark:text-dark-text/50 hover:text-signal dark:hover:text-signal transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/raphaelkar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark/50 dark:text-dark-text/50 hover:text-signal dark:hover:text-signal transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={toggleDark}
            className="transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {dark
              ? <Sun className="w-4 h-4 text-amber-400 hover:text-amber-500" fill="currentColor" />
              : <Moon className="w-4 h-4 text-indigo-400 hover:text-indigo-500" fill="currentColor" />
            }
          </button>
        </div>

        <a
          href="mailto:raphael.karamagi@duke.edu"
          className="font-grotesk text-sm font-semibold bg-signal text-white px-5 py-2 rounded-full
            hover:bg-dark dark:hover:bg-dark-text dark:hover:text-dark-bg transition-colors duration-300"
        >
          Contact Me
        </a>
      </div>

      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleDark}
          className="transition-colors duration-300 p-2"
          aria-label="Toggle dark mode"
        >
          {dark
            ? <Sun className="w-4 h-4 text-amber-400" fill="currentColor" />
            : <Moon className="w-4 h-4 text-indigo-400" fill="currentColor" />
          }
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-dark dark:bg-dark-text transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark dark:bg-dark-text transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark dark:bg-dark-text transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-dark-card border border-dark/20 dark:border-dark-text/15 rounded-[2rem] p-6 flex flex-col gap-4 md:hidden shadow-xl">
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
              className="font-grotesk text-base font-bold text-dark dark:text-dark-text hover:text-signal dark:hover:text-signal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 py-1">
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 dark:text-dark-text/50 hover:text-signal dark:hover:text-signal transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/raphaelkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 dark:text-dark-text/50 hover:text-signal dark:hover:text-signal transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <a
            href="mailto:raphael.karamagi@duke.edu"
            className="font-grotesk text-sm font-semibold bg-signal text-white px-5 py-2 rounded-full text-center
              hover:bg-dark dark:hover:bg-dark-text dark:hover:text-dark-bg transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  )
}
