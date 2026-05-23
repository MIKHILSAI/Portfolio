'use client'

import { motion } from 'framer-motion'
import { hoverScale } from '@/lib/motion'
import { useMotionPrefs } from '@/hooks/use-motion-prefs'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { shouldAnimate } = useMotionPrefs()

  const content = (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div>
          <div className="text-2xl font-bold gradient-text mb-4">MSN</div>
          <p className="text-foreground/70 text-sm">
            AI Developer & Full Stack Engineer building intelligent systems that solve real-world problems.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
          <div className="space-y-2">
            {[
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/70 hover:text-primary transition-colors text-sm block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
          <div className="space-y-2 text-sm text-foreground/70">
            <p>📧 nmikhilsai@gmail.com</p>
            <p>📱 +91 89256 76110</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
        <p>© {currentYear} Mikhil Sai N. All rights reserved.</p>
        <p className="mt-4 md:mt-0">
          Crafted with{' '}
          {shouldAnimate ? (
            <motion.span className="text-accent inline-block" whileHover={hoverScale}>
              ❤
            </motion.span>
          ) : (
            <span className="text-accent">❤</span>
          )}{' '}
          using Next.js & Framer Motion
        </p>
      </div>
    </div>
  )

  if (!shouldAnimate) {
    return (
      <footer className="relative z-10 w-full mt-0 border-t border-white/10 bg-background py-10 md:py-12">
        {content}
      </footer>
    )
  }

  return (
    <motion.footer
      className="relative z-10 w-full mt-0 border-t border-white/10 bg-background py-10 md:py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.footer>
  )
}
