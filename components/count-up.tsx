'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({
  end,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setValue(end)
      return
    }

    let frame = 0
    let raf = 0
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo for a satisfying deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(end * eased)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setValue(end)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      frame = 0
    }
  }, [isInView, end, duration, prefersReducedMotion])

  const formatted = value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
