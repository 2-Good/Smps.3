import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  const dotTransition = (delay: number) => ({
    duration: 0.6,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
    delay,
  })

  return (
    <div className="flex gap-3">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-primary/50 blur-md" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
      <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-4 flex items-center">
        <div className="flex gap-1.5">
          {[0, 0.2, 0.4].map((delay) => (
            <motion.div
              key={delay}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
              transition={dotTransition(delay)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
