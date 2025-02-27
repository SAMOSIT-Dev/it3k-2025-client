'use client'

import { useState } from 'react'
import FastMarquee, { MarqueeProps } from 'react-fast-marquee'

export default function Marquee({ children, ...props }: MarqueeProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const handleOnFinish = () => {
    setIsPlaying((prev) => !prev)
    const timeout = setTimeout(() => setIsPlaying((prev) => !prev), 1500)
    return () => clearTimeout(timeout)
  }
  return (
    <FastMarquee
      {...props}
      speed={30}
      delay={1}
      onCycleComplete={handleOnFinish}
      play={isPlaying}>
      {children}
    </FastMarquee>
  )
}
