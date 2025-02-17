import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import { footballScheduleData } from '../../scheduleData'

export default function FootballSchedulePage() {
  return (
    <div className="w-screen h-screen overflow-scroll bg-black-300 fixed inset-0">
      <header className="">
        <div className="w-[1038.35px] mx-auto">
          <PageTitle title="ฟุตบอล" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-[1038.35px] relative z-20">
        <div className="font-Prompt flex flex-col justify-center m-auto space-y-[42px]">
          {footballScheduleData.map((data, i) => (
            <ScheduleCard key={i} scheduleData={data} />
          ))}
        </div>
      </main>
    </div>
  )
}
