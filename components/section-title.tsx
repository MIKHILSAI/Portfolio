'use client'

import { motion } from 'framer-motion'
import { fadeUpIn } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const { shouldAnimate } = useMotionPrefs()

  if (!shouldAnimate) {
    return (
      <div className="text-center">
        {subtitle && (
          <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="text-4xl md:text-5xl font-bold gradient-text text-balance mb-8 lg:mb-12">
          {title}
        </h2>
      </div>
    )
  }

  return (
    <div className="text-center">
      {subtitle && (
        <motion.p
          className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2"
          {...fadeUpIn(0)}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        className="text-4xl md:text-5xl font-bold gradient-text text-balance mb-8 lg:mb-12"
        {...fadeUpIn(0.06)}
      >
        {title}
      </motion.h2>
    </div>
  )
}
