'use client'

import { useMemo } from 'react'

interface LeaderboardEntry {
  rank: string
  university: string
  clicks: string
}

interface LeaderboardProps {
  leaderboardData: LeaderboardEntry[]
}

const Leaderboard = ({ leaderboardData }: LeaderboardProps) => {
  const sortedLeaderboard = useMemo(() => {
    return [...leaderboardData].sort(
      (a, b) => Number(b.clicks) - Number(a.clicks)
    )
  }, [leaderboardData])

  return (
    <div className="bg-[#ECECEC] w-[365px] h-[30px] flex items-center justify-center sm:h-[60px] sm:w-[620px] md:w-[750px] lg:w-[850px] p-2 sm:p-4 rounded-full">
      <ul className="flex flex-row items-center justify-evenly gap-3 sm:gap-6 font-PressStart2P">
        {sortedLeaderboard.map((team, index) => (
          <li
            key={team.rank}
            className="flex items-center justify-center gap-2 text-[7px] sm:text-[12px] md:text-base">
            {index + 1}.<span>{team.university}</span>
            <span className="text-[#3A5FE5]">{team.clicks}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
