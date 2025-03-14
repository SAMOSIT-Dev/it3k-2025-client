'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/styles/swiper/swiper.module.css'
import 'swiper/css'
import 'swiper/css/navigation'

interface SportSliderProps {
  title: string
  sportLists: { name: string; route: string; icon: string }[]
}

const SportSlider = ({ title, sportLists }: SportSliderProps) => {
  return (
    <div className="px-0 sm:px-8 md:px-36 py-4 sm:py-8 relative">
      <div className='flex justify-center'>
        <div className='relative w-fit flex flex-col items-center'>
          <div className="font-bold font-Prompt text-2xl md:text-5xl flex justify-center text-white z-20">
            {title}
          </div>
          <div className="bg-[#FF0000] w-full h-full absolute blur-[70px]"></div>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        loop={true}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next'
        }}
        modules={[Navigation]}
        className={styles.swiper}>
        {sportLists.map((sport, index) => (
          <SwiperSlide
            key={index}
            className={`${styles['swiper-slide']} ${styles['swiper-wrapper']}`}>
            <Link
              href={sport.route}
              className="flex items-center justify-center flex-col">
              <Image
                src={sport.icon}
                alt={sport.name}
                height={200}
                width={200}
              />
              <p className="text-white text-[14px] sm:text-xl md:text-2xl font-bold font-Prompt text-center">
                {sport.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}

        <button className="custom-prev hidden lg:flex absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 rounded-full shadow-md z-10">
          <Icon icon="bxs:left-arrow" />
        </button>
        <button className="custom-next hidden lg:flex absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 rounded-full shadow-md z-10">
          <Icon icon="bxs:right-arrow" />
        </button>
      </Swiper>
    </div>
  )
}

export default SportSlider
