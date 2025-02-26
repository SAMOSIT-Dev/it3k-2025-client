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
      {/* Main container with responsive max-width */}
      <div className="w-full max-w-screen-xl h-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-red-500 mb-4 gap-4">
          <h2 className="text-lg md:text-xl text-[#A4A4A4] font-Prompt">
            อันดับเหรียญ
          </h2>

          {/* Sports Icons - Grid layout for mobile */}
          <div className="grid grid-cols-3 md:flex md:space-x-4 w-full md:w-auto justify-items-center md:justify-evenly">
            {sportsIcons.map((icon, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-16 md:w-20">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scoreboard List */}
        <div className="flex flex-col items-center space-y-4 md:space-y-[26px]">
          {scoreboardData.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-screen-xl h-auto min-h-[100px] md:h-[125px] flex items-center justify-between p-4 md:px-6 border border-[#E90000] bg-[#1E0707] rounded-md">
              {/* Team Info */}
              <div className="flex items-center gap-2 md:gap-[45px] w-full md:w-[338px]">
                <div className="text-xl md:text-3xl">{index + 1}</div>

                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    fill
                    className="rounded-full border border-[#E90000] object-contain p-1"
                    priority
                  />
                </div>

                <div className="text-xl md:text-3xl truncate md:whitespace-nowrap">
                  {item.name}
                </div>
              </div>

              {/* Score Display */}
              <div className="hidden md:flex space-x-6 w-[716px] h-[29px] justify-evenly font-pro">
                {item.scores.map((score, idx) => (
                  <div key={idx} className="text-xl md:text-2xl">
                    {score}
                  </div>
                ))}
              </div>

              {/* Mobile Score Display */}
              <div className="md:hidden flex flex-col items-end">
                <div className="text-xl font-pro">
                  {item.scores.reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-[#A4A4A4]">Total</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PodiumScoreBoard
