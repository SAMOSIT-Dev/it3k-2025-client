'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import gooseShadow from '../../../public/images/pop_goose/goose-shadow.png'
import styles from '@/app/styles/game/game.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import UniversitySelectModal from './components/UniversitySelectModal'
import Scorebar from './components/Scorebar'
import usePopCatClicker from './hooks/usePopCatClicker'
import { Howl } from 'howler'

const PoppedGoose = ({isPopped} : {isPopped: boolean}) => {
  return (
    <Image
      src={'/images/pop_goose/pop_goose.png'}
      alt="Pop Goose"
      width={500}
      height={500}
      draggable="false"
      priority
      className={`${isPopped ? 'block' : 'hidden'} transition-transform transform active:scale-105 object-contain w-[340px] h-[340px] sm:w-[500px] sm:h-[500px]`}
    />
  )
}

const DefaultGoose = ({isPopped} : {isPopped: boolean}) => {
  return (
    <Image
      src={'/images/pop_goose/default_goose.png'}
      alt="Pop Goose"
      width={500}
      height={500}
      draggable="false"
      priority
      className={`${isPopped ? 'hidden' : 'block'} transition-transform transform active:scale-105 object-contain w-[340px] h-[340px] sm:w-[500px] sm:h-[500px]`}
    />
  )
}

const PopGoosePage = () => {
  const [isModal, setIsModal] = useState(true)
  const [university, setUniversity] = useState('')
  // const [clickCount, setClickCount] = useState(0)
  const [isPopped, setIsPopped] = useState(false)
  const [totalClick, setTotalClick] = useState<number>(0)
  // const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
const audioRef = useRef<Howl>(null)

useEffect(() => {
  audioRef.current = new Howl({
    src: '/audio/popSound.mp3',
    preload: true
  })
}, []) // Initialize once when the component mounts

const playAudio = () => {
  audioRef.current?.play()
}
  
  // const lastClickTime = useRef(0)
  // const clickBuffer = useRef(0)
  // const emitTimeout = useRef<NodeJS.Timeout | null>(null)
  // const clickTimestamps = useRef<number[]>([])
  // const [socketState, setSocketState] = useState<Socket>(null)
  
  const { leaderboardData, registerClick } = usePopCatClicker(university)
  
  // useEffect(() => {
  //   const socket = initSocket()

  //   socket.on('connect', () => {
  //     console.log('connected')
  //     setSocketState(socket)
  //   })

  //   socket.on('updateLeaderboard', (data) => {
  //     setLeaderboardData(data)
  //   })

  //   socket.emit('requestLeaderboard')

  //   return () => {
  //     if (emitTimeout.current) {
  //       clearTimeout(emitTimeout.current)
  //     }
  //     socket.disconnect()
  //   }
  // }, [])

  // const emitClicksToServer = useCallback(() => {
  //   if (clickBuffer.current > 0 && university) {
  //     if (socketState) {
  //       socketState.emit('click', { university, clicks: clickBuffer.current })
  //       clickBuffer.current = 0
  //     }
  //   }

  //   emitTimeout.current = null
  // }, [university, socketState])

  // const handlePress = () => {
    // const now = Date.now()
    // const timeSinceLastClick = now - lastClickTime.current

    // if (timeSinceLastClick < 10) {
    //   console.log('Limit 1')
    //   setIsModal(true)
    //   console.error('Error 403: Big Brain Not Found.')
    //   return
    // }
    // clickTimestamps.current = clickTimestamps.current.filter(
    //   (timestamp) => now - timestamp < 1000
    // )

    // if (clickTimestamps.current.length >= 40) {
    //   setIsModal(true)
    //   console.log('Limit 2')
    //   console.error('Error 403: Big Brain Not Found.')
    //   return
    // }

    // clickTimestamps.current.push(now)
    // lastClickTime.current = now

    // setClickCount((prev) => prev + 1)
    // setIsPopped(true)

    // if (typeof window !== 'undefined') {
    //   if (!audioRef.current) {
    //     audioRef.current = new Audio(popSound)
    //   }
    //   audioRef.current.currentTime = 0
    //   audioRef.current.play()
    // }

    // clickBuffer.current += 1

    // emitTimeout.current = setTimeout(emitClicksToServer, 500)
    
    
    
  // }
  
  const handlePressFinn = () => {
    registerClick()
    setTotalClick((prev) => prev + 1)
  }

  const handleRelease = () => {
    setIsPopped(false)
  }

  const handleUniSelect = useCallback((selectedUni: string) => {
    setIsModal(false)
    setUniversity(selectedUni)
  }, [])

  return (
    <section
      className={`bg-[#9FC5E8] relative mt-[100px] bg-gameBgSm sm:bg-gameBgMd xl:bg-gameBg bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen py-4 select-none  ${styles['no-select']}`}>
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
            {totalClick}
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div
            onClick={() => {
              playAudio()
            }}
            onPointerDown={() => {
              handlePressFinn()
              setIsPopped(true)
            }}
            onPointerUp={handleRelease}>
            <div className='relative w-fit z-20'>
              <PoppedGoose isPopped={isPopped} />
              <DefaultGoose isPopped={isPopped} />
              <Image
                src={gooseShadow}
                alt="Shadow"
                width={300}
                height={80}
                priority
                className="absolute left-1/2 -translate-x-1/2 -z-10 bottom-[30px] w-[180px] h-[30px] sm:w-[280px] sm:h-[50px]"
                draggable="false"
              />
            </div>
          </div>

          <Scorebar leaderboardData={leaderboardData} />
        </div>
      </div>
    </section>
  )
}

export default PopGoosePage
