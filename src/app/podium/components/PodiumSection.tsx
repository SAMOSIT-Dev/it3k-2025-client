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

// ฟังก์ชันคำนวณคะแนนรวม
const calculateTotalScore = (scores: number[]) =>
  scores.reduce((a, b) => a + b, 0)

const PodiumSection: React.FC<PodiumSectionProps> = ({ scoreboardData }) => {
  // ตรวจสอบว่า scoreboardData เป็น array ก่อนใช้ map()
  const rankedTeams = Array.isArray(scoreboardData)
    ? [...scoreboardData]
        .map((team) => ({
          ...team,
          totalScore: calculateTotalScore(team.scores)
        }))
        .sort((a, b) => b.totalScore - a.totalScore) // เรียงจากคะแนนมากไปน้อย
        .slice(0, 3) // เอาแค่ 3 อันดับแรก
    : []

  // CSS Gradient
  const podiumGradient =
    'linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0.7) 25%, rgba(255,0,0,0.4) 100%)'

  return (
    <div className="relative w-[937px] h-[630px] mx-auto flex justify-center">
      {/* Podium Container */}
      <div className="absolute bottom-0 flex justify-center items-end gap-4">
        {/* Rank 2 */}
        {rankedTeams[1] && (
          <div className="relative flex flex-col items-center w-[312px]">
            <Image
              src={rankedTeams[1].logo}
              alt={rankedTeams[1].name}
              width={130}
              height={130}
              className="m-4 -top-[65px] rounded-full border border-[#E90000]"
              priority
            />
            <div
              className="w-full h-[231px] flex flex-col justify-center items-center rounded-t-md"
              style={{ background: podiumGradient }}>
              <span className="text-white text-lg font-bold">
                {rankedTeams[1].name}
              </span>
              <div className="flex items-center mt-2">
                <Image
                  src="/images/medal.png"
                  alt="medal"
                  width={20}
                  height={20}
                />
                <span className="text-white text-lg ml-2">
                  {rankedTeams[1].totalScore}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {rankedTeams[0] && (
          <div className="relative flex flex-col items-center w-[312px]">
            <Image
              src={rankedTeams[0].logo}
              alt={rankedTeams[0].name}
              width={160}
              height={160}
              className="m-4 -top-[80px] rounded-full border border-[#E90000]"
              priority
            />
            <div
              className="w-full h-[328px] flex flex-col justify-center items-center rounded-t-md"
              style={{ background: podiumGradient }}>
              <span className="text-white text-lg font-bold">
                {rankedTeams[0].name}
              </span>
              <div className="flex items-center mt-2">
                <Image
                  src="/images/medal.png"
                  alt="medal"
                  width={20}
                  height={20}
                />
                <span className="text-white text-lg ml-2">
                  {rankedTeams[0].totalScore}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {rankedTeams[2] && (
          <div className="relative flex flex-col items-center w-[312px]">
            <Image
              src={rankedTeams[2].logo}
              alt={rankedTeams[2].name}
              width={100}
              height={100}
              className="m-4 -top-[50px] rounded-full border border-[#E90000]"
              priority
            />
            <div
              className="w-full h-[156px] flex flex-col justify-center items-center rounded-t-md"
              style={{ background: podiumGradient }}>
              <span className="text-white text-lg font-bold">
                {rankedTeams[2].name}
              </span>
              <div className="flex items-center mt-2 ">
                <Image
                  src="/images/medal.png"
                  alt="medal"
                  width={20}
                  height={20}
                />
                <span className="text-white text-lg ml-2">
                  {rankedTeams[2].totalScore}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PodiumSection
