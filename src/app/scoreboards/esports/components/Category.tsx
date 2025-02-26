'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '@/app/styles/scoreboards/athletics/category.module.css'
import swiperStyles from '@/app/styles/swiper/swiper.module.css'

const Category: React.FC = () => {
  const category = [
    { id: 1, name: 'Valorant' },
    { id: 2, name: 'Areana of Valor (ROV)' },
    { id: 3, name: 'League of Legends (LOL)' }
  ]
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
          className={swiperStyles.swiper}
        >
          {category.map((item) => (
            <SwiperSlide key={item.id} className={styles['swiper-slide']}>
              <button className={` rounded-lg ${styles['category-button']}`}>
                {item.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className="flex gap-2 mb-6 md:mb-8">
          {category.map((item) => (
            <li
              className={`w-fit md:rounded-xl xl:rounded-lg ${styles['category-button']}`}
              key={item.id}
            >
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Category
