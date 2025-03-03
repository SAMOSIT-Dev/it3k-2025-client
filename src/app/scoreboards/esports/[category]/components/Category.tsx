'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'

const Category = () => {
  const params = useParams()
  const router = useRouter()
  const activeCategory = params?.category

  const category = [
    { id: 1, name: 'Valorant', slug: 'valorant' },
    { id: 2, name: 'Arena of Valor (ROV)', slug: 'rov' },
    { id: 3, name: 'League of Legends (LOL)', slug: 'lol' }
  ]

  return (
    <div
      className="font-Prompt flex overflow-x-scroll h-[65px] justify-center items-center mb-3"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="relative w-full whitespace-nowrap mb-4 scrollbar-hide md:flex md:justify-center md:space-x-2">
        <div className="w-full flex space-x-2 px-2 md:px-0">
          {category.map((item) => {
            const isActive = activeCategory === item.slug

            return (
              <button
                key={item.id}
                onClick={() =>
                  router.replace(`/scoreboards/esports/${item.slug}`)
                }
                className={`rounded-lg px-4 py-2 transition-all duration-300 
                  ${
                    isActive
                      ? 'bg-red-500 text-white shadow-[0_0_5px_4px_rgba(255,0,0,0.4)]'
                      : 'border border-red-500 text-white hover:shadow-[0_0_5px_4px_rgba(255,0,0,0.4)] hover:border-red-500'
                  }
                  md:w-fit md:rounded-xl
                `}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Category
