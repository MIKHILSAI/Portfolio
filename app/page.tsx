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
      const scrolled = window.scrollY / height
      setScrollProgress(scrolled * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen bg-background dark:bg-slate-950/95 text-foreground">
      <ParticleBackground />
      <ScrollProgress progress={scrollProgress} />
      <Navbar />
      
      <div className="relative z-10">
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
    </main>
  )
}
