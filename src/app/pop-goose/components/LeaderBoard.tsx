'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import CountUp from 'react-countup'

interface LeaderboardEntry {
  rank: string
  university: string
  clicks: string
}

interface LeaderboardProps {
  leaderboardData: LeaderboardEntry[]
  onClose: () => void
}

const Leaderboard = ({ leaderboardData, onClose }: LeaderboardProps) => {
  return (
    <section className="fixed inset-0 bg-black-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFF] rounded-lg shadow-lg p-4 sm:p-6 max-w-max w-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold font-PressStart2P text-orange-400">
            Leaderboard
          </h2>
          <button
            onClick={onClose}
            className="text-red-400 transition-all hover:text-red-500">
            <Icon
              icon={'zondicons:close-solid'}
              className=" text-xl sm:text-2xl"
            />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-2 font-PressStart2P text-[10px] sm:text-sm mb-2 font-bold">
          <span className="col-span-2 text-center">Rank</span>
          <span className="col-span-7">University</span>
          <span className="col-span-3 text-right">Clicks</span>
        </div>

        <div className="space-y-2 text-[8px] sm:text-base">
          {leaderboardData.map((team, index) => (
            <div
              key={team.rank}
              className={`grid grid-cols-12 gap-2 p-2 rounded ${
                index === 0
                  ? 'bg-[#ffd700]'
                  : index === 3
                    ? 'bg-[#fff]'
                    : 'bg-[#ECECEC]'
              }
              `}>
              <div className="col-span-2 font-PressStart2P text-center flex items-center justify-center">
                {index === 0
                  ? '🥇'
                  : index === 1
                    ? '🥈'
                    : index === 2
                      ? '🥉'
                      : Number(team.rank)}
              </div>

              <div className="col-span-7 font-PressStart2P truncate">
                {team.university}
              </div>
              <div className="col-span-3 font-PressStart2P text-[#3A5FE5] text-right">
                <CountUp
                  start={Math.max(0, Number(team.clicks) - 100)}
                  end={Number(team.clicks)}
                  duration={1}
                  separator=","
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
