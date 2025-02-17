import Image from 'next/image'
import { ScheduleData } from '../scheduleData'

export default function ScheduleCard({
  scheduleData
}: {
  scheduleData: ScheduleData
}) {
  const universityLogoList = [
    {
      src: '/images/KMUTT_logo.png',
      alt: 'KMUTT'
    },
    {
      src: '/images/KMUTNB_logo.png',
      alt: 'KMUTNB'
    },
    {
      src: '/images/KMITL_logo.png',
      alt: 'KMITL'
    }
  ]

  return (
    <div className="py-7 px-16 h-[220px] space-x-10 flex w-full border text-center text-white border-red-500 rounded-[10px]">
      <div className="flex items-center space-x-5 w-full">
        {scheduleData.homeTeam && scheduleData.awayTeam ? (
          <>
            {scheduleData.homeTeam.logo ? (
              <Image
                className="bg-white rounded-full"
                width={130}
                height={130}
                src={scheduleData.homeTeam.logo}
                alt={scheduleData.homeTeam.name}
              />
            ) : (
              <div className="flex size-[130px]"></div>
            )}
            <div className="flex flex-col">
              <h1 className="font-bold text-5xl">VS</h1>
              {scheduleData.arena && (
                <span className="font-bold text-lg mt-2">
                  {scheduleData.arena}
                </span>
              )}
            </div>
            {scheduleData.awayTeam.logo ? (
              <Image
                className="bg-white rounded-full"
                width={130}
                height={130}
                src={scheduleData.awayTeam.logo}
                alt={scheduleData.awayTeam.name}
              />
            ) : (
              <div className="flex size-[130px]"></div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-[8px]">
            {universityLogoList.map((uni) => (
              <Image
                className="bg-white rounded-full"
                key={uni.alt}
                width={130}
                height={130}
                src={uni.src}
                alt={uni.alt}
              />
            ))}
          </div>
        )}
      </div>
      <div className="relative h-full w-[1px] flex bg-[#E3E3E3]"></div>
      <div className="flex m-auto flex-col space-y-1 w-full">
        <span className="flex justify-center items-center">
          {scheduleData.icon}
          <h2 className="font-bold text-4xl ml-4">{scheduleData.sportTitle}</h2>
        </span>
        <p className="font-bold text-lg">
          {scheduleData.homeTeam && scheduleData.awayTeam ? (
            <>
              {scheduleData.homeTeam.name} VS {scheduleData.awayTeam.name}
            </>
          ) : (
            'KMUTT, KMUTNB, KMITL, KMUTNB PR'
          )}
        </p>
        <p className="text-base text-[#E3E3E3] font-normal">
          เวลา: {scheduleData.preiod.start}-{scheduleData.preiod.end}
        </p>
      </div>
    </div>
  )
}
