import type { Transition, Variants } from 'framer-motion'

/** Premium cubic-bezier used across the portfolio */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.35,
  normal: 0.55,
  slow: 0.72,
  hero: 0.76,
} as const

export const STAGGER = {
  tight: 0.08,
  normal: 0.12,
  relaxed: 0.16,
  hero: 0.14,
} as const

/** Stable viewport — content must remain visible if this never fires */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0.15,
} as const

export const VIEWPORT_SAFE = VIEWPORT_REVEAL
export const VIEWPORT_DEFAULT = VIEWPORT_REVEAL

export const REVEAL_TRANSITION: Transition = {
  duration: 0.6,
  ease: 'easeOut',
}

/** Fade-up on mount — hero / above-the-fold only */
export function fadeUpOnMount(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { ...REVEAL_TRANSITION, delay },
  } as const
}

/** Fade-up on scroll — use on individual elements only, never parent wrappers */
export function fadeUpIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_REVEAL,
    transition: { ...REVEAL_TRANSITION, delay },
  } as const
}

/** Fade from horizontal offset on scroll */
export function fadeFromX(x: number, delay = 0) {
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT_REVEAL,
    transition: { ...REVEAL_TRANSITION, delay },
  } as const
}

export function transition(
  duration = DURATION.normal,
  delay = 0,
  ease: readonly number[] | string = EASE_PREMIUM,
): Transition {
  return {
    duration,
    delay,
    ease: typeof ease === 'string' ? ease : [...ease],
  }
}

export function staggerTransition(
  staggerChildren = STAGGER.normal,
  delayChildren = 0,
): Transition {
  return {
    staggerChildren,
    delayChildren,
    ease: [...EASE_PREMIUM],
  }
}

export const cardHoverLift = {
  y: -6,
  scale: 1.012,
  transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
}

export const cardHoverLiftSubtle = {
  y: -4,
  scale: 1.008,
  transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
}

export const tapScale = { scale: 0.97 }
export const hoverScale = { scale: 1.03, y: -1 }

export const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
}

export const scrollIndicatorAnimation = {
  y: [0, 10, 0],
  opacity: [0.7, 1, 0.7],
  transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
}

export const shimmerKeyframes = {
  x: ['-120%', '220%'],
  transition: { duration: 1.1, ease: 'easeInOut' as const },
}

/** @deprecated Use fadeUpIn on children instead */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition(DURATION.slow),
  },
}

export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transition(DURATION.slow),
  },
}
