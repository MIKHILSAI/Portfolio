'use client'

import { motion } from 'framer-motion'
import SectionTitle from './section-title'
import { Award, ExternalLink } from 'lucide-react'
import { fadeUpIn, cardHoverLift, tapScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { StaggerReveal } from '@/components/motion/reveal'

export default function Certifications() {
  const { shouldAnimate } = useMotionPrefs()
  const reveal = (delay: number) => (shouldAnimate ? fadeUpIn(delay) : {})

  const certs = [
    {
      title: 'NPTEL DBMS',
      issuer: 'NPTEL - IIT Madras',
      description: 'Database Management Systems fundamentals and advanced concepts',
      icon: Award,
      link: 'https://drive.google.com/file/d/1LKjAHBzGevE9Stql62VWoKIt3nA6ZaYr/view?usp=sharing',
    },
    {
      title: 'NPTEL Machine Learning',
      issuer: 'NPTEL - IIT Kanpur',
      description: 'Comprehensive machine learning algorithms and implementations',
      icon: Award,
      link: 'https://drive.google.com/file/d/1WHubV_cazJ3NHvv1mkGb369yeWgBSYR_/view?usp=sharing',
    },
    {
      title: 'NPTEL Python For Data Science',
      issuer: 'NPTEL - IIT Madras',
      description:
        'Comprehensive Python-based data science concepts including data analysis, visualization',
      icon: Award,
      link: 'https://drive.google.com/file/d/1SQvGeFx9Hhvk2oodZnprzu1M_ideYiAm/view?usp=sharing',
    },
  ]

  return (
    <section className="relative w-full py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <SectionTitle title="Certifications" subtitle="Professional Credentials & Training" />

        <StaggerReveal className="space-y-6 lg:space-y-8">
          {certs.map((cert, idx) => {
            const Icon = cert.icon
            const inner = (
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-primary dark:to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-8 h-8 text-white dark:text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-primary font-semibold mb-2">{cert.issuer}</p>
                  <p className="text-slate-600 dark:text-foreground/70">{cert.description}</p>
                </div>
                <div className="hidden sm:flex items-center text-blue-500 dark:text-primary gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Certificate <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            )

            return shouldAnimate ? (
              <motion.a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass p-6 rounded-xl hover:bg-white/10 hover:border-blue-500/50 dark:hover:border-primary/50 transition-colors group"
                {...reveal(idx * 0.1)}
                whileHover={cardHoverLift}
                whileTap={tapScale}
              >
                {inner}
              </motion.a>
            ) : (
              <a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass p-6 rounded-xl hover:bg-white/10 transition-colors group"
              >
                {inner}
              </a>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
