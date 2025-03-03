'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import defaultGoose from '../../../public/images/pop_goose/default_goose.png'
import popGoose from '../../../public/images/pop_goose/pop_goose.png'
import gooseShadow from '../../../public/images/pop_goose/goose-shadow.png'
import styles from '@/app/styles/game/game.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { initSocket } from './utils/socket'
import UniversitySelectModal from './components/UniversitySelectModal'
import Scorebar from './components/Scorebar'

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
  const popSound = '/audio/popSound.mp3'
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const lastClickTime = useRef(0)
  const clickBuffer = useRef(0)
  const emitTimeout = useRef<NodeJS.Timeout | null>(null)
  const clickTimestamps = useRef<number[]>([])

  useEffect(() => {
    const socket = initSocket()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('updateLeaderboard', (data) => {
      setLeaderboardData(data)
    })

    socket.emit('requestLeaderboard')

    return () => {
      if (emitTimeout.current) {
        clearTimeout(emitTimeout.current)
      }
      socket.disconnect()
    }
  }, [])

  const emitClicksToServer = useCallback(() => {
    if (clickBuffer.current > 0 && university) {
      const socket = initSocket()
      socket.emit('click', { university, clicks: clickBuffer.current })
      clickBuffer.current = 0
    }

    emitTimeout.current = null
  }, [university])

  const handlePress = useCallback(() => {
    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime.current

    if (timeSinceLastClick < 10) {
      setIsModal(true)
      console.error('Error 403: Big Brain Not Found.')
      return
    }
    clickTimestamps.current = clickTimestamps.current.filter(
      (timestamp) => now - timestamp < 1000
    )

    if (clickTimestamps.current.length >= 40) {
      setIsModal(true)
      console.error('Error 403: Big Brain Not Found.')
      return
    }

    clickTimestamps.current.push(now)
    lastClickTime.current = now

    setClickCount((prev) => prev + 1)
    setIsPopped(true)

    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(popSound)
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    clickBuffer.current += 1

    if (!emitTimeout.current) {
      emitTimeout.current = setTimeout(emitClicksToServer, 500)
    }
  }, [emitClicksToServer])

  const handleRelease = useCallback(() => {
    setIsPopped(false)
  }, [])

  const handleUniSelect = useCallback((selectedUni: string) => {
    setIsModal(false)
    setUniversity(selectedUni)
  }, [])

  return (
    <section
      className={`bg-[#9FC5E8] relative bg-gameBgSm sm:bg-gameBgMd xl:bg-gameBg bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen py-4 select-none  ${styles['no-select']}`}>
      {isModal && <UniversitySelectModal onSubmit={handleUniSelect} />}

      <Link href={'/'}>
        <Icon
          icon={'bxs:left-arrow'}
          className="text-[#e9000080] absolute top-[50px] sm:top-[50px] sm:left-[80px] text-2xl sm:text-5xl xl:text-6xl"
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
          <div
            className="relative"
            onPointerDown={handlePress}
            onPointerUp={handleRelease}>
            <Image
              src={gooseShadow}
              alt="Shadow"
              width={300}
              height={80}
              priority
              className="absolute right-[70px] sm:right-[100px]  bottom-[30px] sm:bottom-[40px] w-[180px] h-[30px] sm:w-[280px] sm:h-[50px]"
              draggable="false"
            />

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

          <Scorebar leaderboardData={leaderboardData} />
        </div>
      </div>
    </section>
  )
}

export default PopGoosePage
