'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Magnetic from './magnetic'

interface ProjectCardProps {
  project: {
    title: string
    description: string
    tech: string[]
    github: string
    live: string
    featured?: boolean
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative glass rounded-xl overflow-hidden h-full transition-all duration-300 hover:bg-white/10 hover:shadow-[0_20px_80px_rgba(56,189,248,0.12)] ${
        project.featured ? 'md:col-span-1 ring-1 ring-primary/50' : ''
      }`}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setSpotlight({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          active: true,
        })
      }}
      onMouseLeave={() => setSpotlight((current) => ({ ...current, active: false }))}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(148, 163, 184, 0.18), rgba(99, 102, 241, 0.08) 22%, transparent 56%)`,
        }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,rgba(129,140,248,0.06)_72%,transparent)] transition-opacity duration-300" />

      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              {project.featured && (
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/20 text-primary font-semibold">
                  Featured
                </span>
              )}
            </div>
          </div>
          <p className="text-foreground/70 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-foreground/70 hover:border-accent/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-6 border-t border-white/10">
          <Magnetic className="flex-1" strength={12} rotation={4}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              Code
            </motion.a>
          </Magnetic>
          <Magnetic className="flex-1" strength={12} rotation={4}>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Live
            </motion.a>
          </Magnetic>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-left duration-500" />
    </motion.div>
  )
}
