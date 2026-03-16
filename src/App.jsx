import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Domains from './components/Domains'
import ProjectArchive from './components/ProjectArchive'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

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
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Footer />
      <Analytics />
    </>
  )
}
