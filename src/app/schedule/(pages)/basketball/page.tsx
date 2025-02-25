import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import { basketballScheduleData } from '../../scheduleData'

export default function BasketballSchedulePage() {
  return (
    <div className="w-screen px-8 md:px-24 lg:px-0 h-screen overflow-scroll bg-black-300 fixed inset-0">
      <header className="">
        <div className="w-auto lg:w-[1038.35px] mx-auto">
          <PageTitle title="บาสเกตบอล" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] relative z-20">
        <div className="font-Prompt flex flex-col justify-center m-auto space-y-3 md:space-y-6 lg:space-y-[42px]">
          {basketballScheduleData.map((data, i) => (
            <ScheduleCard key={i} scheduleData={data} />
          ))}
        </div>
      </main>
    </div>
  )
}
