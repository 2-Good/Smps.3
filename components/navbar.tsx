'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isChat = pathname === '/chat'

  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-b border-l-0 border-r-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="relative w-10 h-10 rounded-xl bg-secondary/60 border border-white/10 overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10"
                whileHover={{ rotate: -4, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <img
                  src="/school-logo.png"
                  alt="Shashi Madan Public School crest"
                  className="h-full w-auto max-w-none object-cover object-left scale-[1.15]"
                />
              </motion.div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-base sm:text-lg leading-tight text-gradient">
                Shashi Madan Public School
              </h1>
              <p className="text-xs text-muted-foreground">Chandausi, Sambhal</p>
            </div>
            <span className="sm:hidden font-bold text-lg text-gradient">SMPS</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Nav Links with Active Pill */}
            <div className="relative flex items-center gap-1 bg-secondary/40 rounded-full p-1 border border-white/5">
              {/* Animated background pill */}
              <motion.div
                className="absolute inset-y-1 rounded-full bg-gradient-to-r from-primary/30 to-primary/15 border border-primary/30 shadow-[0_0_16px_oklch(0.6_0.15_245/0.35)]"
                initial={false}
                animate={{
                  left: isChat ? 'calc(50% + 2px)' : '2px',
                  width: 'calc(50% - 4px)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 28,
                }}
              />

              <Link
                href="/"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isHome ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isChat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                AI Assistant
              </Link>
            </div>

            {/* Beta Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">Beta</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
