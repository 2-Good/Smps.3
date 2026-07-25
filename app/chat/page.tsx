'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageSquare } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ChatMessage from '@/components/chat-message'
import TypingIndicator from '@/components/typing-indicator'

interface Message {
  id: string
  content: string
  isBot: boolean
}

const suggestedQuestions = [
  'Admission Process',
  'School Timings',
  'Facilities',
  'Fee Structure',
  'Contact Information',
  'School Rules',
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm the SMPS AI Assistant. Ask me anything about Shashi Madan Public School, admissions, facilities, timings, fees, or anything else you'd like to know.",
      isBot: true,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial render so the page doesn't jump on load
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, loading])

  const handleSendMessage = async (message?: string) => {
    const textToSend = message || input.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        isBot: true,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content:
          'Sorry, I encountered an error. Please try again or contact the school directly at +91-9258159506.',
        isBot: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    const questionMap: Record<string, string> = {
      'Admission Process': 'What is the admission process?',
      'School Timings': 'What are the school timings?',
      'Facilities': 'What facilities do you have?',
      'Fee Structure': 'Tell me about the fee structure',
      'Contact Information': 'What is your contact information?',
      'School Rules': 'What are the school rules?',
    }
    handleSendMessage(questionMap[question])
  }

  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col">
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-sm mb-4">
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">Online now</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-2 flex items-center justify-center gap-3">
              <MessageSquare className="w-7 h-7 text-primary" />
              SMPS AI Assistant
            </h1>
            <p className="text-sm text-muted-foreground">
              Get instant answers about admissions, facilities, timings, and more
            </p>
          </motion.div>

          {/* Chat Window with ambient glow */}
          <div className="relative">
            {/* Soft ambient glow behind the chat window */}
            <div
              className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl pointer-events-none"
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative glass-panel rounded-3xl p-4 sm:p-6 flex flex-col"
            >
              {/* Chat Messages Container */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 h-[46vh] min-h-[320px]"
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      isBot={message.isBot}
                    />
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 mb-4"
                >
                  <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wide">
                    SUGGESTED QUESTIONS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.06 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleSuggestedQuestion(question)}
                        disabled={loading}
                        className="px-3.5 py-2 text-xs font-medium rounded-full border border-primary/25 bg-primary/10 text-foreground hover:bg-primary/25 hover:border-primary/50 transition-colors disabled:opacity-50"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input Area */}
              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229 && !loading) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Ask a question about SMPS..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-input border border-glass-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 disabled:opacity-50 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || loading}
                    className="btn-glow px-5 py-3 text-primary-foreground rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            AI may make mistakes. For important details, please verify with the school office: +91-9258159506
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
