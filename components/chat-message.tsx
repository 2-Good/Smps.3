import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

interface ChatMessageProps {
  message: string
  isBot: boolean
}

export default function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex gap-3 max-w-xs sm:max-w-md lg:max-w-lg ${isBot ? '' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="relative flex-shrink-0 mt-1">
            <div className="absolute inset-0 rounded-full bg-primary/50 blur-md" />
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'glass-panel text-foreground rounded-tl-sm'
              : 'btn-glow text-primary-foreground rounded-tr-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
