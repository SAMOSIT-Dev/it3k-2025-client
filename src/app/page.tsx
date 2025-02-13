import PodiumScoreBoard from './podium/components/PodiumScoreboard'
import PodiumSection from './podium/components/PodiumSection'

const scoreboardData = [
  {
    name: 'KMUTT',
    logo: '/images/KMUTT_Full.jpg',
    scores: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    name: 'KMITL',
    logo: '/images/KMITL_logo.png',
    scores: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    name: 'KMUTNB',
    logo: '/images/KMUTNB_logo.png',
    scores: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    name: 'KMUTNB PR',
    logo: '/images/KMUTNB_logo.png',
    scores: [999, 999, 999, 999, 999, 999, 999]
  }
]


export default function Home() {
  return (
    <main className="bg-black-300">
      {/* Hero Section By Nae*/}

      {/* Podium Section By Ice */}

      {/* Sport Scoreboard Slider By Gun*/}

      {/* Podium Scoreboard By Ice */}
      <PodiumSection scoreboardData={scoreboardData} />

      <PodiumScoreBoard scoreboardData={scoreboardData} />
      {/* Live Schedule By C */}

      {/* Full detail sport schedule slider By Gun*/}

      {/* Sponsers */}
    </main>
  )
}
