'use client'

import FastMarquee, { MarqueeProps } from 'react-fast-marquee'

export default function Marquee({ children, ...props }: MarqueeProps) {
  return (
    <FastMarquee
      {...props}
      speed={30}>
      {children}
    </FastMarquee>
  )
}
