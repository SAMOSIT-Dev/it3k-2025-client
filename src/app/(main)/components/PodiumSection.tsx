'use client'

import React from 'react'
import Image from 'next/image'

interface Team {
  name: string
  logo: string
  scores: number[]
}

interface PodiumSectionProps {
  scoreboardData: Team[]
}

const calculateTotalScore = (scores: number[]) =>
  scores.reduce((a, b) => a + b, 0)

const PodiumSection: React.FC<PodiumSectionProps> = ({ scoreboardData }) => {
  const rankedTeams = Array.isArray(scoreboardData)
    ? [...scoreboardData]
        .map((team) => ({
          ...team,
          totalScore: calculateTotalScore(team.scores)
        }))
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 3)
    : []

  return (
    <div className="relative w-full max-w-[937px] h-[630px] mx-auto flex justify-center font-BenguiatITCbyBT">
      {/* Podium Background */}
      <Image
        src="/images/podium.png"
        alt="podium"
        layout="fill"
        objectFit="contain"
        className="absolute bottom-0 z-0"
        priority
      />

      {/* Podium Container */}
      <div className="relative flex justify-center items-end w-full max-w-[937px] h-full">
        {/* Rank 2 */}
        {rankedTeams[1] && (
          <div className="absolute bottom-[260px] left-[4%] flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <Image
                src={rankedTeams[1].logo}
                alt={rankedTeams[1].name}
                width={254}
                height={254}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </div>
        )}
        <div className="absolute bottom-[115px] left-[12%] flex flex-col items-center">
          <span className="text-white text-3xl font-bold mt-2">
            {rankedTeams[1].name}
          </span>
          <div className="flex items-center text-white text-3xl font-bold mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2"
            />
            {rankedTeams[1].totalScore}
          </div>
        </div>

        {/* Rank 1 */}
        {rankedTeams[0] && (
          <div className="absolute bottom-[365px] flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-white rounded-full shadow-md"></div>
              <Image
                src={rankedTeams[0].logo}
                alt={rankedTeams[0].name}
                width={254}
                height={254}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </div>
        )}
        <div className="absolute bottom-[220px] flex flex-col items-center">
          <span className="text-white text-3xl font-bold">
            {rankedTeams[0].name}
          </span>
          <div className="flex items-center text-white text-3xl font-bold mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2"
            />
            {rankedTeams[0].totalScore}
          </div>
        </div>

        {/* Rank 3 */}
        {rankedTeams[2] && (
          <div className="absolute bottom-[180px] right-[4%] flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <Image
                src={rankedTeams[2].logo}
                alt={rankedTeams[2].name}
                width={254}
                height={254}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </div>
        )}
        <div className="absolute bottom-[50px] right-[10%] flex flex-col items-center">
          <span className="text-white text-3xl font-bold">
            {rankedTeams[2].name}
          </span>
          <div className="flex items-center text-white text-3xl font-bold mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2"
            />
            {rankedTeams[2].totalScore}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodiumSection
