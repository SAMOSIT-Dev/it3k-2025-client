'use client'

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type StaggeredFadeInProps = {
  children: ReactNode[];
  otherStyle: string | undefined;
}

const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ children, otherStyle }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2 // Adjust the delay between animations
          }
        }
      }}
      className={`space-y-4 ${otherStyle}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.8, ease: 'easeOut' }
            }
          }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StaggeredFadeIn