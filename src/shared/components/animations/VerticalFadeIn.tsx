'use client'
import { useState, useEffect, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

type VerticalFadeInProps = {
  children: ReactNode;
  otherStyle?: string;
  visibleThreshold?: number
}

const VerticalFadeIn: React.FC<VerticalFadeInProps> = ({ children, otherStyle, visibleThreshold }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing after it's visible
        }
      },
      { threshold: visibleThreshold || 0.7 } // Trigger when 10% of the element is visible
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [visibleThreshold])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }} // Start lower
      animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${otherStyle}`}
    >
      {children}
    </motion.div>
  )
}

export default VerticalFadeIn
