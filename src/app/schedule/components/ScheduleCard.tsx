import { ScheduleData } from '../scheduleData'
// import BadmintonIcon from './icons/BadmintonIcon'

export default function ScheduleCard({
  scheduleData
}: {
  scheduleData: ScheduleData
}) {
  return (
    <div className="py-7 px-16 h-[220px] space-x-10 flex w-full border text-white border-red-500 rounded-[10px]">
      <div className="flex items-center space-x-5 w-full">
        <img
          width={130}
          src={scheduleData.homeTeam.logo}
          alt={scheduleData.homeTeam.name}
        />
        <h1 className="font-bold text-5xl">VS</h1>
        <img
          width={130}
          src={scheduleData.awayTeam.logo}
          alt={scheduleData.awayTeam.name}
        />
      </div>
      <div className="relative h-full w-[1px] flex bg-[#E3E3E3]"></div>
      <div className="flex m-auto flex-col space-y-1 w-full">
        <span className="flex justify-center items-center">
          {scheduleData.icon}
          <h2 className="font-bold text-4xl ml-4">แบดมินตัน</h2>
        </span>
        <p className="font-bold text-lg">
          {scheduleData.homeTeam.name} VS {scheduleData.awayTeam.name}
        </p>
        <p className="text-base text-[#E3E3E3] font-normal">
          เวลา: {scheduleData.preiod.start}-{scheduleData.preiod.end}
        </p>
      </div>
    </div>
  )
}
