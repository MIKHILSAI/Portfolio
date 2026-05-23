'use client'

import { motion } from 'framer-motion'
import SectionTitle from './section-title'
import { Trophy, Medal, Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { fadeUpIn, cardHoverLift, tapScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { StaggerReveal, Reveal } from '@/components/motion/reveal'

export default function Achievements() {
  const { shouldAnimate } = useMotionPrefs()
  const reveal = (delay: number) => (shouldAnimate ? fadeUpIn(delay) : {})

  const achievements = [
    {
      icon: Trophy,
      title: '1st Place',
      event: 'Yuva AI Thon',
      description: 'Climate AI Innovation',
      color: 'from-yellow-500 to-orange-500',
      image: '/YuvaAIThon.jpg',
      link: 'https://drive.google.com/file/d/1ENuIrNW0Blx1BTX_Yn3uJghRJ1sif0hc/view',
    },
    {
      icon: Medal,
      title: '2nd Place',
      event: 'CREONIX Hackathon',
      description: 'Nokia Network Optimization',
      color: 'from-slate-400 to-gray-500',
      image: '/CREONIX.jpeg',
      link: 'https://drive.google.com/file/d/1A7SfrGmX1mDoLv_PwcTBKlYwUap-NaZA/view',
    },
    {
      icon: Trophy,
      title: '1st Place',
      event: 'VEXORA',
      description: 'Deepfake Detection AI',
      color: 'from-yellow-500 to-orange-500',
      image: '/VEXORA.jpeg',
      link: 'https://drive.google.com/file/d/10OJJNwURFt9Lm8GVSrssiQKSUWi9K2XH/view',
    },
    {
      icon: Star,
      title: '4th Place',
      event: 'RedShield Hackathon',
      description: 'Cybersecurity Innovation',
      color: 'from-purple-500 to-pink-500',
      image: '/RedShield.png',
      link: 'https://drive.google.com/file/d/14IMYvucQhgufhc5b8uukgJnpjMAESPJg/view',
    },
  ]

  return (
    <section className="relative w-full py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <SectionTitle title="Achievements & Awards" subtitle="Recognition & Accomplishments" />

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon
            const content = (
              <>
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                />
                <div className="relative glass p-5 rounded-xl text-center h-full flex flex-col items-center justify-start hover:bg-white/10 dark:hover:bg-white/5 transition-colors duration-300 hover:border-blue-500/50 dark:hover:border-primary/50">
                  <div className="relative w-full aspect-[4/3] mb-5 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                    <Image
                      src={achievement.image}
                      alt={`${achievement.event} achievement`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <Icon className="w-8 h-8 mb-3 text-slate-800 dark:text-white" />
                  <p className="font-bold text-lg text-foreground mb-1">{achievement.title}</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-primary mb-1">{achievement.event}</p>
                  <p className="text-xs text-slate-600 dark:text-foreground/60">{achievement.description}</p>
                </div>
              </>
            )

            return shouldAnimate ? (
              <motion.a
                key={idx}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block focus:outline-none"
                {...reveal(idx * 0.08)}
                whileHover={cardHoverLift}
                whileTap={tapScale}
              >
                {content}
              </motion.a>
            ) : (
              <a
                key={idx}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block focus:outline-none"
              >
                {content}
              </a>
            )
          })}
        </StaggerReveal>

        <Reveal className="mt-8 lg:mt-10 glass p-6 rounded-xl">
          <p className="text-center text-slate-700 dark:text-foreground/80 text-lg">
            Consistently recognized for excellence in AI innovation, problem-solving, and full-stack development
            across{' '}
            <span className="text-blue-600 dark:text-primary font-semibold">
              national and regional hackathons
            </span>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
