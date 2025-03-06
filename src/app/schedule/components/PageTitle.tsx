'use client'

import { useRouter } from 'next/navigation'
import { Sport } from '../scheduleData'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function PageTitle({ title }: { title: Sport }) {
  const nevigate = useRouter()
  return (
    <div className="w-full relative flex items-center font-Prompt my-[90px]">
      <button className="absolute" onClick={() => nevigate.back()}>
        <Icon
          icon={'solar:alt-arrow-left-bold'}
          className="lg:text-6xl md:5xl text-4xl p-0 cursor-pointer text-white"
        />
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
