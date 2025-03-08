'use client'

import Image from 'next/image'
import AutoOverflow from './AutoOverflow'
import { universityLogoList } from '../utils/constants'
import { Team, TeamLogos, TeamMapping } from '@/shared/utils/team'
import * as utils from '../utils/utils'
import { Place, Schedule } from '../utils/types'

interface CardProps {
  match: {
    data: Schedule
    placeType?: Place
  }
  info: {
    data: Schedule
  }
}

function MatchCard({ data, placeType }: CardProps['match']) {
  return (
    <div className="select-none py-4 px-5 md:py-7 h-[82px] lg:px-16 md:px-8 lg:h-auto sm:h-auto md:h-auto lg:py-10 relative items-center flex w-full border text-center text-white border-red-500 rounded-[10px]">
      <div className="flex items-center justify-center self-center space-x-2 lg:space-x-6 sm:space-x-4 w-1/2 md:space-x-3">
        {data.teamA?.logo ? (
          <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
            <Image
              objectFit="cover"
              fill
              className="size-full object-cover rounded-full relative"
              src={TeamLogos[TeamMapping[data.teamA.logo] as Team]}
              alt={data.teamA.name}
            />
          </div>
        ) : (
          <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
            <Image
              objectFit="cover"
              fill
              className="size-full object-cover rounded-full relative"
              src={TeamLogos[Team.TBD]}
              alt={Team.TBD}
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-bold md:text-3xl lg:text-5xl sm:text-3xl text-sm">
            VS
          </span>
        </div>
        {data.teamB?.logo ? (
          <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
            <Image
              objectFit="cover"
              fill
              className="size-full object-cover rounded-full relative"
              src={TeamLogos[TeamMapping[data.teamB.logo] as Team]}
              alt={Team.TBD}
            />
          </div>
        ) : (
          <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
            <Image
              objectFit="cover"
              fill
              className="size-full object-cover rounded-full relative"
              src={TeamLogos[Team.TBD]}
              alt={Team.TBD}
            />
          </div>
        )}
      </div>
      <div className="inline-block h-auto min-h-[1em] w-[1px] self-stretch bg-[#E3E3E3] ml-5 md:ml-4 lg:ml-14"></div>
      <div className="flex w-1/2 flex-col justify-center relative min-w-0 items-center text-center ml-5">
        <AutoOverflow className="flex items-center justify-center">
          <span className="font-bold md:text-2xl leading-normal lg:text-4xl text-sm capitalize">
            {data.sportTitle}
          </span>
        </AutoOverflow>
        <AutoOverflow>
          <p className="font-bold lg:text-lg md:text-base md:leading-7 text-[7px] leading-normal lg:leading-10">
            {data.teamA?.name ?? 'TBD'} VS {data.teamB?.name ?? 'TBD'}
          </p>
        </AutoOverflow>
        <p className="lg:text-base text-[#E3E3E3] md:text-sm font-normal leading-3 text-[7px]">
          Period: {utils.timeFormat(data.period.start.split('T')[1])}-
          {utils.timeFormat(data.period.end.split('T')[1])}
          {data?.place && ` at ${placeType ?? Place.stadium} ${data.place}`}
        </p>
      </div>
    </div>
  )
}

function InfoCard({ data }: CardProps['info']) {
  const filteredUniversity = universityLogoList.filter((v) => {
    const matches = data.sportTitle.match(
      /(KMUTT)|(KMUTNB PR)|(KMUTNB)|(KMITL)/g
    )
    if (matches?.length) {
      return matches.includes(v.alt)
    }
    return true
  })
  return (
    <div className="select-none py-4 px-5 md:py-7 h-[82px] lg:px-16 md:px-8 lg:h-[210px] sm:h-auto md:h-auto lg:py-10 relative items-center justify-center flex w-full border text-center text-white border-red-500 rounded-[10px]">
      <div className="flex items-center justify-center self-center space-x-2 lg:space-x-6 sm:space-x-4 w-1/2 md:space-x-3">
        <div className="flex items-center justify-center space-x-3">
          {filteredUniversity.map((uni, i) => (
            <div
              key={i}
              className={utils.cn(
                filteredUniversity.length > 1
                  ? 'size-6 p-2 sm:p-5 lg:size-24 md:size-14 sm:size-10 relative'
                  : 'size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative'
              )}>
              <Image
                objectFit="cover"
                fill
                className="size-full object-cover rounded-full relative"
                src={uni.src}
                alt={uni.alt}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="inline-block h-auto min-h-[1em] w-[1px] self-stretch bg-[#E3E3E3] ml-5 md:ml-4 lg:ml-14"></div>
      <div className="flex w-1/2 flex-col justify-center relative min-w-0 items-center text-center ml-5">
        {data?.type && (
          <p className=" capitalize leading-tight text-[#E3E3E3] md:text-sm lg:text-lg text-[7px]">
            {data.type}
          </p>
        )}
        <AutoOverflow className="flex items-center justify-center">
          <span className="font-bold capitalize md:text-2xl leading-normal lg:text-4xl text-sm ">
            {data.sportTitle}
          </span>
        </AutoOverflow>
        <p className="lg:text-base text-[#E3E3E3] md:text-sm md:!leading-[3rem] font-normal text-[7px]">
          Period: {utils.timeFormat(data.period.start.split('T')[1])}-
          {utils.timeFormat(data.period.end.split('T')[1])}{' '}
          {data.location && ` at ${data.location}`}
        </p>
      </div>
    </div>
  )
}

interface ScheduleCardProps {
  type: 'match' | 'info'
  placeType?: Place
  scheduleData: Schedule
}

export default function ScheduleCard({
  scheduleData,
  type = 'match',
  placeType
}: ScheduleCardProps) {
  switch (type) {
    case 'match':
      return <MatchCard placeType={placeType} data={scheduleData} />
    case 'info':
      return <InfoCard data={scheduleData} />
    default:
      return <MatchCard placeType={placeType} data={scheduleData} />
  }
}
