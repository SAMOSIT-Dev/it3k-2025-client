'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { sportsIcons } from '../constants/constants'
import useSWR, { SWRResponse } from 'swr'
import { defaultFetcher } from '@/shared/utils/fetcher'
import { TPodiumScoreboard } from '@/shared/types/PodiumScoreboard'
import mapUniNameToLogo from '@/shared/utils/mapUniNameToLogo'
import { mergePodiumScoreWithStaticData } from '../utils/mergePodiumScore'
import { replaceUnderscoreWithSpace } from '@/shared/utils/replaceScoreboardWithSpace'
import VerticalFadeIn from '@/shared/components/animations/VerticalFadeIn'

// {
//   name: 'KMUTNB PR',
//   logo: '/images/KMUTNB_PR_logo.png',
//   scores: [0, 0, 0, 0, 0, 0, 0]
// }

type TPodiumScoreboardData = {
  id: number;
  name: string
  logo: string
  scores: number[]
}

const convertPodiumScoreboard = (data: TPodiumScoreboard[]): TPodiumScoreboardData[] => {
  return data.map(({id, universityName, ...scores }) => ({
    id: id,
    name: universityName,
    logo: mapUniNameToLogo(universityName), // Example logo path
    scores: Object.values(scores)
  }))
}

function sortPodiumScoreboard(
  data: TPodiumScoreboardData[]
): TPodiumScoreboardData[] {
  return data.sort((a, b) => {
    const totalScoreA = a.scores.reduce((sum, score) => sum + score, 0)
    const totalScoreB = b.scores.reduce((sum, score) => sum + score, 0)
    return totalScoreB - totalScoreA
  })
}

const PodiumScoreBoard: React.FC = () => {
  const { data } = useSWR<SWRResponse>(
    `${process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL}/api/points`,
    defaultFetcher
  )

  const [scoreboardData, setScoreboardData] = useState<TPodiumScoreboardData[]>([])
  useEffect(() => {
    if (data) {
      setScoreboardData(
        convertPodiumScoreboard(mergePodiumScoreWithStaticData(data.data))
      )
    }
  }, [data])

  return (
    <div className="bg-black lg:max-w-[1280px] mx-auto my-1 sm:my-4 lg:my-20 text-white p-4 flex flex-col items-center font-BenguiatITCbyBT">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center text-red-500 mb-2 sm:mb-4">
          <h2 className="text-xs text-nowrap sm:text-xl text-[#A4A4A4] font-Prompt">
            Ranking
          </h2>
          {/* Sports Icons Section */}
          <div className="flex pr-4 sm:pr-5 xl:pr-10 md:space-x-4 w-[730px] justify-end xl:justify-evenly">
            {sportsIcons.map((icon, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-[25px] sm:w-[50px] xl:w-full">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={79}
                  height={79}
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scoreboard List */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-[26px]">
          {sortPodiumScoreboard(scoreboardData).map((item, index) => (
            <VerticalFadeIn key={index} >
              <div
                className="w-full h-[50px] sm:h-[150px] flex items-center justify-between px-4 sm:px-6 border border-[#E90000] bg-[#1E0707] rounded-md">
                {/* Team Info */}
                <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 sm:w-[338px] h-full sm:h-[95px] gap-1 sm-gap-2 xl:gap-[45px] ">
                  <div className="text-sm sm:text-[32px]">{index + 1}</div>

                  <Image
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    width={92}
                    height={92}
                    className="rounded-full w-[35px] sm:w-[100px] xl:w-full"
                    priority
                  />

                  <div className="text-[10px] sm:text-[20px] lg:text-[26px] xl:text-[32px] mr-[45px] whitespace-nowrap flex-shrink-0">
                    {replaceUnderscoreWithSpace(item.name)}
                  </div>
                </div>

                {/* Score Display */}
                <div className="flex space-x-2 sm:space-x-4 xl:space-x-6 text-center w-auto h-auto xl:w-[716px] xl:h-[29px] justify-end sm:justify-evenly font-pro">
                  {item.scores.map((score, idx) => (
                    <div
                      key={idx}
                      className="w-[18px] sm:w-12 xl:w-10 text-[10px] sm:text-[20px] xl:text-[24px]">
                      {score}
                    </div>
                  ))}
                </div>
              </div>
            </VerticalFadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PodiumScoreBoard
