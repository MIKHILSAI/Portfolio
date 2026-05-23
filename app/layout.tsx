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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        />
      </head>
      <body className="overflow-x-hidden font-sans antialiased bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalHeroBackground />
          <main className="relative z-10 w-full">{children}</main>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
