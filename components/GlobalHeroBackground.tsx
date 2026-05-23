'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

export function GlobalHeroBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { shouldAnimate, enableParallax, isMobile } = useMotionPrefs()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 16, mass: 0.9 })
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 16, mass: 0.9 })
  const inverseX = useTransform(smoothX, (value) => value * -0.65)
  const inverseY = useTransform(smoothY, (value) => value * -0.65)

  useEffect(() => {
    setMounted(true)
    if (!enableParallax) return

    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 24
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 24
      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableParallax, mouseX, mouseY])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme !== 'light'
  const floatDuration = isMobile ? 20 : 24
  const orbDuration = isMobile ? 18 : 15

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top, rgba(6,182,212,0.12), transparent 28%), radial-gradient(circle at 90% 20%, rgba(59,130,246,0.14), transparent 22%), linear-gradient(180deg, rgba(2,6,23,0.98), rgba(2,6,23,0.92) 42%, rgba(8,12,28,0.96))'
            : 'radial-gradient(circle at top, rgba(239,246,255,0.85), transparent 32%), radial-gradient(circle at 82% 18%, rgba(147,197,253,0.18), transparent 24%), linear-gradient(180deg, rgba(248,250,252,0.98), rgba(248,250,252,0.94) 42%, rgba(241,245,249,0.98))',
        }}
      />

      <motion.div
        className="absolute inset-[-10%] opacity-80 will-change-transform"
        style={{
          x: enableParallax ? smoothX : 0,
          y: enableParallax ? smoothY : 0,
          background: isDark
            ? 'radial-gradient(circle at 18% 24%, rgba(6,182,212,0.16), transparent 18%), radial-gradient(circle at 84% 16%, rgba(59,130,246,0.14), transparent 20%), radial-gradient(circle at 52% 74%, rgba(139,92,246,0.08), transparent 22%)'
            : 'radial-gradient(circle at 18% 24%, rgba(148,163,184,0.16), transparent 18%), radial-gradient(circle at 84% 16%, rgba(147,197,253,0.14), transparent 20%), radial-gradient(circle at 52% 74%, rgba(255,255,255,0.2), transparent 22%)',
        }}
        animate={shouldAnimate ? { scale: [1, 1.04, 1], rotate: [0, 1.5, 0, -1.5, 0] } : undefined}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -left-24 top-12 h-[32rem] w-[32rem] rounded-full opacity-70 will-change-transform"
        style={{
          x: enableParallax ? smoothX : 0,
          y: enableParallax ? smoothY : 0,
          background: isDark ? 'rgba(6, 182, 212, 0.14)' : 'rgba(147, 197, 253, 0.18)',
        }}
        animate={shouldAnimate ? { y: [0, -14, 0], x: [0, 16, 0] } : undefined}
        transition={{ duration: orbDuration, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-[-8rem] top-[-4rem] h-[26rem] w-[26rem] rounded-full opacity-70 will-change-transform"
        style={{
          x: enableParallax ? inverseX : 0,
          y: enableParallax ? inverseY : 0,
          background: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.42)',
        }}
        animate={shouldAnimate ? { y: [0, 22, 0], x: [0, -12, 0] } : undefined}
        transition={{ duration: orbDuration + 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient floating orbs — no blur recalc on scroll */}
      {shouldAnimate && (
        <>
          <motion.div
            className="absolute left-[12%] bottom-[18%] h-3 w-3 rounded-full bg-cyan-400/40 dark:bg-cyan-300/30"
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[18%] top-[38%] h-2 w-2 rounded-full bg-indigo-400/35"
            animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.22) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(circle at center, black 32%, transparent 86%)',
        }}
      />

      <motion.div
        className="absolute inset-y-0 left-[-10%] w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] will-change-transform"
        animate={shouldAnimate ? { x: ['0%', '120%'] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_12%,rgba(2,6,23,0.22)_100%)]" />
    </div>
  )
}
