import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { GlobalHeroBackground } from '@/components/GlobalHeroBackground'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mikhil Sai N | Portfolio',
  description: 'Building intelligent systems that solve real-world problems using AI, data, and scalable technologies. AI/ML specialist, hackathon winner, published researcher.',
  icons: {
    icon: '/mikhil.png',
    shortcut: '/mikhil.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-background dark:bg-slate-950/95 text-foreground transition-colors duration-300 relative min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalHeroBackground />
          <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
