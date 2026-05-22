'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import ProjectCard from './project-card'
import { Github, ExternalLink } from 'lucide-react'
import Magnetic from './magnetic'

export default function Projects() {
  const { ref, inView } = useInView()

  const projects = [
    {
      title: 'CrimeRadar AI',
      description: 'AI-based crime prediction & hotspot analysis system using machine learning algorithms to identify high-risk areas and predict crime patterns.',
      tech: ['Python', 'Flask', 'SQLite', 'Machine Learning'],
      github: 'https://github.com/MIKHILSAI/Crime-Detection',
      live: 'https://github.com/MIKHILSAI/Crime-Detection',
      featured: true,
    },
    {
      title: 'EcoWattAI',
      description: 'AI energy optimization platform leveraging machine learning models and interactive dashboards for real-time energy consumption monitoring.',
      tech: ['React', 'Node.js', 'Machine Learning', 'Data Analysis'],
      github: 'https://github.com/MIKHILSAI/Ecowatt-AI',
      live: 'https://github.com/MIKHILSAI/Ecowatt-AI',
      featured: true,
    },
    {
      title: 'Nokia OptiFlow',
      description: 'Network optimization system delivering real-time efficiency improvements using advanced algorithms for telecommunication networks.',
      tech: ['React', 'Node.js', 'Machine Learning', 'Data Analysis'],
      github: 'https://github.com/MIKHILSAI/Nokia-Optiflow',
      live: 'https://github.com/MIKHILSAI/Nokia-Optiflow',
      featured: true,
    },
    {
      title: 'S.H.A.D.O.W',
      description: 'Multi-modal AI deepfake detection system combining computer vision and audio analysis for robust fake content identification.',
      tech: ['PyTorch', 'OpenCV', 'FastAPI', 'React'],
      github: 'https://github.com/MIKHILSAI/Deep-Fake-Detection',
      live: 'https://github.com/MIKHILSAI/Deep-Fake-Detection',
    },
    {
      title: 'Smart Wildlife System',
      description: 'IoT-powered AI farm protection system using computer vision to detect wildlife intrusions and alert farmers in real-time.',
      tech: ['Python', 'React', 'IoT', 'Machine Learning'],
      github: 'https://github.com/MIKHILSAI/WildLife-Intrution',
      live: 'https://github.com/MIKHILSAI/WildLife-Intrution',
    },
    {
      title: 'Web-based LMS',
      description: 'Platform for browsing/enrolling in courses and instructor-led course creation/upload. Uses Cloudinary for media.',
      tech: ['Python', 'Cloudinary', 'Web Development', 'JavaScript'],
      github: 'https://github.com/MIKHILSAI/Learning-Management-System',
      live: 'https://github.com/MIKHILSAI/Learning-Management-System',
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

  return (
    <section id="projects" className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Featured Projects" subtitle="Showcasing AI & Full Stack Solutions" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-5 mt-8"
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              index={idx}
            />
          ))}
        </motion.div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Magnetic className="inline-block" strength={14} rotation={5}>
            <motion.a
              href="https://github.com/MIKHILSAI"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass hover:bg-white/10 text-primary font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={20} />
              View More on GitHub
              <ExternalLink size={16} />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
