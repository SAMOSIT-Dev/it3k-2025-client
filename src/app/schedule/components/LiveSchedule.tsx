import { type ScheduleData } from '@/app/schedule/scheduleData'
import ScheduleCard from './ScheduleCard'
import { useId } from 'react'

export default function LiveSchedule({
  scheduleData
}: {
  scheduleData: ScheduleData[]
}) {
  return (
    <div className="flex flex-col font-Prompt m-auto space-y-5 p-2 w-[1038px] text-center text-white">
      <h2 className="font-bold text-3xl">กำหนดการ</h2>
      <div className="flex w-full items-center justify-between mx-auto">
        <h2 className="font-bold text-2xl">Next Match</h2>
        <div className="flex items-center space-x-2">
          <button className="h-[39] w-[175] text-xl font-medium border rounded-[10px] border-red-500 flex justify-center items-center">
            สนามบอล
          </button>
          <button className="h-[39] w-[175] text-xl font-medium border rounded-[10px] border-red-500 flex justify-center items-center">
            โรงยิม
          </button>
        </div>
      </div>
      {scheduleData.map((data) => (
        <ScheduleCard key={useId()} scheduleData={data} />
      ))}
    </div>
  )
}
