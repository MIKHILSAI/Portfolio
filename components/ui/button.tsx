'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'

import { cn } from '@/lib/utils'
import { hoverScale, tapScale } from '@/lib/motion'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,opacity,box-shadow,background-color] duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive will-change-transform",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_14px_35px_rgba(37,99,235,0.18)] hover:shadow-[0_18px_48px_rgba(37,99,235,0.22)] hover:bg-primary/95',
        destructive:
          'bg-destructive text-white shadow-[0_10px_24px_rgba(248,113,113,0.16)] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-sm border-border hover:shadow-[0_14px_30px_rgba(37,99,235,0.1)] hover:bg-accent/10 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_12px_28px_rgba(99,102,241,0.16)] hover:bg-secondary/85',
        ghost:
          'hover:bg-accent/10 hover:text-accent-foreground dark:hover:bg-accent/20',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  animated = true,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    animated?: boolean
  }) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }

  if (!animated) {
    return (
      <button
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }

  const { onDrag, onDragStart, onDragEnd, ...motionProps } = props as HTMLMotionProps<'button'>

  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={hoverScale}
      whileTap={tapScale}
      {...motionProps}
    />
  )
}

export { Button, buttonVariants }
