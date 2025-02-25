"use client"
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
    { id: 1, name: 'วิ่ง 100 เมตร หญิง' },
    { id: 2, name: 'วิ่ง 100 เมตร ชาย' },
    { id: 3, name: 'วิ่ง 4x100 เมตร หญิง' },
    { id: 4, name: 'วิ่ง 4x100 เมตร ชาย' }
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
    <div className='font-Prompt'>
      {isMobile ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          className={swiperStyles.swiper}
        >
          {category.map((item) => (
            <SwiperSlide key={item.id} className={styles['swiper-slide']}>
              <button className={`rounded-lg ${styles['category-button']}`}>{item.name}</button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={styles.container}>
          {category.map((item) => (
            <li className={`md:rounded-xl xl:rounded-lg ${styles['category-button']}`} key={item.id}>
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Category
