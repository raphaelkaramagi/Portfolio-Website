import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Domains from './components/Domains'
import ProjectArchive from './components/ProjectArchive'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'

function NoiseOverlay() {
  return (
    <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Domains />
      <ProjectArchive />
    </main>
  )
}

export default function App() {
  return (
    <>
      <NoiseOverlay />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
    </>
  )
}
