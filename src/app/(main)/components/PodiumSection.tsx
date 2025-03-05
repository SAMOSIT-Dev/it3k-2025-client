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
    <div className="relative my-8 mt-0 w-full max-w-[300px] md:max-w-[780px] lg:max-w-[937px] h-[300px] lg:h-[630px] mx-auto flex justify-center font-BenguiatITCbyBT">
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
          <div className="absolute bottom-[74px] sm:bottom-[110px] lg:bottom-[260px] left-4 sm:left-[165px] lg:left-[4%] flex flex-col items-center">
            <div className="relative w-20 h-48 sm:w-36 sm:h-40 lg:w-64 lg:h-64 flex items-center justify-center">
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
        <div className="absolute bottom-[74px] left-6 sm:bottom-[60px] sm:left-52 lg:bottom-[115px] lg:left-[12%] flex flex-col items-center">
          <span className="text-white text-sm sm:text-xl lg:text-3xl font-bold mt-2">
            {rankedTeams[1].name}
          </span>
          <div className="flex items-center text-white text-sm lg:text-3xl font-bold mt-0 lg:mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2 w-[12px] sm:w-full"
            />
            {rankedTeams[1].totalScore}
          </div>
        </div>

        {/* Rank 1 */}
        {rankedTeams[0] && (
          <div className="absolute bottom-44 lg:bottom-[365px] flex flex-col items-center">
            <div className="relative w-24 h-16 sm:w-[170px] sm:h-40 lg:w-64 lg:h-64  flex items-center justify-center">
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
        <div className="absolute bottom-24 lg:bottom-[220px] flex flex-col items-center">
          <span className="text-white text-sm sm:text-xl lg:text-3xl  font-bold">
            {rankedTeams[0].name}
          </span>
          <div className="flex items-center text-white text-sm lg:text-3xl font-bold mt-0 lg:mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2 w-[12px] sm:w-full"
            />
            {rankedTeams[0].totalScore}
          </div>
        </div>

        {/* Rank 3 */}
        {rankedTeams[2] && (
          <div className="absolute bottom-12 sm:bottom-[70px] lg:bottom-[180px] right-[4%] sm:right-40 lg:right-8 flex flex-col items-center">
            <div className="relative w-20 h-48 sm:w-36 sm:h-40 lg:w-64 lg:h-64 flex items-center justify-center">
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
        <div id='Podium' className="absolute bottom-14 sm:bottom-6 lg:bottom-[50px] right-6 sm:right-48 lg:right-[10%] flex flex-col items-center">
          <span className="text-white text-sm sm:text-xl lg:text-3xl font-bold">
            {rankedTeams[2].name}
          </span>
          <div className="flex items-center text-white text-sm lg:text-3xl font-bold lg:mt-4">
            <Image
              src="/images/medal.png"
              alt="medal"
              width={30}
              height={30}
              className="mr-2 w-[12px] sm:w-full"
            />
            {rankedTeams[2].totalScore}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodiumSection
