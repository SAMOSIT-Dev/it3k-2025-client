import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>
}
