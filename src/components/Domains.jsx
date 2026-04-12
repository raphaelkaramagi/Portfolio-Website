import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, CircuitBoard, Code } from 'lucide-react'
import { hasPlayedHomeIntro } from '../lib/animationState'

gsap.registerPlugin(ScrollTrigger)

// ─── Card 1: Telemetry Typewriter (Machine Learning) ────────────────────────
function TelemetryTypewriter() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const intervalRef = useRef(null)

  const logLines = [
    'Epoch 1/50  ━━━━━━━━━━  loss: 0.4821  val_acc: 0.712',
    'Epoch 2/50  ━━━━━━━━━━  loss: 0.3917  val_acc: 0.768',
    'Epoch 5/50  ━━━━━━━━━━  loss: 0.2103  val_acc: 0.841',
    'Epoch 10/50 ━━━━━━━━━━  loss: 0.1284  val_acc: 0.893',
    'Epoch 20/50 ━━━━━━━━━━  loss: 0.0672  val_acc: 0.931',
    'Epoch 35/50 ━━━━━━━━━━  loss: 0.0291  val_acc: 0.958',
    'Epoch 50/50 ━━━━━━━━━━  loss: 0.0134  val_acc: 0.972',
    '─────────────────────────────────────────────',
    'Model: LSTM(128) → Dense(64) → Softmax',
    'Precision: 0.968  Recall: 0.971  F1: 0.969',
    '> Training complete. Checkpoints saved.',
  ]

  const typeEffect = useCallback(() => {
    let lineIdx = 0
    let charIdx = 0

    const tick = () => {
      if (lineIdx >= logLines.length) {
        clearInterval(intervalRef.current)
        return
      }
      const line = logLines[lineIdx]
      charIdx++
      setCurrentLine(line.slice(0, charIdx))

      if (charIdx >= line.length) {
        setLines((prev) => [...prev.slice(-6), line])
        setCurrentLine('')
        lineIdx++
        charIdx = 0
      }
    }

    intervalRef.current = setInterval(tick, 25)
  }, [])

  useEffect(() => {
    const timer = setTimeout(typeEffect, 1000)
    return () => {
      clearTimeout(timer)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [typeEffect])

  return (
    <div className="h-56 overflow-hidden font-mono text-xs sm:text-sm leading-relaxed text-dark/60 dark:text-dark-text/60">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-signal mr-2">$</span>
          {line}
        </div>
      ))}
      {currentLine && (
        <div className="whitespace-nowrap">
          <span className="text-signal mr-2">$</span>
          {currentLine}
          <span className="inline-block w-2 h-4 bg-signal ml-0.5 animate-pulse" />
        </div>
      )}
    </div>
  )
}

