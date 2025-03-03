'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import BasketBallCard from './components/BastketballCard'
import { useRouter } from 'next/navigation'
import { mockBasketBallMatches } from './interfaces/basketball'
const BasketBall = () => {

  const router = useRouter()
  // const { matches, loading, error } = useFetchBasketballMatch();

  // if (loading) return <p>Loading match data...</p>;
  // if (error) return <p>Error: {error}</p>;
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
        {/* {matches?.map((match, index) => {
          return <BasketBallCard data={match} key={index} />
        })} */}
         {mockBasketBallMatches?.map((match, index) => {
          return <BasketBallCard data={match} key={index} />
        })}
      </div>
    </div>
  )
}
export default BasketBall
