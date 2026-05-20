import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProjectArchive from './components/ProjectArchive'
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
