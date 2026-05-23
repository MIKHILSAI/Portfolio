'use client'

import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import TypingAnimation from './typing-animation'
import { fadeUpOnMount } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { useEffect } from 'react'

export default function Hero() {
  const { shouldAnimate, enableParallax, prefersReducedMotion } = useMotionPrefs()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 18 })
  const parallaxX = useTransform(smoothX, (v) => v * 0.35)
  const parallaxY = useTransform(smoothY, (v) => v * 0.35)

  useEffect(() => {
    if (!enableParallax) return
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 18)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 18)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableParallax, mouseX, mouseY])

  const reveal = (delay: number) => (shouldAnimate ? fadeUpOnMount(delay) : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } })

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background text-foreground min-h-screen lg:mt-[80px] lg:min-h-[calc(100vh-80px)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_35%,#eef4ff_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(15,23,42,0.95))]" />
      <div className="pointer-events-none absolute inset-0 blur-[120px] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_20%),radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_30%)] dark:bg-none" />
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-4 md:px-8 lg:px-16 pt-[90px] pb-16 lg:pt-[36px]">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
          <div className="w-full lg:w-[60%] space-y-8 lg:pr-6">
            

            <motion.div {...reveal(0.08)}>
              <h2 className="text-[clamp(4rem,6vw,6rem)] font-extrabold tracking-[-0.05em] leading-[0.92] text-slate-900 dark:text-white">
                Mikhil Sai N
              </h2>
            </motion.div>

            <motion.div {...reveal(0.16)} className="max-w-3xl">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.01] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500">
                Engineering AI Solutions for the Future
              </p>
            </motion.div>

            <motion.div {...reveal(0.22)} className="text-lg md:text-xl text-slate-700 dark:text-slate-300">
              AI Engineer • Full Stack Developer • Problem Solver
            </motion.div>

            <motion.div {...reveal(0.28)} className="flex justify-center h-8 md:h-10 items-center">
              <TypingAnimation
                words={['Full Stack Developer', 'AI & ML Enthusiast', 'Problem Solver']}
                className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-semibold tracking-wide"
                delay={prefersReducedMotion ? 0 : 900}
                typingSpeed={60}
                deletingSpeed={40}
                delayBetweenWords={2000}
              />
            </motion.div>

            <motion.div {...reveal(0.34)} className="max-w-2xl text-slate-600 dark:text-slate-400 leading-8">
              <p>
                Passionate Computer Science student focused on building AI-driven systems, scalable web applications, and research-led solutions. Focus on creating technology that delivers real-world impact.
              </p>
            </motion.div>

            <motion.div {...reveal(0.4)} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <motion.a
                href="#projects"
                className="group inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1.5 hover:bg-cyan-600 sm:w-auto"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="/MIKHIL SAI N_SRM Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center rounded-full border border-slate-200/30 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/95 dark:border-slate-700/60 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 sm:w-auto"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Resume
              </motion.a>

              <motion.a
                href="#contact"
                className="group inline-flex w-full items-center justify-center rounded-full border border-slate-300/50 bg-white/50 px-7 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1.5 hover:bg-slate-100 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100 sm:w-auto"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            {...reveal(0.18)}
            className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] border border-slate-200/60 bg-white/80 shadow-[0_30px_70px_rgba(59,130,246,0.08)] backdrop-blur-2xl transition duration-300 ease-out hover:shadow-[0_40px_90px_rgba(59,130,246,0.12)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(8,15,40,0.75)] dark:shadow-[0_30px_70px_rgba(15,23,42,0.18)] dark:hover:shadow-[0_40px_90px_rgba(15,23,42,0.24)] lg:w-[40%] mt-10 lg:mt-0 min-h-[min(62vh,580px)]"
            style={enableParallax ? { x: parallaxX, y: parallaxY } : undefined}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.12),transparent_70%)] opacity-60" />
            <div className="pointer-events-none absolute -top-12 right-4 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 left-6 h-32 w-32 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div className="space-y-4 rounded-3xl bg-white/0 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-cyan-300/80">Profile</p>
              </div>

              <div className="relative w-full overflow-hidden rounded-[24px] bg-slate-50 border border-slate-200/70 shadow-[0_18px_40px_rgba(56,189,248,0.10)] dark:bg-slate-950/10 dark:border-none dark:shadow-none aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/Mikhil%20Sai.png"
                  alt="Portrait of Mikhil Sai"
                  fill
                  className="h-full w-full object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-4 rounded-3xl bg-white/0 px-4 py-4">
                <div className="space-y-1">
                </div>
                <div className="flex flex-wrap gap-2">
                  {['CGPA: 9.27', 'Research Publication', '4× Hackathon Winner'].map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200/50 bg-slate-100/70 px-3 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
