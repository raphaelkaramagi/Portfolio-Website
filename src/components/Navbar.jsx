import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = useNavigate()

  const handleNavClick = (e, link) => {
    if (link.external) return
    if (link.href.startsWith('/#')) {
      e.preventDefault()
      const id = link.href.replace('/#', '')
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/#' + id)
      }
    }
  }

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
        px-5 sm:px-8 py-3 rounded-full transition-all duration-500 w-[92vw] max-w-4xl
        animate-navbar-in bg-white/95 backdrop-blur-md border border-dark/15
        ${scrolled ? 'shadow-xl' : 'shadow-lg'}`}
    >
      <Link to="/" className="font-grotesk text-lg font-extrabold tracking-tight text-black">
        Raphael Karamagi.
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link)}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="font-grotesk text-sm font-bold text-black hover:text-signal transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:raphael.karamagi@duke.edu"
          className="font-grotesk text-sm font-semibold bg-signal text-white px-5 py-2 rounded-full
            hover:bg-dark transition-colors duration-300"
        >
          Contact Me
        </a>
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            mobileOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-dark/20 rounded-[2rem] p-6 flex flex-col gap-4 md:hidden shadow-xl">
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
              className="font-grotesk text-base font-bold text-black hover:text-signal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:raphael.karamagi@duke.edu"
            className="font-grotesk text-sm font-semibold bg-signal text-white px-5 py-2 rounded-full text-center
              hover:bg-dark transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  )
}
