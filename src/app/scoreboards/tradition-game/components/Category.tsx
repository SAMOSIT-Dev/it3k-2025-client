'use client'
import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { TCategory } from '../page'

interface Props {
  categories: TCategory[]
  categoryState: TCategory
  setCategoryStateAction: React.Dispatch<React.SetStateAction<TCategory>>
}

const Category = ({ categories, categoryState, setCategoryStateAction }: Props) => {
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
            const isActive = categoryState.id === category.id
            return (
              <button
                key={category.id}
                onClick={() => setCategoryStateAction(() => category)}
                className={`rounded-lg px-4 py-2 transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  isActive
                    ? 'bg-red-500 text-white shadow-[0_0_5px_4px_rgba(255,0,0,0.4)]'
                    : 'border border-red-500 text-white hover:shadow-[0_0_5px_4px_rgba(255,0,0,0.4)] hover:border-red-500'
                }`}>
                {category.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Category
