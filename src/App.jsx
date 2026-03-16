import { useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Domains from './components/Domains'
import ProjectArchive from './components/ProjectArchive'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'

const homeScrollY = { current: 0 }

function ScrollManager() {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])

  useLayoutEffect(() => {
    const prev = prevPath.current
    prevPath.current = pathname
    if (prev === pathname) return

    if (pathname === '/' && prev !== '/') {
      window.scrollTo(0, homeScrollY.current)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return
    const saveScroll = () => { homeScrollY.current = window.scrollY }
    window.addEventListener('scroll', saveScroll, { passive: true })
    return () => window.removeEventListener('scroll', saveScroll)
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
      <ScrollManager />
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
