'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'

export function GlobalHeroBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 35, damping: 16, mass: 0.9 })
  const smoothY = useSpring(mouseY, { stiffness: 35, damping: 16, mass: 0.9 })
  const inverseX = useTransform(smoothX, (value) => value * -0.65)
  const inverseY = useTransform(smoothY, (value) => value * -0.65)

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 24
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 24
      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    mediaQuery.addEventListener('change', handleMotionChange)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme !== 'light'

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top, rgba(30,41,59,0.22), transparent 32%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(2,6,23,0.88) 42%, rgba(15,23,42,0.96))'
            : 'radial-gradient(circle at top, rgba(255,255,255,0.85), transparent 30%), linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.92) 44%, rgba(226,232,240,0.95))',
        }}
      />

      <motion.div
        className="absolute inset-[-10%] opacity-80"
        style={{
          x: prefersReducedMotion ? 0 : smoothX,
          y: prefersReducedMotion ? 0 : smoothY,
          background: isDark
            ? 'radial-gradient(circle at 18% 24%, rgba(129,140,248,0.16), transparent 20%), radial-gradient(circle at 84% 16%, rgba(96,165,250,0.14), transparent 22%), radial-gradient(circle at 52% 74%, rgba(226,232,240,0.06), transparent 24%)'
            : 'radial-gradient(circle at 18% 24%, rgba(148,163,184,0.18), transparent 20%), radial-gradient(circle at 84% 16%, rgba(129,140,248,0.12), transparent 22%), radial-gradient(circle at 52% 74%, rgba(255,255,255,0.18), transparent 24%)',
        }}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -left-24 top-12 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{
          x: prefersReducedMotion ? 0 : smoothX,
          y: prefersReducedMotion ? 0 : smoothY,
          background: isDark ? 'rgba(99, 102, 241, 0.14)' : 'rgba(148, 163, 184, 0.18)',
        }}
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-[-8rem] top-[-4rem] h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          x: prefersReducedMotion ? 0 : inverseX,
          y: prefersReducedMotion ? 0 : inverseY,
          background: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(255, 255, 255, 0.42)',
        }}
        animate={prefersReducedMotion ? undefined : { y: [0, 28, 0], x: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

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
        className="absolute inset-y-0 left-[-10%] w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: ['0%', '120%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_12%,rgba(2,6,23,0.22)_100%)]" />
    </div>
  )
}
