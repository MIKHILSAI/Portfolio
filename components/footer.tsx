'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">MSN</div>
            <p className="text-foreground/70 text-sm">
              AI Developer & Full Stack Engineer building intelligent systems that solve real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/70 hover:text-primary transition-colors text-sm block"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <p>📧 nmikhilsai@gmail.com</p>
              <p>📱 +91 89256 76110</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60"
        >
          <p>© {currentYear} Mikhil Sai N. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Crafted with <span className="text-accent">❤</span> using Next.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
