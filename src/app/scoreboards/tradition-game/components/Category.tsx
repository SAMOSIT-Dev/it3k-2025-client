"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '@/app/styles/scoreboards/athletics/category.module.css'
import swiperStyles from '@/app/styles/swiper/swiper.module.css'
import { TCategory } from '../page'

interface Props {
  categories: TCategory[];
  categoryState: TCategory;
  setCategoryStateAction: React.Dispatch<React.SetStateAction<TCategory>>;
}



const Category = ({categories, categoryState, setCategoryStateAction}: Props) => {

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
          className={swiperStyles.swiper}>
          {categories.map((item) => (
            <SwiperSlide key={item.id} className={styles['swiper-slide']}>
              <button
                onClick={() => setCategoryStateAction(() => item)}
                className={`rounded-lg ${styles['category-button']}`}>
                {item.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={styles.container}>
          {categories.map((item) => (
            <li
              className={`md:rounded-xl xl:rounded-lg ${styles['category-button']} ${categoryState.id === item.id ? styles['category-button-focus'] : ''}`}
              onClick={() => setCategoryStateAction(() => item)}
              key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Category
