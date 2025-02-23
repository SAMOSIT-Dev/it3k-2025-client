'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import defaultGoose from '../../../public/images/pop_goose/default_goose.png'
import popGoose from '../../../public/images/pop_goose/pop_goose.png'
import gooseShadow from '../../../public/images/pop_goose/goose-shadow.png'
import ScoreBar from './components/ScoreBar'

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
    <section className="bg-[#9FC5E8] bg-gameBg bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen pt-4">
      {/* Navbar */}

      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-7xl font-RampartOne text-[#FFF]">POP GOOSE</h1>
        <p className="text-3xl font-ReemKufiInk text-[#FFF] pt-2">{score}</p>

        <div className="relative flex flex-col items-center">
          <Image
            src={gooseShadow}
            alt="Shadow"
            width={300}
            height={80}
            className="absolute right-[80px] bottom-[40px]"
            draggable="false"
          />

          {isPopped && (
            <div className="absolute right-6 bottom-16 bg-[#FFE7B8] h-[360px] w-[380px] opacity-50 blur-3xl rounded-full" />
          )}

          <button
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
              className="transition-transform transform active:scale-105 object-contain w-[500px] h-[500px]"
            />
          </button>
        </div>

        <ScoreBar kmutt={19999} kmilt={888888} kmutnb_bkk={777777} />
      </div>
    </section>
  )
}

export default PopGoosePage
