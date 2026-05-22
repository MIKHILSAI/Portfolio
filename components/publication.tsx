'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { BookOpen, Copyright, ExternalLink, FileText, Award } from 'lucide-react'

export default function Publication() {
  const { ref, inView } = useInView()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const tagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Research & Publication" subtitle="Contributing to the AI & Blockchain Field" />

        <motion.div
          ref={ref}
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-8 space-y-8"
        >
          {/* ECOGRID Card */}
          <motion.a
            href="https://drive.google.com/file/d/1pWXNbitXjSUTdIlXeOrcksgNDVpNwZpO/view"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative glass p-6 md:p-10 rounded-2xl overflow-hidden group hover:border-blue-500/50 dark:hover:border-primary/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.03, y: -10, boxShadow: '0 25px 50px rgba(56,189,248,0.15)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 dark:from-primary dark:to-secondary flex items-center justify-center flex-shrink-0 shadow-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <BookOpen className="w-10 h-10 text-white dark:text-primary-foreground" />
                </motion.div>

                <div className="flex-1">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-foreground group-hover:text-blue-600 dark:group-hover:text-primary transition-colors duration-300">
                        ECOGRID
                      </h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-blue-500 dark:text-primary gap-1.5 text-sm font-medium mt-1 sm:mt-0">
                        View Paper <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-lg text-blue-600 dark:text-primary font-semibold mb-2">
                      Renewable Energy Trading Platform on Blockchain
                    </p>
                    <p className="text-slate-600 dark:text-foreground/70 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                      A groundbreaking blockchain-based platform enabling peer-to-peer renewable energy trading. 
                      This research explores the intersection of IoT, machine learning, and distributed ledger technology 
                      to create sustainable energy ecosystems. The platform incorporates AI-driven optimization algorithms 
                      for energy distribution and demand prediction.
                    </p>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-3 mb-6"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                  >
                    {['Blockchain', 'Smart Contracts', 'IoT', 'Machine Learning', 'Sustainability'].map((tag, idx) => (
                      <motion.span
                        key={tag}
                        variants={tagVariants}
                        className="px-4 py-2 rounded-full bg-blue-50 dark:bg-primary/10 text-blue-600 dark:text-primary text-sm font-medium border border-blue-200 dark:border-primary/30"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/50 w-fit group-hover:border-accent transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Copyright className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-accent">Copyright Registered</span>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-sm font-semibold text-slate-600 dark:text-foreground/60 mb-4 group-hover:text-slate-800 dark:group-hover:text-foreground/80 transition-colors">Key Research Areas</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Distributed energy resource management',
                    'Smart contract automation for energy trading',
                    'AI-based demand forecasting',
                    'Real-time grid optimization',
                  ].map((area) => (
                    <motion.div
                      key={area}
                      className="flex items-center gap-3 text-slate-600 dark:text-foreground/70 group-hover:text-slate-800 dark:group-hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      {area}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent group-hover:left-full transition-[left] duration-1000 ease-in-out" />
          </motion.a>

          {/* PATENT CARD - Clickable with link */}
          <motion.a
            href="https://drive.google.com/drive/folders/1ALJE-VbqoxIey6xjhyhn2zV6wEKQA0iX?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative glass p-6 md:p-10 rounded-2xl overflow-hidden group hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.03, y: -10, boxShadow: '0 25px 50px rgba(16,185,129,0.15)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <FileText className="w-10 h-10 text-white" />
                </motion.div>

                <div className="flex-1">
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        OBJECT DETECTION AND TRACKING
                      </h3>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-emerald-500 dark:text-emerald-400 gap-1.5 text-sm font-medium">
                        View Patent <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-lg text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                      Object Detection and Tracking in Video Sequences
                    </p>
                    <p className="text-slate-600 dark:text-foreground/70 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                      A robust framework combining deep learning-based object detection with motion-aware tracking techniques. 
                      The system addresses challenges like occlusion, lighting variations, and complex backgrounds while ensuring 
                      accurate localization and consistent identity maintenance across consecutive video frames. Application No: 202641047826
                    </p>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-3 mb-6"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                  >
                    {['CNN', 'YOLO', 'Feature Matching', 'Motion Prediction', 'Multi-Object Tracking'].map((tag, idx) => (
                      <motion.span
                        key={tag}
                        variants={tagVariants}
                        className="px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-200 dark:border-emerald-500/30"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 w-fit group-hover:border-amber-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-semibold text-amber-700 dark:text-amber-400">Patent Published</span>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-sm font-semibold text-slate-600 dark:text-foreground/60 mb-4 group-hover:text-slate-800 dark:group-hover:text-foreground/80 transition-colors">Key Features</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Unified data association',
                    'Deep CNN for object detection',
                    'Feature matching & motion prediction tracking',
                    'Real-time & offline video processing',
                  ].map((feature) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3 text-slate-600 dark:text-foreground/70 group-hover:text-slate-800 dark:group-hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent group-hover:left-full transition-[left] duration-1000 ease-in-out" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}