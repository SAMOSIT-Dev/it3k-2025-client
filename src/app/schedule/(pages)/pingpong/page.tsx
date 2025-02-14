import PageTitle from '../../components/PageTitle'
import { pingpongScheduleData } from '../../scheduleData'
import ScheduleCard from '../../components/ScheduleCard'

export default function PingpongSchedulePage() {
  return (
    <div className="w-screen h-screen overflow-scroll bg-black-300 fixed inset-0">
      <header className="">
        <div className="w-[1038.35px] mx-auto">
          <PageTitle title="pingpong" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-[1038.35px] relative z-20">
        <div className="font-Prompt flex flex-col justify-center m-auto space-y-[42px]">
          {pingpongScheduleData.map((type) => (
            <div key={type.title}>
              <h1 className="text-5xl flex justify-center font-bold text-center text-white mx-auto my-[86px]">
                {type.title}
              </h1>
              <div className="font-Prompt flex flex-col justify-center m-auto space-y-[42px]">
                {type.scheduleData.map((data) => (
                  <ScheduleCard key={data.sportTitle} scheduleData={data} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
