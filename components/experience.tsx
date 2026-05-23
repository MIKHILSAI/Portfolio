'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionTitle from './section-title'
import { fadeFromX, cardHoverLiftSubtle } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import type { LucideIcon } from 'lucide-react'
import { Briefcase, Code, Users } from 'lucide-react'

interface ExperienceItem {
  icon: LucideIcon
  role: string
  company: string
  period: string
  description: string
}

const experiences: ExperienceItem[] = [
  
  {
    icon: Users,
    role: 'HR Intern',
    company: 'BigRock Exchange',
    period: '2025 Jan – 2025 May',
    description:
      'Supported recruitment operations and helped craft data-driven hiring workflows for a growing technology team.',
  },
  {
    icon: Briefcase,
    role: 'R&D Intern',
    company: 'MIT Square',
    period: 'Sep 2024 – Dec 2024',
    description:
      'Researched AI-driven solutions and built production-ready prototypes with clean, data-informed user experiences.',
  },
  {
    icon: Code,
    role: 'Content Creator',
    company: 'CodeKrafters',
    period: '2023 – 2024',
    description:
      'Produced polished developer-focused content on web engineering, product design, and modern tooling for thousands of learners.',
  },
]

const cardClassName =
  'w-full max-w-[520px] rounded-[28px] border bg-white/90 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl text-slate-900 border-slate-200/70 dark:bg-slate-950/80 dark:border-slate-800/60 dark:shadow-[0_24px_100px_rgba(15,23,42,0.16)] dark:text-white'

