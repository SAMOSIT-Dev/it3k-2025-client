'use client'
import styles from '@/app/styles/floatingPopGoose.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const FloatingPopGoose = () => {
  const router = useRouter()
  const [isMediumDisplay, setIsMediumDisplay] = useState<boolean | null>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1024) {
        setIsMediumDisplay(true)
      } else {
        setIsMediumDisplay(false)
      }
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  if (isMediumDisplay === null) {
    return null
  }

  return (
    <div
      onClick={() => router.push('/pop-goose')}
      className={`fixed bottom-4 right-4 flex items-center justify-center cursor-pointer font-PressStart2P
                   w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full shadow-lg z-50
                   ${styles.floating} ${styles['gradient-bg']}`}>
      <div className="flex flex-col items-center justify-center">
        {!isMediumDisplay && (
          <span className="font-Pixel lg:text-[0.7rem] xl:text-[0.6rem] text-white mt-2">
            POPGOOSE
          </span>
        )}
        <Image
          src="/images/pop.png"
          alt="Goose"
          width={40}
          height={40}
          className="md:w-16 md:h-16 lg:w-20 lg:h-20 mt-2"
        />
      </div>
    </div>
  )
}

export default FloatingPopGoose