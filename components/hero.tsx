'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import TypingAnimation from './typing-animation'
import Magnetic from './magnetic'

export default function Hero() {
  const premiumEase = [0.22, 1, 0.36, 1]

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
        ease: premiumEase,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.76, ease: premiumEase } },
  }

  return (
    <section className="relative z-20 min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 md:py-28 bg-background text-foreground">
      <div className="absolute inset-0 bg-background/70 dark:bg-slate-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.1),transparent_16%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.12),transparent_20%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.12),transparent_20%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(129,140,248,0.14),transparent_22%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.08),transparent_20%)] opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_26%,rgba(255,255,255,0.12))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_26%,rgba(2,6,23,0.72))] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),transparent_62%)] dark:bg-[radial-gradient(circle,rgba(129,140,248,0.18),transparent_62%)] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.28),transparent_35%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_35%)] opacity-80 pointer-events-none" />
      <div className="absolute right-10 top-24 hidden h-48 w-48 rounded-full border border-white/8 bg-white/5 blur-3xl dark:bg-indigo-300/5 lg:block" />

      <motion.div
        className="relative z-30 w-full max-w-3xl px-4 flex flex-col items-center justify-center text-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="glass-dark inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300"
        >
          <span className="h-2 w-2 rounded-full bg-slate-400 shadow-[0_0_16px_rgba(148,163,184,0.45)] dark:bg-indigo-300 dark:shadow-[0_0_18px_rgba(129,140,248,0.65)]" />
          AI • Web3 • Interactive Systems
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-6xl md:text-7xl xl:text-8xl font-semibold tracking-tight text-slate-950 dark:text-white text-glow leading-tight">
          Mikhil Sai N
        </motion.h2>

        <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
          <span className="block">Building the Future</span>
          <span className="block">with AI</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="flex justify-center h-8 md:h-10 items-center">
          <TypingAnimation
            words={['Full Stack Developer', 'AI & ML Enthusiast', 'Problem Solver']}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-200 font-semibold tracking-wide"
            delay={500}
            typingSpeed={60}
            deletingSpeed={40}
            delayBetweenWords={2000}
          />
        </motion.div>

        <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Building intelligent systems that solve real-world problems using AI, data, and scalable technologies. Passionate about creating products that matter.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Magnetic className="inline-block" strength={14} rotation={5}>
            <motion.a
              href="#projects"
              className="hero-magnetic inline-flex items-center justify-center rounded-full border border-slate-200/30 bg-slate-950/10 dark:bg-white/10 px-8 py-3 text-sm font-semibold text-slate-950 dark:text-white transition hover:bg-slate-950/15 dark:hover:bg-white/15"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects <ArrowRight size={18} className="ml-2" />
            </motion.a>
          </Magnetic>
          <Magnetic className="inline-block" strength={14} rotation={5}>
            <motion.a
              href="/MIKHIL SAI N_SRM Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-magnetic inline-flex items-center justify-center rounded-full border border-slate-200/30 bg-slate-950/10 dark:bg-white/10 px-8 py-3 text-sm font-semibold text-slate-950 dark:text-white transition hover:bg-slate-950/15 dark:hover:bg-white/15"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </motion.a>
          </Magnetic>
          <Magnetic className="inline-block" strength={14} rotation={5}>
            <motion.a
              href="#contact"
              className="hero-magnetic inline-flex items-center justify-center rounded-full border border-slate-200/30 bg-slate-950/10 dark:bg-white/10 px-8 py-3 text-sm font-semibold text-slate-950 dark:text-white transition hover:bg-slate-950/15 dark:hover:bg-white/15"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 rounded-full border border-slate-200/40 bg-white/85 px-4 py-3 text-xs text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300"
      >
        <span className="block h-2 w-2 rounded-full bg-slate-900 dark:bg-white/80" />
        Scroll to explore
      </motion.div>
    </section>
  )
}
