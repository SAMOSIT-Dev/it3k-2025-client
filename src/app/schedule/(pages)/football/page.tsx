import MatchList from '@/app/scoreboards/football/components/MatchList'
import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import { footballScheduleData } from '../../scheduleData'

export default function FootballSchedulePage() {
  return (
    <div className="w-screen px-8 md:px-24 lg:px-0 h-auto overflow-x-hidden min-w-0 overflow-scroll bg-black-300">
      <header className="">
        <div className="w-auto lg:w-[1038.35px] mx-auto">
          <PageTitle title="ฟุตบอล" />
        </div>
      </header>
      <main className="my-[100px] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] relative z-20">
        <div className="font-Prompt flex flex-col justify-center m-auto  space-y-5 md:space-y-6 lg:space-y-[42px]">
          {footballScheduleData.map((data, i) => (
            <ScheduleCard key={i} type="match" scheduleData={data} />
          ))}
        </div>
      </main>
      <MatchList />
    </div>
  )
}
