'use client'

import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768
const LARGE_BREAKPOINT = 1024

export function useMotionPrefs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const largeQuery = window.matchMedia(`(min-width: ${LARGE_BREAKPOINT}px)`)

    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches)
    const updateMobile = () => setIsMobile(mobileQuery.matches)
    const updateLarge = () => setIsLargeScreen(largeQuery.matches)

    updateMotion()
    updateMobile()
    updateLarge()

    motionQuery.addEventListener('change', updateMotion)
    mobileQuery.addEventListener('change', updateMobile)
    largeQuery.addEventListener('change', updateLarge)

    return () => {
      motionQuery.removeEventListener('change', updateMotion)
      mobileQuery.removeEventListener('change', updateMobile)
      largeQuery.removeEventListener('change', updateLarge)
    }
  }, [])

  // Never gate visibility on mount — only gate motion enhancements
  const shouldAnimate = !prefersReducedMotion
  const enableParallax = mounted && shouldAnimate && isLargeScreen

  return {
    mounted,
    prefersReducedMotion,
    isMobile,
    isLargeScreen,
    shouldAnimate,
    enableParallax,
  }
}
