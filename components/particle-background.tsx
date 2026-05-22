'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  depth: number
  color: string
}

type TrailPoint = {
  x: number
  y: number
  life: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = resolvedTheme !== 'light'
    const isMobile = window.innerWidth < 768
    const particleCount = reducedMotion ? 18 : isMobile ? 34 : 68
    const connectionDistance = isMobile ? 90 : 124
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      active: false,
    }
    const trail: TrailPoint[] = []
    const particles: Particle[] = []
    const colors = isDark
      ? ['226, 232, 240', '148, 163, 184', '129, 140, 248', '96, 165, 250']
      : ['15, 23, 42', '71, 85, 105', '99, 102, 241', '59, 130, 246']

    let animationId = 0
    let fogTime = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seedParticles = () => {
      particles.length = 0
      for (let index = 0; index < particleCount; index += 1) {
        const depth = Math.random() * 1.4 + 0.4
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.22 * depth,
          vy: (Math.random() - 0.5) * 0.22 * depth,
          size: Math.random() * 2.8 + (Math.random() > 0.82 ? 4.5 : 1),
          opacity: Math.random() * 0.2 + (isDark ? 0.05 : 0.04),
          depth,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const drawFog = () => {
      fogTime += 0.0022
      const fogLayers = [
        {
          x: window.innerWidth * 0.18 + Math.sin(fogTime * 0.8) * 30,
          y: window.innerHeight * 0.28 + Math.cos(fogTime) * 24,
          radius: isMobile ? 180 : 260,
          color: isDark ? '99, 102, 241' : '148, 163, 184',
          alpha: isDark ? 0.08 : 0.06,
        },
        {
          x: window.innerWidth * 0.78 + Math.cos(fogTime * 0.7) * 26,
          y: window.innerHeight * 0.22 + Math.sin(fogTime * 1.1) * 22,
          radius: isMobile ? 140 : 220,
          color: isDark ? '96, 165, 250' : '71, 85, 105',
          alpha: isDark ? 0.06 : 0.045,
        },
        {
          x: window.innerWidth * 0.52 + Math.sin(fogTime * 0.45) * 24,
          y: window.innerHeight * 0.78 + Math.cos(fogTime * 0.6) * 18,
          radius: isMobile ? 180 : 280,
          color: isDark ? '226, 232, 240' : '129, 140, 248',
          alpha: isDark ? 0.04 : 0.035,
        },
      ]

      fogLayers.forEach((layer) => {
        const gradient = ctx.createRadialGradient(layer.x, layer.y, 0, layer.x, layer.y, layer.radius)
        gradient.addColorStop(0, `rgba(${layer.color}, ${layer.alpha})`)
        gradient.addColorStop(1, `rgba(${layer.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(layer.x, layer.y, layer.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const drawCursorAura = () => {
      if (!pointer.active && trail.length === 0) return

      trail.forEach((point, index) => {
        const radius = 18 + index * 2.8
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius)
        gradient.addColorStop(0, `rgba(${isDark ? '191, 219, 254' : '99, 102, 241'}, ${point.life * 0.12})`)
        gradient.addColorStop(0.55, `rgba(${isDark ? '129, 140, 248' : '148, 163, 184'}, ${point.life * 0.05})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      if (pointer.active) {
        const glowRadius = isMobile ? 90 : 130
        const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, glowRadius)
        gradient.addColorStop(0, `rgba(${isDark ? '191, 219, 254' : '99, 102, 241'}, 0.16)`)
        gradient.addColorStop(0.42, `rgba(${isDark ? '129, 140, 248' : '148, 163, 184'}, 0.08)`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.active = true
      trail.unshift({ x: event.clientX, y: event.clientY, life: 1 })
      if (trail.length > 12) {
        trail.pop()
      }
    }

    const handleMouseLeave = () => {
      pointer.active = false
    }

    const handleResize = () => {
      resize()
      seedParticles()
    }

    const render = () => {
      animationId = window.requestAnimationFrame(render)
      pointer.x += (pointer.targetX - pointer.x) * (reducedMotion ? 0.06 : 0.12)
      pointer.y += (pointer.targetY - pointer.y) * (reducedMotion ? 0.06 : 0.12)

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      drawFog()
      drawCursorAura()

      particles.forEach((particle, index) => {
        const parallaxX = pointer.active ? ((pointer.x / window.innerWidth) - 0.5) * particle.depth * 10 : 0
        const parallaxY = pointer.active ? ((pointer.y / window.innerHeight) - 0.5) * particle.depth * 10 : 0
        const drawX = particle.x + parallaxX
        const drawY = particle.y + parallaxY

        particle.x += particle.vx
        particle.y += particle.vy

        if (pointer.active && !reducedMotion) {
          const dx = drawX - pointer.x
          const dy = drawY - pointer.y
          const distance = Math.hypot(dx, dy)
          const influence = isMobile ? 72 : 104

          if (distance < influence && distance > 0.01) {
            const force = (influence - distance) / influence
            particle.x += (dx / distance) * force * 1.6 * particle.depth
            particle.y += (dy / distance) * force * 1.6 * particle.depth
          }
        }

        if (particle.x < -60) particle.x = window.innerWidth + 60
        if (particle.x > window.innerWidth + 60) particle.x = -60
        if (particle.y < -60) particle.y = window.innerHeight + 60
        if (particle.y > window.innerHeight + 60) particle.y = -60

        const fill = `rgba(${particle.color}, ${particle.opacity})`
        ctx.fillStyle = fill
        ctx.beginPath()
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2)
        ctx.shadowBlur = particle.size > 3.2 ? particle.size * 8 : 0
        ctx.shadowColor = fill
        ctx.fill()
        ctx.shadowBlur = 0

        for (let innerIndex = index + 1; innerIndex < particles.length; innerIndex += 1) {
          const other = particles[innerIndex]
          const otherX = other.x + (pointer.active ? ((pointer.x / window.innerWidth) - 0.5) * other.depth * 10 : 0)
          const otherY = other.y + (pointer.active ? ((pointer.y / window.innerHeight) - 0.5) * other.depth * 10 : 0)
          const dx = otherX - drawX
          const dy = otherY - drawY
          const distance = Math.hypot(dx, dy)

          if (distance < connectionDistance) {
            const alpha = ((connectionDistance - distance) / connectionDistance) * (isDark ? 0.12 : 0.08)
            ctx.strokeStyle = `rgba(${particle.color}, ${alpha})`
            ctx.lineWidth = other.size > 3 ? 0.7 : 0.45
            ctx.beginPath()
            ctx.moveTo(drawX, drawY)
            ctx.lineTo(otherX, otherY)
            ctx.stroke()
          }
        }
      })

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        trail[index].life -= reducedMotion ? 0.08 : 0.045
        if (trail[index].life <= 0) {
          trail.splice(index, 1)
        }
      }
    }

    resize()
    seedParticles()
    render()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.cancelAnimationFrame(animationId)
    }
  }, [reducedMotion, resolvedTheme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-90" />
}
