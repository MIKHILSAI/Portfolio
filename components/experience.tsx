'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { Briefcase, Code, Users } from 'lucide-react'

export default function Experience() {
  const { ref, inView } = useInView()

  const experiences = [
    {
      icon: Briefcase,
      role: 'R&D Intern',
      company: 'MIT Square',
      period: '2024 - Present',
      description: 'Researching and developing AI-powered solutions for real-world problems. Contributing to cutting-edge projects in machine learning.',
    },
    {
      icon: Code,
      role: 'Content Creator',
      company: 'CodeKrafters',
      period: '2023 - 2024',
      description: 'Created educational content on web development, AI, and full-stack engineering. Reached thousands of learners worldwide.',
    },
    {
      icon: Users,
      role: 'HR Intern',
      company: 'BigRock Exchange',
      period: '2022 - 2023',
      description: 'Coordinated talent acquisition and contributed to HR tech initiatives. Improved hiring processes through data-driven insights.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  }

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  }

  const cardVariants = {
    hidden: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'left' ? -50 : 50,
    }),
    visible: (direction: 'left' | 'right') => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    }),
  }

  return (
    <section id="experience" className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Experience" subtitle="Professional Journey & Internships" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6 mt-8 relative"
        >
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-50"
            variants={lineVariants}
          />

          {experiences.map((exp, idx) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                custom={idx % 2 === 0 ? 'left' : 'right'}
                className="relative md:pl-32"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-6 md:left-3 top-2 w-12 h-12 glass rounded-full flex items-center justify-center border-2 border-primary"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Content */}
                <motion.div
                  className="glass p-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground/60 px-4 py-2 bg-white/5 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">{exp.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
