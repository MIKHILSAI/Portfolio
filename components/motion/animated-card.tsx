'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUpIn, cardHoverLift, cardHoverLiftSubtle, tapScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { cn } from '@/lib/utils'

type AnimatedCardProps = HTMLMotionProps<'div'> & {
  subtle?: boolean
  disableHover?: boolean
  delay?: number
}

const MOTION_KEYS = new Set([
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'whileInView',
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'viewport',
  'layout',
  'layoutId',
  'custom',
])

function splitProps(props: HTMLMotionProps<'div'>) {
  const motionProps: Record<string, unknown> = {}
  const domProps: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (MOTION_KEYS.has(key) || key.startsWith('while')) {
      motionProps[key] = value
    } else {
      domProps[key] = value
    }
  }
  return { motionProps, domProps }
}

export function AnimatedCard({
  className,
  subtle = false,
  disableHover = false,
  delay = 0,
  children,
  ...props
}: AnimatedCardProps) {
  const { shouldAnimate } = useMotionPrefs()
  const { motionProps, domProps } = splitProps(props)

  const hover =
    !disableHover && shouldAnimate
      ? { whileHover: subtle ? cardHoverLiftSubtle : cardHoverLift }
      : {}

  if (!shouldAnimate) {
    return (
      <div className={cn(className)} {...(domProps as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      {...fadeUpIn(delay)}
      {...(domProps as HTMLMotionProps<'div'>)}
      {...(motionProps as HTMLMotionProps<'div'>)}
      whileTap={tapScale}
      {...hover}
    >
      {children}
    </motion.div>
  )
}
