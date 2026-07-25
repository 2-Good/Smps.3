'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Microscope,
  MapPin,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Trees,
  Award,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CountUp from '@/components/count-up'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const infoCards = [
  {
    icon: Trees,
    title: '10-Acre Campus',
    desc: 'A sprawling, green state-of-the-art educational campus in the heart of Chandausi.',
  },
  {
    icon: Microscope,
    title: 'Modern Labs',
    desc: 'Fully equipped Science, Mathematics, and Computer laboratories for hands-on learning.',
  },
  {
    icon: BookOpen,
    title: 'M.P. Singh Foundation',
    desc: 'Committed to quality, values-driven education since 2002 across North India.',
  },
  {
    icon: MapPin,
    title: 'Chandausi, Sambhal',
    desc: 'Located on NH-509, serving families across Sambhal district, Uttar Pradesh.',
  },
]

const stats = [
  { icon: Trees, end: 10, suffix: '', label: 'Acre Campus' },
  { icon: Users, end: 1500, suffix: '+', label: 'Happy Students' },
  { icon: GraduationCap, end: 80, suffix: '+', label: 'Expert Educators' },
  { icon: Award, end: 22, suffix: '+', label: 'Years of Legacy' },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  An M.P. Singh Foundation School
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 text-4xl sm:text-5xl font-bold"
            >
              <span className="text-gradient">Hello</span>
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
              >
                👋
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance max-w-4xl"
            >
              <span className="text-gradient">Welcome to </span>
              <span className="text-gradient-accent">Shashi Madan Public School</span>
            </motion.h1>

            {/* Intro Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed text-pretty"
            >
              An inclusive community of lifelong learners, run by the M.P. Singh
              Foundation (established 2002). We also operate Delhi Public School
              Meerut and Delhi Public School Dehradun, fostering academic
              excellence and character development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow px-8 py-4 text-primary-foreground font-semibold rounded-xl flex items-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5" />
                  Talk to our AI Assistant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats Counter Section */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                      delay: index * 0.12,
                    }}
                    className="glass-card shimmer rounded-2xl p-6 flex flex-col items-center text-center"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <div className="text-3xl sm:text-4xl font-bold text-gradient-accent tabular-nums">
                      <CountUp end={stat.end} suffix={stat.suffix} />
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: index * 0.12 + 1.4 }}
                      className="text-sm font-medium text-muted-foreground mt-1 tracking-wide"
                    >
                      {stat.label}
                    </motion.p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Info Cards Grid */}
            <motion.div variants={itemVariants} className="pt-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-3xl font-bold text-gradient mb-6"
              >
                Why families choose SMPS
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {infoCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 22,
                        delay: index * 0.12,
                      }}
                      whileHover={{ y: -6 }}
                      className="glass-card shimmer p-6 rounded-2xl group cursor-default"
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.3,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                        className="font-semibold text-foreground mb-2 text-lg"
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: index * 0.12 + 0.35 }}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {card.desc}
                      </motion.p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Closing CTA banner */}
            <motion.div variants={itemVariants} className="pt-8">
              <div className="glass-panel rounded-3xl p-8 sm:p-12 relative">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-3">
                      Have questions about admissions?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our AI Assistant can answer questions about fees, facilities,
                      timings, and the admission process — instantly, any time of
                      day.
                    </p>
                  </div>
                  <Link href="/chat" className="flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-glow px-7 py-3.5 text-primary-foreground font-semibold rounded-xl flex items-center gap-2 group whitespace-nowrap"
                    >
                      Start Chatting
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
