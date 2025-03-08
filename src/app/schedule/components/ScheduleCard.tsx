'use client'

import Image from 'next/image'
import { ScheduleData } from '../scheduleData'
import AutoOverflow from './AutoOverflow'
import { universityLogoList } from '../utils/constants'
import { Schedule, UpComingEvent } from '../services/schedule.service'
import { Team, TeamLogos, TeamMapping } from '@/shared/utils/team'
import * as utils from '../utils/utils'
import { SportEnum, sportMap } from '../utils/sport'

type CardProps = {
  match: {
    data: Schedule
  }
}

function MatchCard({ data }: CardProps['match']) {
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
          {data?.place && (
            <span className="font-bold leading-tight md:text-sm lg:text-lg text-[5px]">
              staduim: {data.place}
            </span>
          )}
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
        </p>
      </div>
    </div>
  )
}

// function MatchCard({ data }: CardProps['match']) {
//   return (
//     <div className="select-none py-4 px-5 md:py-7 h-[82px] lg:px-16 md:px-8 lg:h-auto sm:h-auto md:h-auto lg:py-10 relative items-center flex w-full border text-center text-white border-red-500 rounded-[10px]">
//       <div className="flex items-center justify-center self-center space-x-2 lg:space-x-6 sm:space-x-4 w-1/2 md:space-x-3">
//         {data.awayTeam && data.homeTeam ? (
//           <>
//             {data.homeTeam.logo ? (
//               <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
//                 <Image
//                   objectFit="cover"
//                   fill
//                   className="size-full object-cover rounded-full relative"
//                   src={data.homeTeam.logo}
//                   alt={data.homeTeam.name}
//                 />
//               </div>
//             ) : (
//               <div className="flex size-12 p-5 md:p-10 lg:size-32 sm:size-20"></div>
//             )}
//             <div className="flex flex-col">
//               <span className="font-bold md:text-3xl lg:text-5xl sm:text-3xl text-sm">
//                 VS
//               </span>
//             </div>
//             {data.awayTeam.logo ? (
//               <div className="size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative">
//                 <Image
//                   objectFit="cover"
//                   fill
//                   className="size-full object-cover rounded-full relative"
//                   src={data.awayTeam.logo}
//                   alt={data.awayTeam.name}
//                 />
//               </div>
//             ) : (
//               <div className="flex size-12 p-5 md:p-10 lg:size-32 sm:size-20"></div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center space-x-3">
//             {universityLogoList.map((uni, i) => (
//               <div
//                 key={i}
//                 className="size-6 p-2 sm:p-5 lg:size-24 md:size-14 sm:size-10 relative">
//                 <Image
//                   objectFit="cover"
//                   fill
//                   className="size-full bg-white object-cover rounded-full relative"
//                   src={uni.src}
//                   alt={uni.alt}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="inline-block h-auto min-h-[1em] w-[1px] self-stretch bg-[#E3E3E3] ml-5 md:ml-4 lg:ml-14"></div>
//       <div className="flex w-1/2 flex-col justify-center relative min-w-0 items-center text-center ml-5">
//         <AutoOverflow className="flex items-center justify-center">
//           {data.icon && <i className="lg:mr-4 mr-2">{data.icon}</i>}
//           <span className="font-bold capitalize md:text-2xl leading-normal lg:text-4xl text-sm ">
//             {data.sportTitle}
//           </span>
//         </AutoOverflow>
//         <AutoOverflow>
//           <p className="font-bold lg:text-lg md:text-base md:leading-7 text-[7px] leading-normal lg:leading-10">
//             {data.homeTeam && data.awayTeam ? (
//               <>
//                 {utils.replaceSpaceFromUnderline(data.homeTeam.name)} VS{' '}
//                 {utils.replaceSpaceFromUnderline(data.awayTeam.name)}
//               </>
//             ) : (
//               'KMUTT, KMUTNB, KMITL, KMUTNB PR'
//             )}
//           </p>
//         </AutoOverflow>
//         <p className="lg:text-base text-[#E3E3E3] md:text-sm font-normal leading-3 text-[7px]">
//           เวลา: {data.preiod.start}-{data.preiod.end}
//         </p>
//         {data.place && (
//           <span className="leading-tight text-[#E3E3E3] md:text-sm lg:text-lg text-[6px]">
//             {data.place}
//           </span>
//         )}
//       </div>
//     </div>
//   )
// }

function InfoCard({ data }: CardProps['match']) {

  const filteredUniversity = universityLogoList.filter((v) => {
    const matches = data.sportTitle.match(/(KMUTT)|(KMUTNB PR)|(KMUTNB)|(KMITL)/g)
    if (matches?.length) {
      return matches.includes(v.alt)
    }
    return true
  })

  return (
    <div className="select-none py-4 px-5 md:py-7 h-[82px] lg:px-16 md:px-8 lg:h-[210px] sm:h-auto md:h-auto lg:py-10 relative items-center justify-center flex w-full border text-center text-white border-red-500 rounded-[10px]">
      <div className="flex items-center justify-center self-center space-x-2 lg:space-x-6 sm:space-x-4 w-1/2 md:space-x-3">
        <div className="flex items-center justify-center space-x-3">
          {
            filteredUniversity.map((uni, i) => (
              <div
                key={i}
                className={utils.cn(filteredUniversity.length > 1 ? "size-6 p-2 sm:p-5 lg:size-24 md:size-14 sm:size-10 relative" : "size-12 p-6 md:p-10 lg:size-32 sm:size-20 relative")}>
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
          {data.location && (
            <span className="leading-tight text-[#E3E3E3] md:text-sm lg:text-lg text-[6px]">
              at {data.location}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default function ScheduleCard({
  scheduleData,
  type
}: {
  scheduleData: UpComingEvent | ScheduleData | Schedule
  type: 'evnet' | 'match' | 'fianl-match' | 'info'
}) {
  switch (type) {
    // case 'evnet':
    //   return <EventCard data={scheduleData as Schedule} />
    case 'match':
      return <MatchCard data={scheduleData as Schedule} />
    // case 'fianl-match':
    //   return <FinalMatchCard data={scheduleData as ScheduleData} />
    case 'info':
      return <InfoCard data={scheduleData as Schedule} />
    default:
      break
  }
}
