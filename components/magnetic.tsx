'use client'

import { type HTMLAttributes, type MouseEvent, type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  strength?: number
  rotation?: number
}

export default function Magnetic({
  children,
  className,
  strength = 18,
  rotation = 8,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 })
  const smoothY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 })
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.5 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.5 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    x.set((offsetX / rect.width) * strength)
    y.set((offsetY / rect.height) * strength)
    rotateX.set((-offsetY / rect.height) * rotation)
    rotateY.set((offsetX / rect.width) * rotation)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}
