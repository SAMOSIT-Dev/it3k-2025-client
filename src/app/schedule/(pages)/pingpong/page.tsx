import PageTitle from '../../components/PageTitle'
import { pingpongScheduleData } from '../../scheduleData'
import ScheduleCard from '../../components/ScheduleCard'
import VerticalFadeIn from '@/shared/components/animations/VerticalFadeIn'

export default function PingpongSchedulePage() {
  return (
    <div className="pt-[100px] w-screen px-8 md:px-24 lg:px-0 h-auto overflow-x-hidden min-w-0 overflow-scroll bg-black-300">
      <header className="">
        <div className="w-auto lg:w-[1038.35px] mx-auto">
          <PageTitle title="Table Tennis" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] relative z-20">
        {pingpongScheduleData.map((type) => (
          <div key={type.title}>
            <span className="lg:text-5xl text-2xl font-Prompt flex justify-center font-bold text-center text-white mx-auto my-14 md:my-[86px]">
              {type.title}
            </span>
            <div className="font-Prompt flex flex-col justify-center m-auto space-y-5 md:space-y-6 lg:space-y-[42px]">
              {type.scheduleData.map((data, i) => (
                <VerticalFadeIn key={i} visibleThreshold={0.9}>
                  <ScheduleCard key={i} type="match" scheduleData={data} />
                </VerticalFadeIn>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
