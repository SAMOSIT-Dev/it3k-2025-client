'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import Marquee from './Marquee'
import { cn } from '../utils/utils'

export default function AutoOverflow({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const [isOverflow, setIsOverflow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isMarqueeisActive = (element: HTMLSpanElement) => {
    if (element.clientWidth < element.scrollWidth) {
      setIsOverflow(true)
    } else {
      setIsOverflow(false)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      isMarqueeisActive(containerRef.current)
    }

    const handleResize = () => {
      if (containerRef.current) {
        isMarqueeisActive(containerRef.current)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className={cn(
        className,
        'w-full h-auto min-w-0 overflow-hidden text-nowrap'
      )}
      ref={containerRef}>
      {isOverflow ? (
        <Marquee>
          <div className="ml-[1px] mr-10">{children}</div>
        </Marquee>
      ) : (
        children
      )}
    </div>
  )
}
