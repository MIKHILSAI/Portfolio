'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { EASE_PREMIUM, DURATION, hoverScale, tapScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const drawerVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: DURATION.normal, ease: EASE_PREMIUM },
      opacity: { duration: DURATION.fast },
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const drawerItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_PREMIUM },
  },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#about')
  const { shouldAnimate } = useMotionPrefs()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateActiveSection = useCallback(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))
    const scrollPosition = window.scrollY + window.innerHeight * 0.35

    let current = navItems[0].href
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= scrollPosition) {
        current = `#${id}`
      }
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [updateActiveSection])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'glass-dark border-white/10' : 'glass border-slate-200/60'
      }`}
      initial={shouldAnimate ? { y: -80, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION.normal, ease: EASE_PREMIUM }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-slate-950 dark:text-white"
            whileHover={shouldAnimate ? { scale: 1.03 } : undefined}
            whileTap={shouldAnimate ? tapScale : undefined}
          >
            <Link href="/">MSN</Link>
          </motion.div>

          <LayoutGroup>
            <div className="hidden md:flex gap-1 items-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-colors duration-200 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span className={isActive ? 'text-slate-900 dark:text-white font-medium' : ''}>
                      {item.label}
                    </span>
                    {isActive && shouldAnimate && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary dark:bg-cyan-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {!shouldAnimate && isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </div>
          </LayoutGroup>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <motion.a
              href="#contact"
              className="px-5 py-2 rounded-full border border-slate-300/40 bg-slate-900/10 dark:bg-white/10 text-slate-950 dark:text-white font-medium shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:bg-slate-900/15 dark:hover:bg-white/15 transition-colors duration-300"
              whileHover={shouldAnimate ? hoverScale : undefined}
              whileTap={shouldAnimate ? tapScale : undefined}
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="tap-target inline-flex items-center justify-center text-slate-900 dark:text-white"
              whileTap={shouldAnimate ? tapScale : undefined}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden overflow-hidden"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-hidden={false}
          >
            <div className="glass-dark border-t border-white/10">
              <div className="flex flex-col gap-1 px-4 py-6">
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={drawerItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 text-lg transition-colors ${
                        activeSection === item.href
                          ? 'text-primary font-medium'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={drawerItemVariants} className="pt-2">
                  <motion.a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-950 dark:text-white text-center font-medium"
                    whileTap={shouldAnimate ? tapScale : undefined}
                  >
                    Let&apos;s Talk
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
