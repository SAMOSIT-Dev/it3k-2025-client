'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const PageWrapper = ({ children }: Props) => {
  const pathname = usePathname()

  return (
    <div className={`${pathname !== '/' ? 'pt-[100px]' : ''}`}>{children}</div>
  )
}

export default PageWrapper
