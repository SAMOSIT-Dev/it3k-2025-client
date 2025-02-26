'use client'

import { useMemo } from 'react'
import CountUp from 'react-countup'

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
    <div className="bg-[#ECECEC] w-[365px] h-[30px] flex items-center justify-center sm:h-[60px] sm:w-auto p-2 sm:p-4 rounded-full">
      <ul className="flex flex-row items-center justify-evenly gap-2 sm:gap-6 font-PressStart2P">
        {sortedLeaderboard.map((team, index) => (
          <li
            key={team.rank}
            className="flex items-center justify-center sm:gap-2 text-[6px] sm:text-[12px] xl:text-[14px]">
            {index + 1}.<span>{team.university}</span>
            <span className="text-[#3A5FE5]">
              <CountUp
                start={Number(team.clicks) - 100}
                end={Number(team.clicks)}
                duration={0.8}
                separator=","
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
