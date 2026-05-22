'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function RobotHover() {
  const [hovered, setHovered] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const baseTiltX = useMotionValue(0)
  const baseTiltY = useMotionValue(0)

  const smoothPointerX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.8 })
  const smoothPointerY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.8 })
  const tiltX = useSpring(baseTiltX, { stiffness: 80, damping: 16, mass: 0.6 })
  const tiltY = useSpring(baseTiltY, { stiffness: 80, damping: 16, mass: 0.6 })
  const robotOffsetX = useTransform(smoothPointerX, (value) => value * 14)
  const robotOffsetY = useTransform(smoothPointerY, (value) => value * 10)
  const eyeOffsetX = useTransform(smoothPointerX, (value) => value * 6)
  const eyeOffsetY = useTransform(smoothPointerY, (value) => value * 5)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const viewportX = window.innerWidth / 2
      const viewportY = window.innerHeight / 2
      const normalizedX = (event.clientX - viewportX) / viewportX
      const normalizedY = (event.clientY - viewportY) / viewportY

      pointerX.set(normalizedX)
      pointerY.set(normalizedY)
      baseTiltX.set(normalizedY * -6)
      baseTiltY.set(normalizedX * 8)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [baseTiltX, baseTiltY, pointerX, pointerY])

  return (
    <motion.div
      className="pointer-events-auto absolute left-2 top-1/2 z-20 hidden h-[24rem] w-[18rem] -translate-y-1/2 lg:block xl:left-10"
      style={{
        x: robotOffsetX,
        y: robotOffsetY,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1200,
        willChange: 'transform',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_62%)] blur-3xl"
        animate={{
          scale: hovered ? 1.12 : 1,
          opacity: hovered ? 0.95 : 0.72,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative mx-auto mt-10 h-72 w-72"
        animate={{
          y: [0, -12, 0],
          rotateZ: [0, 1.8, 0, -1.8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-5 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(15,23,42,0.1)_40%,rgba(2,6,23,0.86)_78%)] shadow-[0_0_80px_rgba(99,102,241,0.18)] backdrop-blur-2xl"
          animate={{
            scale: [1, 1.018, 1],
            boxShadow: hovered
              ? [
                  '0 0 80px rgba(99,102,241,0.18)',
                  '0 0 110px rgba(129,140,248,0.34)',
                  '0 0 88px rgba(99,102,241,0.24)',
                ]
              : [
                  '0 0 60px rgba(99,102,241,0.12)',
                  '0 0 85px rgba(129,140,248,0.22)',
                  '0 0 60px rgba(99,102,241,0.12)',
                ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-3 rounded-full border border-white/8" />
          <div className="absolute inset-6 rounded-full border border-blue-200/10" />

          <motion.div
            className="absolute left-1/2 top-[28%] h-16 w-28 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/55 shadow-[0_0_24px_rgba(148,163,184,0.16)] backdrop-blur-xl"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-blue-100 shadow-[0_0_22px_rgba(191,219,254,0.7)]"
              style={{
                x: eyeOffsetX,
                y: eyeOffsetY,
              }}
            />
            <motion.div
              className="absolute right-[28%] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-violet-100 shadow-[0_0_22px_rgba(216,180,254,0.68)]"
              style={{
                x: eyeOffsetX,
                y: eyeOffsetY,
              }}
            />
            <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[57%] h-20 w-20 -translate-x-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(96,165,250,0.12)_32%,rgba(2,6,23,0)_72%)]"
            animate={{
              scale: hovered ? [1, 1.14, 1] : [1, 1.08, 1],
              opacity: hovered ? [0.7, 1, 0.74] : [0.42, 0.76, 0.42],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-x-14 bottom-10 h-10 rounded-full border border-white/10 bg-gradient-to-r from-transparent via-white/6 to-transparent"
            animate={{ opacity: hovered ? [0.28, 0.56, 0.28] : [0.18, 0.32, 0.18] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div
          className="absolute left-8 top-16 h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          animate={{ x: [0, 10, 0], y: [0, -14, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-10 top-8 h-6 w-6 rounded-full bg-blue-300/10 blur-sm"
          animate={{ x: [0, -12, 0], y: [0, 16, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-5 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),rgba(129,140,248,0.14),transparent_72%)] blur-2xl"
          animate={{ scale: hovered ? [0.96, 1.18, 0.96] : [0.94, 1.08, 0.94] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}
