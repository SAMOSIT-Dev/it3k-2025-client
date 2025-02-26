'use client'
import MatchCard from '@/shared/components/MatchCard'
import { Team } from '@/shared/utils/team'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

const mockMatches = [
  {
    time: 'เวลา : 18:30 - 20:00',
    match: 'MATCH 1',
    teamA: Team.KMUTT,
    teamB: Team.KMITL,
    scoreA: 2,
    scoreB: 3
  },
  {
    time: 'เวลา : 18:30 - 20:00',
    match: 'MATCH 2',
    teamA: Team.KMUTT,
    teamB: Team.KMUTNBPR,
    scoreA: 3,
    scoreB: 3
  },
  {
    time: 'เวลา : 18:30 - 20:00',
    match: 'ชืงชนะเลิศ',
    teamA: Team.KMUTT,
    teamB: Team.KMUTNBPR,
    scoreA: 3,
    scoreB: 2
  }
]

const MatchList = () => {
  const [matches, setMatches] = useState<
    {
      time: string
      match: string
      teamA: Team
      teamB: Team
      scoreA: number
      scoreB: number
    }[]
  >(mockMatches)

  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-col gap-4 items-center">
      {loading ? (
        <p className="text-white text-center">Loading matches...</p>
      ) : (
        matches.map((match, index) => <MatchCard key={index} {...match} />)
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
