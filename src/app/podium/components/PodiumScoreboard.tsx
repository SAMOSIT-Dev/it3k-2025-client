'use client'

import React from 'react'
import Image from 'next/image'

// Sample data with correct image paths
const scoreboardData = [
  {
    rank: 1,
    name: 'KMUTT',
    logo: '/images/KMUTT_logo.png',
    medals: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    rank: 2,
    name: 'KMITL',
    logo: '/images/KMITL_logo.png',
    medals: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    rank: 3,
    name: 'KMUTNB BKK',
    logo: '/images/KMUTNB_logo.png',
    medals: [999, 999, 999, 999, 999, 999, 999]
  },
  {
    rank: 4,
    name: 'KMUTNB PR',
    logo: '/images/KMUTNB_logo.png',
    medals: [999, 999, 999, 999, 999, 999, 999]
  }
]

// Sports icons (image paths)
const sportsIcons = [
  { src: '/images/บอล.png', alt: 'Football' },
  { src: '/images/บาส.png', alt: 'Basketball' },
  { src: '/images/แบตมินตัน.png', alt: 'Badminton' },
  { src: '/images/ปิงปอง.png', alt: 'Table Tennis' },
  { src: '/images/กรีฑา.png', alt: 'Running' },
  { src: '/images/พื้นบ้าน.png', alt: 'Traditional sports' },
  { src: '/images/Esport.png', alt: 'Esport' }
]

const PodiumScoreBoard = () => {
  return (
    <div className="bg-black min-h-screen text-white p-4 flex flex-col items-center font-BenguiatITCbyBT">
      {/* Header */}
      <div className="w-[1281px] h-[681px]">
        <div className="flex justify-between items-center text-red-500 mb-4">
          <h2 className="text-xl text-[#A4A4A4] font-Prompt">อันดับเหรียญ</h2>

          {/* Sports Icons */}
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

        {/* Scoreboard */}
        <div className="flex flex-col items-center space-y-[26px]">
          {scoreboardData.map((item, index) => (
            <div
              key={index}
              className="w-[1281px] h-[125px] flex items-center justify-between px-6 border border-[#E90000] bg-[#1E0707] rounded-md">
              {/* Rank & Logo */}
              <div className="flex items-center space-x-6 w-[338px] h-[95px] gap-[45px] ">
                <div className="text-[32px]">{item.rank}</div>

                {/* University Logo */}
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

              {/* Medals */}
              <div className="flex space-x-6 text-center w-[716px] h-[29px] justify-evenly">
                {item.medals.map((medal, idx) => (
                  <div key={idx} className="w-10 text-[24px]">
                    {medal}
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
