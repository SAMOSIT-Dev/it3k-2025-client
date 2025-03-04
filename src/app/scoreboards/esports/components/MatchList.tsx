'use client'
import MatchCard from '@/shared/components/MatchCard'
import { Team } from '@/shared/utils/team'
import { Icon } from '@iconify/react/dist/iconify.js'

interface Match {
  time: string
  match: string
  teamA: Team
  teamB: Team
  scoreA: number
  scoreB: number
}

interface MatchListProps {
  matches: Match[]
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {matches.length > 0 ? (
        matches.map((match, index) => <MatchCard key={index} {...match} />)
      ) : (
        <p className="text-white text-center">No matches available.</p>
      )}
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
