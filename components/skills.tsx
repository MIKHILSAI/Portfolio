'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'

export default function Skills() {
  const { ref, inView } = useInView()

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 95 },
        { name: 'TypeScript', level: 92 },
        { name: 'Tailwind CSS', level: 98 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 88 },
        { name: 'Python', level: 92 },
        { name: 'Java', level: 85 },
      ],
    },
    {
      title: 'AI & ML',
      skills: [
        { name: 'Machine Learning', level: 90 },
        { name: 'Computer Vision', level: 88 },
        { name: 'Data Analysis', level: 87 },
        { name: 'Deep Learning', level: 85 },
      ],
    },
    {
      title: 'Databases',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 90 },
        { name: 'SQLite', level: 88 },
      ],
    },
  ]

  const softSkills = [
    'Problem Solving',
    'Analytical Thinking',
    'Team Collaboration',
    'Quick Learner',
    'Leadership',
    'Communication',
  ]

  const premiumEase = [0.22, 1, 0.36, 1]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        ease: premiumEase,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  }

  return (
    <section id="skills" className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Skills & Expertise" subtitle="Tools, Technologies & Abilities" />

        {/* Technical Skills */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 mt-8 mb-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_20px_60px_rgba(56,189,248,0.12)]"
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-primary mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-800 dark:text-foreground font-medium">{skill.name}</span>
                      <span className="text-slate-600 dark:text-foreground/60 text-sm">{skill.level}%</span>
                    </div>
                    <motion.div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-primary dark:to-secondary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] dark:glow"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.1,
                          delay: 0.1 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="glass p-6 rounded-xl mt-8"
        >
          <h3 className="text-xl font-semibold text-purple-600 dark:text-secondary mb-6">Soft Skills & Attributes</h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {softSkills.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-3 rounded-lg bg-white border border-slate-200 dark:bg-white/5 dark:border-accent/30 text-center text-slate-700 dark:text-foreground hover:border-blue-500 dark:hover:border-accent hover:shadow-[0_4px_14px_0_rgba(59,130,246,0.1)] dark:hover:shadow-none transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
