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
    <div className="bg-[#ECECEC] min-w-[400px] w-[850px] p-6 rounded-full">
      <ul className="flex flex-row items-center justify-evenly gap-6 font-PressStart2P">
        {sortedTeams.map((team, index) => (
          <li
            key={team.name}
            className="flex items-center justify-center gap-2">
            <span>
              {index + 1}.{team.name}
            </span>
            <span className="text-[#3A5FE5]">{team.score}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScoreBar
