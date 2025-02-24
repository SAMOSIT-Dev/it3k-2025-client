'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import defaultGoose from '../../../public/images/pop_goose/default_goose.png'
import popGoose from '../../../public/images/pop_goose/pop_goose.png'
import gooseShadow from '../../../public/images/pop_goose/goose-shadow.png'
import ScoreBar from './components/ScoreBar'
import styles from '@/app/styles/game/game.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

const PopGoosePage = () => {
  const [score, setScore] = useState(0)
  const [isPopped, setIsPopped] = useState(false)

  const handlePress = useCallback(() => {
    setScore((prev) => prev + 1)
    setIsPopped(true)
  }, [])

  const handleRelease = useCallback(() => {
    setIsPopped(false)
  }, [])

  return (
    <section
      className={`bg-[#9FC5E8] bg-gameBgSm sm:bg-gameBgMd xl:bg-gameBg bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen py-4 select-none  ${styles['no-select']}`}>
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
            {score}
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <Image
            src={gooseShadow}
            alt="Shadow"
            width={300}
            height={80}
            priority
            className="absolute right-[70px] sm:right-[250px] md:right-[280px] lg:right-[270px] bottom-[60px] sm:bottom-[100px] w-[180px] h-[30px] sm:w-[280px] sm:h-[50px]"
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
          <ScoreBar kmutt={19999} kmilt={888888} kmutnb_bkk={777777} />
        </div>
      </div>
    </section>
  )
}

export default PopGoosePage
