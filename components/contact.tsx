'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './section-title'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { fadeUpIn, fadeFromX, hoverScale, tapScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'
import { AnimatedCard } from '@/components/motion/animated-card'
import { StaggerReveal } from '@/components/motion/reveal'

export default function Contact() {
  const { shouldAnimate } = useMotionPrefs()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'nmikhilsai@gmail.com', href: 'mailto:nmikhilsai@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 89256 76110', href: 'tel:+918925676110' },
    { icon: MapPin, label: 'Location', value: 'Chennai, India', href: '#' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage(null)
    setStatusType(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const leftColumn = (
    <>
      <p className="text-lg text-foreground/70 leading-relaxed">
        Whether you have an interesting project, want to collaborate, or just want to say hello, feel free
        to reach out. I&apos;m always excited to discuss new ideas and opportunities.
      </p>
      <div className="space-y-4">
        {contactInfo.map((info, idx) => {
          const Icon = info.icon
          return (
            <AnimatedCard key={idx} subtle delay={idx * 0.08} className="group flex gap-4 p-3 md:p-4 glass rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <a href={info.href} className="flex-1">
                <p className="text-sm font-semibold text-foreground/60">{info.label}</p>
                <p className="text-foreground font-semibold">{info.value}</p>
              </a>
            </AnimatedCard>
          )
        })}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground/60 mb-3">Connect With Me</p>
        <div className="flex gap-3">
          {[
            { name: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/mikhilsain/' },
            { name: 'GitHub', icon: '🔗', href: 'https://github.com/MIKHILSAI' },
            { name: 'Twitter', icon: '𝕏', href: 'https://x.com/MikhilSai27902' },
            { name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/mikhilsai_123' },
          ].map((social, i) =>
            shouldAnimate ? (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg glass flex items-center justify-center text-lg"
                {...fadeUpIn(i * 0.06)}
                whileHover={hoverScale}
                whileTap={tapScale}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ) : (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg glass flex items-center justify-center text-lg"
                title={social.name}
              >
                {social.icon}
              </a>
            ),
          )}
        </div>
      </div>
    </>
  )

  const formColumn = (
    <>
      {submitted ? (
        <div className="h-full flex items-center justify-center text-center min-h-[280px]">
          <div>
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
            <p className="text-foreground/70">I&apos;ll get back to you soon.</p>
          </div>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none"
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
              className="w-full px-4 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none"
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
              className="w-full px-4 py-3 bg-white/5 border border-slate-300/40 dark:border-slate-600/70 rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          {shouldAnimate ? (
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              {...(!isLoading ? { whileHover: hoverScale, whileTap: tapScale } : {})}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          )}
        </>
      )}
      {statusMessage ? (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
            statusType === 'success'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
          }`}
        >
          {statusMessage}
        </p>
      ) : null}
    </>
  )

  return (
    <section id="contact" className="relative w-full py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <SectionTitle title="Get In Touch" subtitle="Let's Build Something Amazing" />

        <StaggerReveal className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {shouldAnimate ? (
            <motion.div {...fadeFromX(-30)} viewport={{ once: true, amount: 0 }} className="space-y-6">
              {leftColumn}
            </motion.div>
          ) : (
            <div className="space-y-6">{leftColumn}</div>
          )}

          {shouldAnimate ? (
            <motion.form
              onSubmit={handleSubmit}
              {...fadeFromX(30)}
              viewport={{ once: true, amount: 0 }}
              className="glass p-4 md:p-6 rounded-xl space-y-5"
            >
              {formColumn}
            </motion.form>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-4 md:p-6 rounded-xl space-y-5">
              {formColumn}
            </form>
          )}
        </StaggerReveal>
      </div>
    </section>
  )
}
