import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCarousel from './components/ProjectCarousel'
import ProjectArchive from './components/ProjectArchive'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'
import scrollToSection from './lib/scrollToSection'

function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    requestAnimationFrame(() => scrollToSection(id))
  }, [hash])

  return (
    <main>
      <Hero />
      <ProjectCarousel />
      <AboutSection />
      <ExperienceSection />
      <ProjectArchive />
    </main>
  )
}

export default function App() {
  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <AuroraBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
      <Analytics />
    </>
  )
}
