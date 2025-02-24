'use client'

import { FC, useMemo } from 'react'

interface ScoreBarProps {
  kmutt: number
  kmilt: number
  kmutnb_bkk: number
}

interface TeamScore {
  name: string
  score: number
}

const ScoreBar: FC<ScoreBarProps> = ({
  kmutt,
  kmilt,
  kmutnb_bkk
}: ScoreBarProps) => {
  const sortedTeams = useMemo(() => {
    const teams: TeamScore[] = [
      { name: 'KMUTT', score: kmutt },
      { name: 'KMITL', score: kmilt },
      { name: 'KMUTNB BKK', score: kmutnb_bkk }
    ]
    return [...teams].sort((a, b) => b.score - a.score)
  }, [kmutt, kmilt, kmutnb_bkk])

  return (
    <div className="bg-[#ECECEC] w-[365px] h-[30px] flex items-center justify-center sm:h-[60px] sm:w-[620px] md:w-[750px] lg:w-[850px] p-2 sm:p-4 rounded-full">
      <ul className="flex flex-row items-center justify-evenly gap-3 sm:gap-6 font-PressStart2P">
        {sortedTeams.map((team, index) => (
          <li
            key={team.name}
            className="flex items-center justify-center gap-2 text-[7px] sm:text-[12px] md:text-base">
            {index + 1}.<span>{team.name}</span>
            <span className="text-[#3A5FE5]">{team.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScoreBar
