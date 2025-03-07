'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  AthleticsCategory,
  CATEGORY_LABELS
} from '../services/athletics.service'

interface Props {
  selected: AthleticsCategory
  onSelect: (category: AthleticsCategory) => void
}

const Category: React.FC<Props> = ({ selected, onSelect }) => {
  const categories = Object.values(AthleticsCategory)

  const handleSelect = (category: AthleticsCategory) => {
    onSelect(category)
  }

  return (
    <div
      className="font-Prompt flex overflow-x-scroll h-[65px] justify-center items-center mb-3"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
      <div className="relative w-full whitespace-nowrap mb-4 scrollbar-hide md:flex md:justify-center md:space-x-2">
        <div className="w-full flex space-x-2 px-2 md:px-0">
          {categories.map((category) => {
            const isActive = selected === category

            return (
              <button
                key={category}
                className={`rounded-lg px-4 py-2 transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  isActive
                    ? 'bg-red-500 text-white shadow-[0_0_5px_4px_rgba(255,0,0,0.4)]'
                    : 'border border-red-500 text-white hover:shadow-[0_0_5px_4px_rgba(255,0,0,0.4)] hover:border-red-500'
                }`}
                onClick={() => handleSelect(category)}>
                {CATEGORY_LABELS[category]}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Category
