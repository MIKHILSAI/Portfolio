'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUpIn } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { cn } from '@/lib/utils'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

/** Single element fade-up. Parent is always a plain div. */
export function Reveal({ className, children, delay = 0, ...props }: RevealProps) {
  const { shouldAnimate } = useMotionPrefs()

  if (!shouldAnimate) {
    return (
      <div className={cn(className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div className={cn(className)} {...fadeUpIn(delay)} {...props}>
      {children}
    </motion.div>
  )
}

/** Layout wrapper only — no motion on parent (prevents hidden children) */
export function StaggerReveal({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn(className)}>{children}</div>
}
