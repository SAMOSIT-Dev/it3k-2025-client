'use client'

import { useRouter } from 'next/navigation'
import { Sport } from '../scheduleData'

export default function PageTitle({ title }: { title: Sport }) {
  const nevigate = useRouter()
  return (
    <div className="w-full relative flex items-center font-Prompt my-[90px]">
      <button className="absolute" onClick={() => nevigate.push('/')}>
        <svg
        className='size-7 md:size-11 lg:size-16'
          viewBox="0 0 67 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M53.0417 8.37506L53.0417 58.6251C53.0401 59.1338 52.8998 59.6325 52.6358 60.0674C52.3719 60.5024 51.9943 60.8571 51.5438 61.0934C51.0933 61.3298 50.5868 61.4387 50.0789 61.4086C49.5711 61.3785 49.081 61.2105 48.6615 60.9226L12.3699 35.7976C10.8652 34.7563 10.8652 32.2494 12.3699 31.2053L48.6615 6.08031C49.0801 5.78948 49.5704 5.61894 50.0791 5.5872C50.5879 5.55546 51.0955 5.66374 51.547 5.90028C51.9985 6.13682 52.3766 6.49257 52.6401 6.92887C52.9036 7.36518 53.0425 7.86535 53.0417 8.37506Z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </button>
      <div className="ml-auto mx-auto">
        <div className="relative justify-center">
          <div className="after:bg-[#FF0000] after:z-[1] after:blur-[50px] md:after:blur-[60px] lg:after:blur-[70px] after:absolute after:w-full after:h-full"></div>
          <span className="font-bold text-white text-2xl md:text-5xl lg:text-6xl flex relative z-10">
            {title}
          </span>
        </div>
      </div>
    </div>
  )
}
