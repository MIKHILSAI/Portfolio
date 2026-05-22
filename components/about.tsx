'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { Brain, Zap, Target } from 'lucide-react'

export default function About() {
  const { ref, inView } = useInView()

  const features = [
    {
      icon: Brain,
      title: 'AI & ML Enthusiast',
      description: 'Passionate about building intelligent systems and solving complex problems with machine learning',
    },
    {
      icon: Zap,
      title: 'Problem Solver',
      description: 'Strong analytical thinking and ability to break down complex challenges into elegant solutions',
    },
    {
      icon: Target,
      title: 'Real-World Impact',
      description: 'Experience building and deploying production systems through hackathons and professional projects',
    },
  ]

  const premiumEase = [0.22, 1, 0.36, 1]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
        ease: premiumEase,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: premiumEase },
    },
  }

  const cardsVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: premiumEase },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  }

  return (
    <section id="about" className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="About Me" subtitle="The Human Behind the Code" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 items-center mt-8"
        >
          {/* Text Content */}
          <motion.div variants={textVariants} className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              I&apos;m a Computer Science student with a deep passion for AI, machine learning, and building 
              scalable systems that solve real-world problems. My journey has taken me from competitive programming 
              to deploying production ML models.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              What drives me is the intersection of elegant code and meaningful impact. Whether it&apos;s optimizing 
              energy consumption with AI or detecting deepfakes using computer vision, I&apos;m always pushing boundaries.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Beyond coding, I love collaborating with teams, participating in hackathons, and contributing to 
              published research that advances the field.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={cardsVariants}
            className="space-y-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  variants={statVariants}
                  className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-foreground/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-center"
        >
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '10+', label: 'Projects Built' },
            { number: '4', label: 'Hackathon Wins' },
            { number: '100%', label: 'Passion' },
          ].map((stat, i) => (
            <motion.div key={i} variants={statVariants} className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
