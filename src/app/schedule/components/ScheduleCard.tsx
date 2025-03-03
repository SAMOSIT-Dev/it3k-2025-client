'use client'

import Image from 'next/image'
import { ScheduleData } from '../scheduleData'
import AutoOverflow from './AutoOverflow'
import { universityLogoList } from '../utils/constants'

export default function ScheduleCard({
  scheduleData
}: {
  scheduleData: ScheduleData
}) {
  return (
    <div className="py-4 px-5 md:py-7 lg:px-16 md:px-8 lg:py-10 relative items-center flex w-full border text-center text-white border-red-500 rounded-[10px]">
      <div className="flex items-center self-center space-x-2 lg:space-x-6 sm:space-x-4 w-1/2 md:space-x-3">
        {scheduleData.homeTeam && scheduleData.awayTeam ? (
          <>
            {scheduleData.homeTeam.logo ? (
              <div className="size-12 p-5 md:p-10 lg:size-32 sm:size-20 relative">
                <Image
                  objectFit="cover"
                  fill
                  className="size-full bg-white object-cover rounded-full relative"
                  src={scheduleData.homeTeam.logo}
                  alt={scheduleData.homeTeam.name}
                />
              </div>
            ) : (
              <div className="flex size-12 p-5 md:p-10 lg:size-32 sm:size-20"></div>
            )}
            <div className="flex flex-col">
              <span className="font-bold md:text-3xl lg:text-5xl sm:text-3xl text-sm">
                VS
              </span>
              {scheduleData.arena && (
                <span className="font-bold leading-tight md:text-sm lg:text-lg text-[5px]">
                  {scheduleData.arena}
                </span>
              )}
            </div>
            {scheduleData.awayTeam.logo ? (
              <div className="size-12 p-5 md:p-10 lg:size-32 sm:size-20 relative">
                <Image
                  objectFit="cover"
                  fill
                  className="size-full bg-white object-cover rounded-full relative"
                  src={scheduleData.awayTeam.logo}
                  alt={scheduleData.awayTeam.name}
                />
              </div>
            ) : (
              <div className="flex size-12 p-5 md:p-10 lg:size-32 sm:size-20"></div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-2">
            {universityLogoList.map((uni, i) => (
              <div
                key={i}
                className="size-8 p-5 md:p-10 lg:size-32 sm:size-20 relative">
                <Image
                  objectFit="cover"
                  fill
                  className="size-full bg-white object-cover rounded-full relative"
                  src={uni.src}
                  alt={uni.alt}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="inline-block h-auto min-h-[1em] w-[1px] self-stretch bg-[#E3E3E3] ml-5 md:ml-4 lg:ml-14"></div>
      <div className="flex w-1/2 flex-col justify-center relative min-w-0 items-center text-center ml-5">
        <AutoOverflow className="flex items-center justify-center">
          {scheduleData.icon && (
            <i className="lg:mr-4 mr-2">{scheduleData.icon}</i>
          )}
          <span className="font-bold md:text-2xl leading-normal lg:text-4xl text-sm ">
            {scheduleData.sportTitle}
          </span>
        </AutoOverflow>
        <AutoOverflow>
          <p className="font-bold lg:text-lg md:text-base md:leading-7 text-[7px] leading-normal lg:leading-10">
            {scheduleData.homeTeam && scheduleData.awayTeam ? (
              <>
                {scheduleData.homeTeam.name} VS {scheduleData.awayTeam.name}
              </>
            ) : (
              'KMUTT, KMUTNB, KMITL, KMUTNB PR'
            )}
          </p>
        </AutoOverflow>
        <p className="lg:text-base text-[#E3E3E3] md:text-sm font-normal leading-3 text-[4px]">
          เวลา: {scheduleData.preiod.start}-{scheduleData.preiod.end}
        </p>
      </div>
    </div>
  )
}