// ─── Card 2: Pin State Monitor (Embedded & Hardware) ────────────────────────
function PinStateMonitor() {
  const pins = [
    { id: 'D2', label: 'WASH_BTN' },
    { id: 'D3', label: 'E_STOP' },
    { id: 'D5', label: 'SOLENOID' },
    { id: 'D6', label: 'STATUS_LED' },
    { id: 'D9', label: 'BEACON' },
  ]

  const sequence = [
    [false, false, false, false, false],
    [true,  false, false, false, false],
    [true,  false, true,  false, false],
    [true,  false, true,  true,  false],
    [true,  false, true,  true,  true],
    [false, false, true,  true,  true],
    [false, false, true,  true,  true],
    [false, false, false, true,  true],
    [false, false, false, false, true],
    [false, false, false, false, false],
  ]

  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % sequence.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  const states = sequence[step]

  return (
    <div className="h-56 flex flex-col justify-center gap-2.5">
      {pins.map((pin, i) => (
        <div key={pin.id} className="flex items-center gap-3 font-mono text-xs">
          <span className="text-dark/40 dark:text-dark-text/40 w-6">{pin.id}</span>
          <div
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              states[i]
                ? 'bg-signal shadow-[0_0_6px_rgba(230,59,46,0.6)]'
                : 'bg-dark/15 dark:bg-dark-text/15'
            }`}
          />
          <span className="text-dark/60 dark:text-dark-text/60">{pin.label}</span>
          <span
            className={`ml-auto font-bold transition-colors duration-200 ${
              states[i] ? 'text-signal' : 'text-dark/25 dark:text-dark-text/25'
            }`}
          >
            {states[i] ? 'HIGH' : 'LOW'}
          </span>
        </div>
      ))}
      <div className="mt-2 font-mono text-xs text-dark/40 dark:text-dark-text/40 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
        GPIO monitor — wash cycle
      </div>
    </div>
  )
}

// ─── Card 3: Diagnostic Shuffler (Software Engineering) ─────────────────────
function DiagnosticShuffler() {
  const items = [
    { label: 'fork()', detail: 'process spawn', color: 'text-signal' },
    { label: 'mutex_lock()', detail: 'thread sync', color: 'text-dark dark:text-dark-text' },
    { label: 'fetch()', detail: 'async request', color: 'text-signal' },
    { label: 'malloc()', detail: 'heap alloc', color: 'text-dark dark:text-dark-text' },
    { label: 'render()', detail: 'DOM update', color: 'text-signal' },
  ]

  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-56 flex items-center justify-center">
      {stack.map((item, i) => (
        <div
          key={item.label}
          className="absolute w-full max-w-[280px] bg-paper dark:bg-dark-card-alt border border-dark/10 dark:border-dark-text/10 rounded-2xl-plus px-5 py-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateY(${i * 14}px) scale(${1 - i * 0.04})`,
            opacity: 1 - i * 0.2,
            zIndex: stack.length - i,
          }}
        >
          <div className="flex items-center justify-between">
            <code className={`text-sm font-bold font-mono ${item.color}`}>
              {item.label}
            </code>
            <span className="font-mono text-xs text-dark/40 dark:text-dark-text/40">{item.detail}</span>
          </div>
          <div className="mt-2 h-1 bg-dark/5 dark:bg-dark-text/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-signal/40 rounded-full transition-all duration-700"
              style={{ width: `${100 - i * 20}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Domain Cards Container ────────────────────────────────────────────────
const domains = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description:
      'Building production-ready models — from ASL gesture recognition and LSTM stock predictors to NLP sentiment analysis pipelines.',
    Component: TelemetryTypewriter,
  },
  {
    icon: CircuitBoard,
    title: 'Embedded Systems & Hardware',
    description:
      'Microcontroller firmware, MOSFET drive circuits, power regulation, PCB prototyping, soldering, and CAD — from bench to deployed control systems.',
    Component: PinStateMonitor,
  },
  {
    icon: Code,
    title: 'Software Engineering',
    description:
      'Systems and full-stack — from C++ servers and language interpreters to React frontends, real-time platforms, and database-driven APIs.',
    Component: DiagnosticShuffler,
  },
]

export default function Domains() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (hasPlayedHomeIntro) return

    const ctx = gsap.context(() => {
      gsap.from('.about-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.domain-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <div className="about-header mb-16">
        <span className="font-mono text-xs text-signal tracking-widest uppercase">
          About
        </span>
        <h2 className="font-grotesk text-3xl sm:text-5xl font-bold text-dark dark:text-dark-text mt-3 tracking-tight">
          What I Build
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {domains.map(({ icon: Icon, title, description, Component }) => (
          <div
            key={title}
            className="domain-card group bg-offwhite dark:bg-dark-card border border-dark/8 dark:border-dark-text/15 rounded-[2rem] p-6 sm:p-8
              hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              cursor-default overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-signal/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-signal" />
              </div>
              <h3 className="font-grotesk text-lg font-semibold text-dark dark:text-dark-text">{title}</h3>
            </div>
            <p className="font-grotesk text-sm text-dark/60 dark:text-dark-text/60 mb-6 leading-relaxed">
              {description}
            </p>
            <div className="border-t border-dark/8 dark:border-dark-text/8 pt-5">
              <Component />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
