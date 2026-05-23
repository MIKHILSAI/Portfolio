'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tapScale, hoverScale, EASE_PREMIUM, DURATION } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { shouldAnimate } = useMotionPrefs()
  const isDark = theme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary transition-colors glow-secondary">
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <motion.button
      whileHover={shouldAnimate ? hoverScale : undefined}
      whileTap={shouldAnimate ? tapScale : undefined}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors glow-secondary overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={shouldAnimate ? { opacity: 0, rotate: -90, scale: 0.5 } : false}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldAnimate ? { opacity: 0, rotate: 90, scale: 0.5 } : undefined}
          transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
