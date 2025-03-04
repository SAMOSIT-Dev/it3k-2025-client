'use client'

import BasketBallCard from './components/BastketballCard'
import { BasketballMatch } from './interfaces/basketball'
import { mockBasketBallMatches } from './interfaces/basketball'
// import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import TableComponent from '@/shared/components/TableComponent'
import TeamCell from '@/shared/components/TeamCell'
import { Team } from '@/shared/utils/team'
import BackButton from '@/shared/components/BackButton'

const BasketBall = () => {
  const [matches, setMatches] = useState<BasketballMatch[]>([])
  useEffect(() => {
    setMatches(mockBasketBallMatches);
  }, []);
  // useEffect(() => {
  //   const socket = io(SOCKET_URL, {
  //     transports: ['websocket'],
  //     withCredentials: true,
  //     path: SOCKET_PATH
  //   })

  //   socket.on('connect', () => {
  //     console.log('✅ Connected to WebSocket:', socket.id)
  //   })

  //   socket.on('updateScoreboard', (data) => {
  //     console.log('📢 Received updateScoreboard event:', data)
  //     if (data.length === 0) {
  //       console.warn('⚠️ No match data received!')
  //     }
  //     setMatches(data)
  //   })

  //   socket.on('connect_error', (err) => {
  //     console.error('❌ WebSocket Connection Error:', err)
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])
  // const SOCKET_URL = 'http://it3k-in.sit.kmutt.ac.th/'
  // const SOCKET_PATH = '/api/basketball-service/socket/'

  const header = ['อันดับ', 'TEAM', 'WIN_LOSE', 'POINT', 'POINT DIFF']
  const tableData = [
    [1, <TeamCell key="team-kmutt" team={Team.KMUTT} />, '0-0', '0-0', 0],
    [1, <TeamCell key="team-kmitl" team={Team.KMITL} />, '0-0', '0-0', 0],
    [1, <TeamCell key="team-kmutnb" team={Team.KMUTNB} />, '0-0', '0-0', 0],
    [1, <TeamCell key="team-kmutnbpr" team={Team.KMUTNBPR} />, '0-0', '0-0', 0]
  ]
  const getColumnstyle = (colIndex: number) => {
    if (colIndex === 0) return 'font-bold'
    if (colIndex === 1) return 'w-1/3'
    return ''
  }

  return (
    <div
      className=" flex flex-col w-full min-h-[calc(100vh-100px)] flex-1  items-center pb-12  bg-black-300 font-Prompt bg-cover bg-bottom"
      style={{
        backgroundImage: "url('/images/backgrounds/basketballBackground.png')"
      }}>
      <div className=" w-[90%] mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1 text-white ">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ">
          Basketball
        </h1>
      </div>
      <div className="w-[90%]">
        <TableComponent
          highlighted={true}
          edgeBorder={true}
          header={header}
          data={tableData}
          columnStyles={getColumnstyle}
        />
      </div>
      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white my-4 sm:my-8">
        Opening Match
      </p>
      <div className="flex flex-col items-center w-full h-full space-y-4 sm:space-y-6 lg:space-y-8">
        {/* {matches?.length === 0 ? (
          <p className="text-white text-sm">Loading...</p>
        ) : ( */}
        {/* matches?.map((match, index) => (
             <BasketBallCard data={match} key={index} />
           )) */}
        {matches?.map((match, index) => (
          <BasketBallCard data={match} key={index} />
        ))}
        {/* )} */}
      </div>
    </div>
  )
}
export default BasketBall
