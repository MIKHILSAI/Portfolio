'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import SectionTitle from './section-title'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const { ref, inView } = useInView()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'nmikhilsai@gmail.com', href: 'mailto:nmikhilsai@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 89256 76110', href: 'tel:+918925676110' },
    { icon: MapPin, label: 'Location', value: 'Chennai, India', href: '#' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage(null)
    setStatusType(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message. Please try again.')
      }

      setSubmitted(true)
      setStatusType('success')
      setStatusMessage(result.message || 'Message sent successfully.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatusType('error')
      setStatusMessage(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  }

  const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="contact" className="relative py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Get In Touch" subtitle="Let&apos;s Build Something Amazing" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8 md:gap-10 mt-8"
        >
          {/* Contact Info */}
          <motion.div variants={leftVariants} className="space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed">
              Whether you have an interesting project, want to collaborate, or just want to say hello, feel free to reach out. 
              I&apos;m always excited to discuss new ideas and opportunities.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={idx}
                    href={info.href}
                    variants={itemVariants}
                    className="group flex gap-4 p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground/60">{info.label}</p>
                      <p className="text-foreground font-semibold">{info.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-3">Connect With Me</p>
              <div className="flex gap-3">
                {[
                  { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/mikhilsain/' },
                  { name: 'GitHub', icon: '🔗', href: 'https://github.com/MIKHILSAI' },
                  { name: 'Twitter', icon: '𝕏', href: 'https://x.com/MikhilSai27902' },
                  { name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/mikhilsai_123' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg glass flex items-center justify-center text-lg hover:bg-primary/20 transition-all duration-300 glow"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={rightVariants}
            className="glass p-6 rounded-xl space-y-5 transition-all duration-300 hover:shadow-[0_30px_60px_rgba(56,189,248,0.12)]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center text-center"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground/70">I&apos;ll get back to you soon.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 glow hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.02, boxShadow: '0 0 0 10px rgba(56,189,248,0.18)' } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </>
            )}
            {statusMessage ? (
              <div
                className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
                  statusType === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                }`}
              >
                {statusMessage}
              </div>
            ) : null}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
