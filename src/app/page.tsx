import PodiumScoreBoard from './(main)/components/PodiumScoreboard'
import PodiumSection from './(main)/components/PodiumSection'
import { scheduleData } from './schedule/scheduleData'
import LiveSchedule from './schedule/components/LiveSchedule'
import HeroMain from "./(main)/components/HeroMain";
import Sponsor from "./(main)/components/Sponsor";
import SportSlider from './(main)/components/SportSlider'
import { scheduleSports, scoreboardSports } from './(main)/data/sportData'
import FloatingPopGoose from './(main)/components/FloatingPopGoose';
import MainBackground from './(main)/components/MainBackground';

const scoreboardData = [
  {
    name: 'KMUTT',
    logo: '/images/KMUTT_logo.png',
    scores: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    name: 'KMITL',
    logo: '/images/KMITL_logo.png',
    scores: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    name: 'KMUTNB',
    logo: '/images/KMUTNB_logo.png',
    scores: [0, 0, 0, 0, 0, 0, 0]
  },
  {
    name: 'KMUTNB PR',
    logo: '/images/KMUTNB_logo.png',
    scores: [0, 0, 0, 0, 0, 0, 0]
  }
]

export default function Home() {
  return (
    <main className="bg-black-300 relative z-10 max-w-screen overflow-hidden">
      {/* Hero Section By Nae*/}
      <HeroMain />

      {/* Podium Section By Ice */}
      <div className='sm:mt-20'>
        <PodiumSection scoreboardData={scoreboardData} />
      </div>

      {/* Sport Scoreboard Slider By Gun*/}
      <SportSlider title="รายงานการแข่งขัน" sportLists={scoreboardSports} />

      {/* Podium Scoreboard By Ice */}
      <PodiumScoreBoard scoreboardData={scoreboardData} />

      {/* Live Schedule By C */}
      <LiveSchedule scheduleData={scheduleData} />
      {/* Full detail sport schedule slider By Gun*/}
      <div className='my-10'>
        <SportSlider title="กำหนดการแข่งขันกีฬา" sportLists={scheduleSports} />
      </div>

      {/* Sponsers */}
      <div className='mt-[120px] sm:mt[300px]'>
        <Sponsor />
      </div>
      <FloatingPopGoose />
      <MainBackground />
    </main>
  )
}
