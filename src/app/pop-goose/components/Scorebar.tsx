'use client'

import { useMemo, useState } from 'react'
import CountUp from 'react-countup'
import Leaderboard from './LeaderBoard'
interface LeaderboardEntry {
  rank: string
  university: string
  clicks: string
}

interface ScorebarProps {
  leaderboardData: LeaderboardEntry[]
}

const Scorebar = ({ leaderboardData }: ScorebarProps) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const sortedScorebar = useMemo(() => {
    return [...leaderboardData].sort(
      (a, b) => Number(b.clicks) - Number(a.clicks)
    )
  }, [leaderboardData])

  const formatClicks = (clicks: number) => {
    if (clicks >= 1000000) {
      return `${(clicks / 1000000).toFixed(1)}m`
    } else if (clicks >= 100000) {
      return `${(clicks / 1000).toFixed(0)}k`
    } else if (clicks >= 10000) {
      return `${(clicks / 1000).toFixed(0)}k`
    } else {
      return clicks.toLocaleString()
    }
  }

  return (
    <section className="bg-[#ECECEC] w-[365px] h-[30px] flex items-center justify-center sm:h-[60px] sm:w-auto p-2 sm:p-4 rounded-full">
      <ul
        className="flex flex-row items-center justify-evenly gap-2 sm:gap-6 font-PressStart2P"
        onClick={() => setShowLeaderboard(!showLeaderboard)}>
        {sortedScorebar.map((team, index) => (
          <li
            key={team.rank}
            className="flex items-center justify-center gap-1 sm:gap-2 text-[6px] sm:text-[12px] xl:text-[14px]">
            {index + 1}.<span>{team.university}</span>
            <span className="text-[#3A5FE5]">
              {Number(team.clicks) >= 10000 ? (
                formatClicks(Number(team.clicks))
              ) : (
                <CountUp
                  start={Math.max(0, Number(team.clicks) - 100)}
                  end={Number(team.clicks)}
                  duration={0.8}
                  separator=","
                />
              )}
            </span>
          </li>
        ))}
      </ul>

      {showLeaderboard && (
        <Leaderboard
          leaderboardData={sortedScorebar}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </section>
  )
}

export default Scorebar
