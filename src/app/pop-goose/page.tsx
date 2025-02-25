'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import defaultGoose from '../../../public/images/pop_goose/default_goose.png'
import popGoose from '../../../public/images/pop_goose/pop_goose.png'
import gooseShadow from '../../../public/images/pop_goose/goose-shadow.png'
import styles from '@/app/styles/game/game.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import Leaderboard from './components/LeaderBoard'
import { initSocket } from './utils/socket'
import UniversitySelectModal from './components/UniversitySelectModal'

interface LeaderboardEntry {
  rank: string
  university: string
  clicks: string
}

const PopGoosePage = () => {
  const [isModal, setIsModal] = useState(true)
  const [university, setUniversity] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [isPopped, setIsPopped] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const socket = initSocket()

    socket.on('connect', () => {
      console.log('Connected: ', socket.id)
    })

    socket.on('updateLeaderboard', (data) => {
      console.log('Retrieve latest leaderboard data', data)
      setLeaderboardData(data)
    })

    socket.emit('requestLeaderboard')

    return () => {
      socket.disconnect()
    }
  }, [])

  const handlePress = useCallback(() => {
    setClickCount((prev) => prev + 1)
    setIsPopped(true)

    const socket = initSocket()
    socket.emit('click', { university, clicks: 1 })
  }, [university])

  const handleRelease = useCallback(() => {
    setIsPopped(false)
  }, [])

  const handleUniSelect = useCallback((selectedUni: string) => {
    setIsModal(false)
    setUniversity(selectedUni)
  }, [])

  return (
    <section
      className={`bg-[#9FC5E8] bg-gameBgSm sm:bg-gameBgMd xl:bg-gameBg bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen py-4 select-none  ${styles['no-select']}`}>
      {isModal && <UniversitySelectModal onSubmit={handleUniSelect} />}

      <Link href={'/'}>
        <Icon
          icon={'bxs:left-arrow'}
          className="text-[#e9000080] absolute top-[50px] sm:top-[80px] sm:left-[80px] text-2xl sm:text-5xl xl:text-6xl"
        />
      </Link>
      <div className="flex flex-col h-[600px] sm:h-[700px] xl:h-full items-center justify-between space-y-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-RampartOne text-[#FFF]">
            POP GOOSE
          </h1>
          <p className="text-3xl sm:text-4xl font-ReemKufiInk text-[#FFF] pt-2">
            {clickCount}
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <Image
            src={gooseShadow}
            alt="Shadow"
            width={300}
            height={80}
            priority
            className="absolute right-[70px] sm:right-[200px] md:right-[220px] lg:right-[270px] bottom-[60px] sm:bottom-[100px] w-[180px] h-[30px] sm:w-[280px] sm:h-[50px]"
            draggable="false"
          />

          <div
            onMouseDown={handlePress}
            onMouseUp={handleRelease}
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}>
            <Image
              src={isPopped ? popGoose : defaultGoose}
              alt="Pop Goose"
              width={500}
              height={500}
              draggable="false"
              priority
              className="transition-transform transform active:scale-105 object-contain w-[340px] h-[340px] sm:w-[500px] sm:h-[500px]"
            />
          </div>

          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      </div>
    </section>
  )
}

export default PopGoosePage
