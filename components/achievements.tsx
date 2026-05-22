'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { Trophy, Medal, Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function Achievements() {
  const { ref, inView } = useInView()

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  }

  return (
    <section className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Achievements & Awards" subtitle="Recognition & Accomplishments" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        >
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon
            return (
              <motion.a
                key={idx}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                className="relative group cursor-pointer transition-all duration-300 block focus:outline-none"
              >
                {/* Glowing background */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                <div className="relative glass p-5 rounded-xl text-center h-full flex flex-col items-center justify-start hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 hover:border-blue-500/50 dark:hover:border-primary/50 hover:shadow-[0_25px_50px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_25px_80px_rgba(56,189,248,0.12)]">
                  
                  {/* Floating Action Badge on Hover */}
                  <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <div className="flex items-center gap-1.5 bg-blue-600 dark:bg-primary text-white dark:text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold">
                      View Proof <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Image container */}
                  <div className="relative w-full aspect-[4/3] mb-5 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 dark:shadow-none shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={achievement.image}
                      alt={`${achievement.event} achievement`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    {/* Inner image dark gradient overlay for hover text contrast if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <Icon className={`w-8 h-8 mb-3 text-slate-800 dark:text-white group-hover:scale-110 transition-transform duration-300`} />
                  <p className="font-bold text-lg text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-primary transition-colors">{achievement.title}</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-primary mb-1">{achievement.event}</p>
                  <p className="text-xs text-slate-600 dark:text-foreground/60">{achievement.description}</p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Highlight Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass p-6 rounded-xl"
        >
          <p className="text-center text-slate-700 dark:text-foreground/80 text-lg">
            Consistently recognized for excellence in AI innovation, problem-solving, and full-stack development across 
            <span className="text-blue-600 dark:text-primary font-semibold"> national and regional hackathons</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
