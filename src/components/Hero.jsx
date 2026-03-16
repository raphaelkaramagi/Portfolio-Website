import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 })

      tl.from('.hero-line-1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          '.hero-line-2',
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          '.hero-subtitle',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          '.hero-scroll',
          {
            y: 10,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.2'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] w-full flex items-center"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-3xl">
          <h1 className="hero-line-1 font-grotesk text-4xl sm:text-6xl lg:text-7xl font-bold text-dark tracking-tight leading-none mb-2">
            Engineering the
          </h1>
          <h1 className="hero-line-2 font-serif italic text-6xl sm:text-8xl lg:text-[9rem] text-signal leading-[0.9] mb-8">
            Architecture.
          </h1>
          <p className="hero-subtitle font-mono text-sm sm:text-base text-dark/50 max-w-lg mb-10 leading-relaxed">
            Duke ECE/CS &apos;29. Focused on ML, Systems, and Full-Stack.
          </p>
          <div className="hero-cta flex flex-wrap gap-4">
            <a
              href="https://github.com/raphaelkaramagi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk text-sm font-semibold bg-signal text-offwhite px-7 py-3 rounded-full
                hover:bg-dark transition-all duration-300"
            >
              View My GitHub
            </a>
            <a
              href="mailto:raphael.karamagi@duke.edu"
              className="font-grotesk text-sm font-semibold border border-dark/20 text-dark px-7 py-3 rounded-full
                hover:bg-dark hover:text-offwhite transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-12 right-6 sm:right-12 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-dark/30 tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-dark/30 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
