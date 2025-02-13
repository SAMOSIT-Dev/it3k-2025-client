import { scheduleData } from './schedule/scheduleData'
import LiveSchedule from './schedule/components/LiveSchedule'

export default function Home() {
  return (
    <main className="bg-black-300">
      {/* Hero Section By Nae*/}

      {/* Podium Section  */}

      {/* Sport Scoreboard Slider By Gun*/}

      {/* Podium Scoreboard */}

      {/* Live Schedule By C */}
      <LiveSchedule scheduleData={scheduleData} />
      {/* Full detail sport schedule slider By Gun*/}

      {/* Sponsers */}
    </main>
  )
}
