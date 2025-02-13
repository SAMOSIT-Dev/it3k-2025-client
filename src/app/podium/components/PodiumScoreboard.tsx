'use client'

import React from 'react'
import Image from 'next/image'
import { sportsIcons } from '../constants/constants'

interface Team {
  name: string
  logo: string
  scores: number[]
}

interface ScoreBoardProps {
  scoreboardData: Team[]
}

const PodiumScoreBoard: React.FC<ScoreBoardProps> = ({ scoreboardData }) => {
  return (
    <div className="bg-black min-h-screen text-white p-4 flex flex-col items-center font-BenguiatITCbyBT">
      <div className="w-[1281px] h-[681px]">
        {/* Header Section */}
        <div className="flex justify-between items-center text-red-500 mb-4">
          <h2 className="text-xl text-[#A4A4A4] font-Prompt">อันดับเหรียญ</h2>
          {/* Sports Icons Section */}
          <div className="flex space-x-4 w-[751px] justify-evenly">
            {sportsIcons.map((icon, index) => (
              <div key={index} className="flex justify-center items-center">
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
        <div className="flex flex-col items-center space-y-[26px]">
          {scoreboardData.map((item, index) => (
            <div
              key={index}
              className="w-[1281px] h-[125px] flex items-center justify-between px-6 border border-[#E90000] bg-[#1E0707] rounded-md">
              {/* Team Info */}
              <div className="flex items-center space-x-6 w-[338px] h-[95px] gap-[45px] ">
                <div className="text-[32px]">{index + 1}</div>

                <Image
                  src={item.logo}
                  alt={`${item.name} Logo`}
                  width={92}
                  height={92}
                  className="rounded-full border border-[#E90000]"
                  priority
                />

                <div className="text-[32px] mr-[45px] whitespace-nowrap flex-shrink-0">
                  {item.name}
                </div>
              </div>

              {/* Score Display */}
              <div className="flex space-x-6 text-center w-[716px] h-[29px] justify-evenly">
                {item.scores.map((score, idx) => (
                  <div key={idx} className="w-10 text-[24px]">
                    {score}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PodiumScoreBoard
