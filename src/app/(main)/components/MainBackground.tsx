import Image from 'next/image'
import React from 'react'

const MainBackground = () => {
  return (
    <div className="absolute bottom-0 overflow-hidden -z-10 w-[150%] sm:w-[100%] left-1/2 -translate-x-1/2 max-h-screen overflow-y-hidden">
      <Image
        src="/images/backgrounds/main_background.png"
        alt="main background"
        width={2000}
        height={2100}
      />
    </div>
  )
}

export default MainBackground