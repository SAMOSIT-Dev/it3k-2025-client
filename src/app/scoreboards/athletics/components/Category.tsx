'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '@/app/styles/scoreboards/athletics/category.module.css'
import swiperStyles from '@/app/styles/swiper/swiper.module.css'
import { useRouter } from 'next/navigation'
import {
  AthleticsCategory,
  CATEGORY_LABELS
} from '../services/athletics.service'

interface Props {
  selected: AthleticsCategory
  onSelect: (category: AthleticsCategory) => void
}

const Category: React.FC<Props> = ({ selected, onSelect }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const categories = Object.values(AthleticsCategory)

  const handleSelect = (category: AthleticsCategory) => {
    onSelect(category)
  }

  return (
    <div className="font-Prompt">
      {isMobile ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          className={swiperStyles.swiper}>
          {categories.map((category) => {
            const isActive = selected === category
            return (
              <SwiperSlide key={category} className={styles['swiper-slide']}>
                <button
                  className={`rounded-lg ${styles['category-button']} ${
                    isActive ? 'bg-red-500 !important' : ''
                  }`}
                  onClick={() => handleSelect(category)}>
                  {CATEGORY_LABELS[category]}
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>
      ) : (
        <ul className={styles.container}>
          {categories.map((category) => {
            const isActive = selected === category
            return (
              <li
                key={category}
                className={`md:rounded-xl xl:rounded-lg ${styles['category-button']} ${
                  isActive ? styles.active : ''
                }`}>
                <button onClick={() => handleSelect(category)}>
                  {CATEGORY_LABELS[category]}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Category
