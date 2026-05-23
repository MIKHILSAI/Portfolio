'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Experience from '@/components/experience'
import Achievements from '@/components/achievements'
import Certifications from '@/components/certifications'
import Publication from '@/components/publication'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import ParticleBackground from '@/components/particle-background'
import ScrollProgress from '@/components/scroll-progress'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? window.scrollY / height : 0
      setScrollProgress(scrolled * 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <ParticleBackground />
      <ScrollProgress progress={scrollProgress} />
      <div className="relative z-10 flex w-full flex-col">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Publication />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