const mobileCardClassName =
  'relative z-20 w-full max-w-[420px] rounded-[24px] border border-slate-200/70 bg-white/90 p-4 text-slate-900 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 dark:text-white dark:shadow-[0_18px_60px_rgba(15,23,42,0.14)]'

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { shouldAnimate } = useMotionPrefs()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'end 20%'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 })
  const lineOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0.08, 0.6, 1])

  const node0Progress = useTransform(smoothProgress, [0.05, 0.28, 0.42], [0, 0.8, 1])
  const node1Progress = useTransform(smoothProgress, [0.26, 0.50, 0.66], [0, 0.8, 1])
  const node2Progress = useTransform(smoothProgress, [0.52, 0.74, 0.9], [0, 0.8, 1])

  const node0Scale = useTransform(node0Progress, [0, 1], [0.88, 1.05])
  const node1Scale = useTransform(node1Progress, [0, 1], [0.88, 1.05])
  const node2Scale = useTransform(node2Progress, [0, 1], [0.88, 1.05])
  const node0Opacity = useTransform(node0Progress, [0, 0.5, 1], [0.24, 0.72, 1])
  const node1Opacity = useTransform(node1Progress, [0, 0.5, 1], [0.24, 0.72, 1])
  const node2Opacity = useTransform(node2Progress, [0, 0.5, 1], [0.24, 0.72, 1])
  const node0Glow = useTransform(node0Progress, [0, 1], ['0 0 0px transparent', '0 0 28px rgba(6,182,212,0.32)'])
  const node1Glow = useTransform(node1Progress, [0, 1], ['0 0 0px transparent', '0 0 28px rgba(6,182,212,0.32)'])
  const node2Glow = useTransform(node2Progress, [0, 1], ['0 0 0px transparent', '0 0 28px rgba(6,182,212,0.32)'])

  const nodeStyles = [
    { opacity: node0Opacity, scale: node0Scale, boxShadow: node0Glow },
    { opacity: node1Opacity, scale: node1Scale, boxShadow: node1Glow },
    { opacity: node2Opacity, scale: node2Scale, boxShadow: node2Glow },
  ]

  const cardReveal = (isLeft: boolean, index: number) =>
    shouldAnimate ? fadeFromX(isLeft ? -30 : 30, index * 0.08) : {}

  function ExperienceCardContent({
    experience,
    Icon,
    compact,
  }: {
    experience: ExperienceItem
    Icon: LucideIcon
    compact?: boolean
  }) {
    return (
      <>
        <div
          className={
            compact
              ? 'mb-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4'
              : 'mb-6 flex items-start gap-5'
          }
        >
          <div
            className={
              compact
                ? 'flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800 dark:text-white dark:ring-slate-700/60'
                : 'flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/70 dark:bg-gradient-to-br dark:from-sky-500 dark:to-cyan-400 dark:text-white dark:shadow-cyan-500/20'
            }
          >
            <Icon className={compact ? 'h-4 w-4' : 'h-6 w-6'} />
          </div>
          <div className="space-y-1 sm:space-y-2 flex-1">
            <h3 className={`font-semibold text-slate-900 dark:text-white ${compact ? 'text-xl' : 'text-2xl'}`}>
              {experience.company}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-cyan-300/90">{experience.role}</p>
          </div>
          <span className={`experience-pill ml-auto flex-shrink-0 ${compact ? '' : 'relative overflow-hidden'}`}>
            {experience.period}
          </span>
        </div>
        <p className={`text-slate-600 dark:text-slate-300 ${compact ? 'text-sm leading-6' : 'text-base leading-7'}`}>
          {experience.description}
        </p>
      </>
    )
  }

  return (
    <section id="experience" ref={sectionRef} className="relative w-full py-10 md:py-14 bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 dark:hidden bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_80%_78%,rgba(59,130,246,0.08),transparent_18%)]" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <SectionTitle title="Experience" subtitle="Professional Journey & Internships" />

        <div className="relative mt-12 lg:mt-16">
          <div className="hidden md:block">
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[6px]">
              <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-[6px] rounded-full bg-slate-200/70 shadow-inner shadow-slate-200/40 dark:bg-slate-950/90 dark:shadow-slate-950/20" />
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[6px] rounded-full z-10 bg-gradient-to-b from-cyan-400/90 via-sky-400/75 to-cyan-500/80"
                style={{
                  scaleY: smoothProgress,
                  opacity: lineOpacity,
                  boxShadow: '0 0 38px rgba(6,182,212,0.24)',
                  transformOrigin: 'top',
                }}
              />
            </div>

            <div className="relative flex flex-col gap-10 py-6">
              {experiences.map((experience, index) => {
                const Icon = experience.icon
                const isLeft = index % 2 === 0
                const nodeStyle = nodeStyles[index]
                const reveal = cardReveal(isLeft, index)

                const desktopCard = shouldAnimate ? (
                  <motion.article
                    className={cardClassName}
                    {...reveal}
                    whileHover={cardHoverLiftSubtle}
                  >
                    <ExperienceCardContent experience={experience} Icon={Icon} />
                  </motion.article>
                ) : (
                  <article className={cardClassName}>
                    <ExperienceCardContent experience={experience} Icon={Icon} />
                  </article>
                )

                return (
                  <div key={experience.company} className="relative">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                      <div className="flex justify-end">{isLeft ? desktopCard : null}</div>
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-white/90 ring-1 ring-slate-200/70 dark:bg-slate-100/10 dark:ring-slate-300/10" />
                        </div>
                        <motion.div
                          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_10px_28px_rgba(37,99,235,0.14)] ring-1 ring-slate-200/70 dark:bg-gradient-to-br dark:from-cyan-400 dark:to-sky-500 dark:text-white dark:shadow-[0_0_34px_rgba(6,182,212,0.32)]"
                          style={nodeStyle}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                      </div>
                      <div className="flex justify-start">{!isLeft ? desktopCard : null}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="md:hidden relative mt-6">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              {experiences.map((_, i) => (
                <div key={`seg-${i}`} className="flex flex-col items-center">
                  <div className="w-[2px] h-2 bg-transparent" />
                  {i < experiences.length - 1 && (
                    <div className="w-[2px] h-[56px] bg-slate-300/55 dark:bg-slate-700/20 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            <div className="relative flex flex-col gap-10 py-6">
              {experiences.map((experience, index) => {
                const Icon = experience.icon
                const reveal = cardReveal(true, index)
                return (
                  <div key={experience.company} className="relative flex flex-col items-center gap-6">
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_8px_22px_rgba(37,99,235,0.14)] ring-1 ring-slate-200/70 dark:bg-slate-100/15 dark:text-white dark:shadow-[0_0_28px_rgba(6,182,212,0.24)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    {shouldAnimate ? (
                      <motion.article
                        className={mobileCardClassName}
                        {...reveal}
                        whileHover={cardHoverLiftSubtle}
                      >
                        <ExperienceCardContent experience={experience} Icon={Icon} compact />
                      </motion.article>
                    ) : (
                      <article className={mobileCardClassName}>
                        <ExperienceCardContent experience={experience} Icon={Icon} compact />
                      </article>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
