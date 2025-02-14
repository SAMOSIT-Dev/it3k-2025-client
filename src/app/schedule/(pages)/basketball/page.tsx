import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import { basketballScheduleData } from '../../scheduleData'

export default function BasketballSchedulePage() {
  return (
    <div className="w-screen h-screen overflow-scroll bg-black-300 fixed inset-0">
      <header className="">
        <div className="w-[1038.35px] mx-auto">
          <PageTitle title="basketball" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-[1038.35px] relative z-20">
        <div className="font-Prompt flex flex-col justify-center m-auto space-y-[42px]">
          {basketballScheduleData.map((data) => (
            <ScheduleCard key={data.sportTitle} scheduleData={data} />
          ))}
        </div>
      </main>
    </div>
  )
}
