'use client'

import { type ScheduleData } from '@/app/schedule/scheduleData'
import ScheduleCard from './ScheduleCard'
import { useState } from 'react'

type Location = 'Football Field' | 'Gym'

export default function LiveSchedule({
  scheduleData
}: {
  scheduleData: ScheduleData[]
}) {
  const [, setFilter] = useState<Location[]>([])

  const handleFilterButton = (location: Location) => {
    setFilter((prev) => {
      const updatedFilter = prev.includes(location)
        ? prev.filter((co) => co !== location)
        : [...prev, location]
      return updatedFilter
    })
  }

  const filteredData = scheduleData.filter((x) => {
    return x
  })

  return (
    <div className="min-w-0 h-auto min-h-0 relative">
      <div className="flex flex-col relative font-Prompt m-auto px-8 md:px-24 lg:px-0 z-[12] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] text-center text-white">
        <div className="relative w-auto h-auto mx-auto px-10 py-10">
          {/* <div className=""></div> */}
          <span className="font-bold text-3xl md:text-5xl flex justify-center after:bg-[#FF0000] after:z-[1] before:content-['กำหนดการ'] before:z-10 after:blur-[70px] relative after:absolute after:w-full after:h-full"></span>
        </div>
        <div className="flex w-full flex-col space-y-4 sm:space-y-0 items-center  sm:flex-row lg:mt-[55px] justify-between mx-auto">
          <h2 className="font-bold text-xl lg:text-4xl">Next Match</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleFilterButton('Football Field')}
              className="lg:h-[39px] lg:w-[175px] h-auto lg:text-xl text-sm py-1 w-[130px] font-medium border rounded-[10px] border-red-500 flex justify-center items-center">
              สนามบอล
            </button>
            <button
              onClick={() => handleFilterButton('Gym')}
              className="lg:h-[39px] lg:w-[175px] lg:text-xl text-sm py-1 w-[130px] font-medium border rounded-[10px] border-red-500 flex justify-center items-center">
              โรงยิม
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-[25px] space-y-5 lg:space-y-[42px]">
          {filteredData.map((data, i) => (
            <ScheduleCard key={i} scheduleData={data} />
          ))}
        </div>
        <div className="before:w-full before:h-[1px] lg:before:mt-[51px] flex flex-col items-center before:mt-6 before:bg-white before:flex">
          <i className="mt-[14px]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.24997 5.41668H22.75C22.9474 5.4173 23.1409 5.47175 23.3097 5.57417C23.4785 5.67659 23.6161 5.8231 23.7078 5.99794C23.7996 6.17278 23.8418 6.36932 23.8302 6.5664C23.8185 6.76348 23.7533 6.95365 23.6416 7.11643L13.8916 21.1998C13.4875 21.7837 12.5146 21.7837 12.1095 21.1998L2.35947 7.11643C2.24661 6.95399 2.18043 6.76373 2.16812 6.56631C2.1558 6.3689 2.19782 6.17189 2.28961 5.99669C2.3814 5.82148 2.51945 5.67478 2.68876 5.57252C2.85808 5.47026 3.05218 5.41636 3.24997 5.41668Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </i>
        </div>
      </div>
    </div>
  )
}
