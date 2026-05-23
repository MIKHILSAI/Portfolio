'use client'

import { motion } from 'framer-motion'
import { VIEWPORT_REVEAL, REVEAL_TRANSITION } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

interface SkillProgressBarProps {
  level: number
  delay?: number
}

export function SkillProgressBar({ level, delay = 0 }: SkillProgressBarProps) {
  const { shouldAnimate, isMobile } = useMotionPrefs()

  return (
    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
      {shouldAnimate ? (
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-primary dark:to-secondary rounded-full origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ ...REVEAL_TRANSITION, duration: isMobile ? 0.5 : 0.6, delay }}
        />
      ) : (
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-primary dark:to-secondary rounded-full"
          style={{ width: `${level}%` }}
        />
      )}
    </div>
  )
}
