'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import BasketBallCard from './components/BastketballCard'
import { useRouter } from 'next/navigation'
const BasketBall = () => {
  const mock = [
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    },
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    },
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    },
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    }
  ]
  const router = useRouter()

  return (
    <div className=" flex flex-col w-full min-h-[calc(100vh-100px)] flex-1  items-center py-12  bg-black-300  space-y-2 sm:space-y-4 lg:space-y-8 font-Prompt bg-cover bg-bottom" style={{ backgroundImage: "url('/images/backgrounds/basketballBackground.png')" }} >
      <div className="flex items-center w-full  pl-[5%] md:pl-[10%] mb-5">
        <button onClick={() => router.push('/scoreboards')}>
          <Icon
            icon={'solar:alt-arrow-left-bold'}
            className="lg:text-6xl md:5xl text-4xl p-0 cursor-pointer text-white"
          />
        </button>
        <h1 className="text-3xl text-white lg:text-4xl font-bold ">
          Basketball
        </h1>
      </div>
      <div className='flex flex-col items-center w-full h-full space-y-4 sm:space-y-6 lg:space-y-8'>
        {mock.map((data, index) => {
          return <BasketBallCard data={data} key={index} />
        })}
      </div>
    </div>
  )
}
export default BasketBall
