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

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsOverflow(
          containerRef.current.offsetWidth < containerRef.current.scrollWidth
        )
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [containerRef])

  return (
    <div
      className={cn(
        className,
        'w-full h-auto min-w-0 min-h-0 relative overflow-hidden text-nowrap'
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
