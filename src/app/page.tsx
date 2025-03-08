import PodiumScoreBoard from './(main)/components/PodiumScoreboard'
import PodiumSection from './(main)/components/PodiumSection'
import LiveSchedule from './schedule/components/LiveSchedule'
import HeroMain from "./(main)/components/HeroMain";
import Sponsor from "./(main)/components/Sponsor";
import SportSlider from './(main)/components/SportSlider'
import { scheduleSports, scoreboardSports } from './(main)/data/sportData'
import FloatingPopGoose from './(main)/components/FloatingPopGoose';
import MainBackground from './(main)/components/MainBackground';
import VerticalFadeIn from '@/shared/components/animations/VerticalFadeIn';

export default function Home() {
  
  return (
    <main className="bg-black-300 relative z-10 max-w-screen overflow-hidden">
      {/* Hero Section By Nae*/}
      <HeroMain />

      {/* Podium Section By Ice */}
      <div className='sm:mt-20'>
        <VerticalFadeIn>
          <PodiumSection />
        </VerticalFadeIn>
      </div>

      {/* Sport Scoreboard Slider By Gun*/}
      <VerticalFadeIn>
        <SportSlider title="Scoreboard" sportLists={scoreboardSports} />
      </VerticalFadeIn>

      {/* Podium Scoreboard By Ice */}
      <VerticalFadeIn>
        <PodiumScoreBoard />
      </VerticalFadeIn>

      {/* Live Schedule By C */}
      <VerticalFadeIn>
        <LiveSchedule/>
      </VerticalFadeIn>
      {/* Full detail sport schedule slider By Gun*/}
      <div className='my-10'>
        <VerticalFadeIn>
          <SportSlider title="Sport Schedule" sportLists={scheduleSports} />
        </VerticalFadeIn>
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
