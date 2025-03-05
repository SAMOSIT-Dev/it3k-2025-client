'use client'
import useFootballSocket from '../hooks/useFootballSocket'
import FootballTable from './FootballTable'
import MatchList from './MatchList'

const FootballLive = () => {
  const { scoreboard, matches } = useFootballSocket()

  return (
    <>
      <FootballTable liveData={scoreboard} />
      <div className="flex flex-col w-full items-center lg:-ml-4 md:-ml-2 -ml-1">
        <h1 className="mt-4 mb-4 md:mb-8 md:mt-8 text-2xl font-bold">
          Opening Match
        </h1>
        <div className="w-[100%] md:max-w-[550px] mb-8">
          <MatchList liveData={matches} />
        </div>
      </div>
    </>
  )
}

export default FootballLive
