'use client'

import { motion } from 'framer-motion'

interface ScrollProgressProps {
  progress: number
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )
}
