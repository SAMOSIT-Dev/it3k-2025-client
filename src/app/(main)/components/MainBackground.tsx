import Image from 'next/image'
import React from 'react'

const MainBackground = () => {
  return (
    <div className='absolute bottom-0 -z-10 w-[600px] sm:w-[1000px] md:w-full sm:-bottom-[200px] h-fit x-fit left-1/2 -translate-x-1/2'>
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