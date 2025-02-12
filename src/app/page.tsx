import SportSlider from './(main)/components/SportSlider'
import { scheduleSports, scoreboardSports } from './(main)/data/sportData'

export default function Home() {
  return (
    <main className="bg-black-300">
      {/* Hero Section By Nae*/}

      {/* Podium Section By Icde */}

      {/* Sport Scoreboard Slider By Gun*/}
      <SportSlider title="รายงานการแข่งขัน" sportLists={scoreboardSports} />
      {/* Podium Scoreboard By Ice */}

      {/* Live Schedule By C */}

      {/* Full detail sport schedule slider By Gun*/}
      <SportSlider title="กำหนดการแต่ละกีฬา" sportLists={scheduleSports} />

      {/* Sponsers */}
    </main>
  )
}
