'use client'

import MatchCard from '@/shared/components/MatchCard'
import { Team, TeamMapping } from '@/shared/utils/team'
import { Icon } from '@iconify/react/dist/iconify.js'

interface UniTeam {
  uniName: string
  score: number
}

export interface FootballMatch {
  id: number
  team_A: UniTeam
  team_B: UniTeam
  status: string
  timeStart: string
  timeEnd: string
}
interface MatchListProps {
  liveData: FootballMatch[]
}

const MatchList: React.FC<MatchListProps> = ({ liveData }) => {
  if (!liveData.length) {
    return <p className="text-white text-center">No ongoing matches...</p>
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {liveData.map((match) => (
        <MatchCard
          key={match.id}
          time={`เวลา : ${match.timeStart.slice(0, -3)} - ${match.timeEnd.slice(0, -3)}`}
          match={`MATCH ${match.id}`}
          teamA={TeamMapping[match.team_A.uniName] || Team.KMUTT}
          teamB={TeamMapping[match.team_B.uniName] || Team.KMUTT}
          scoreA={match.team_A.score}
          scoreB={match.team_B.score}
        />
      ))}
      <div className="flex flex-col w-full items-center space-y-0">
        <hr className="w-full border-t-2 border-white m-0 p-0" />
        <Icon
          icon="solar:alt-arrow-down-bold"
          className="text-3xl cursor-pointer mt-0"
        />
      </div>
    </div>
  )
}

export default MatchList
