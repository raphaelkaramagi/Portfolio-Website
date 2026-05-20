import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectArchive from './components/ProjectArchive'
import AboutSection from './components/AboutSection'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'

function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
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
