'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { Award, CheckCircle, ExternalLink } from 'lucide-react'

export default function Certifications() {
  const { ref, inView } = useInView()

  const certs = [
    {
      title: 'NPTEL DBMS',
      issuer: 'NPTEL - IIT Madras',
      description: 'Database Management Systems fundamentals and advanced concepts',
      icon: Award,
      link: 'https://drive.google.com/file/d/1LKjAHBzGevE9Stql62VWoKIt3nA6ZaYr/view?usp=sharing'
    },
    {
      title: 'NPTEL Machine Learning',
      issuer: 'NPTEL - IIT Kanpur',
      description: 'Comprehensive machine learning algorithms and implementations',
      icon: Award,
      link: 'https://drive.google.com/file/d/1WHubV_cazJ3NHvv1mkGb369yeWgBSYR_/view?usp=sharing'
    },
    {
      title: 'NPTEL Python For Data Science',
      issuer: 'NPTEL - IIT Madras',
      description: 'Comprehensive Python-based data science concepts including data analysis, visualization',
      icon: Award,
      link: 'https://drive.google.com/file/d/1SQvGeFx9Hhvk2oodZnprzu1M_ideYiAm/view?usp=sharing'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Certifications" subtitle="Professional Credentials & Training" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-4 mt-8"
        >
          {certs.map((cert, idx) => {
            const Icon = cert.icon
            return (
              <motion.a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4, boxShadow: '0 20px 40px rgba(56,189,248,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="block glass p-6 rounded-xl hover:bg-white/10 hover:border-blue-500/50 dark:hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-primary dark:to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-8 h-8 text-white dark:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors duration-300">{cert.title}</h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-blue-500 dark:text-primary gap-1.5 text-sm font-medium">
                        View Certificate <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-blue-600 dark:text-primary font-semibold mb-2">{cert.issuer}</p>
                    <p className="text-slate-600 dark:text-foreground/70">{cert.description}</p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
