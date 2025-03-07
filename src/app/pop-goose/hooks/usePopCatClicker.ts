import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useCPSTimer from './useCPSTimer'
import { Socket } from 'socket.io-client'
import { initSocket } from '../utils/socket'
import { debounce } from 'lodash'

interface LeaderboardEntry {
  rank: string
  university: string
  clicks: string
}

const usePopCatClicker = (university: string) => {
  const { startCPSTimer, calculateCPS } = useCPSTimer()
  const socket = useRef<Socket>(undefined)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const tempTotalClick = useRef(0)
  const currentCPS = useRef(0)

  // Setup Socket connection
  useEffect(() => {
    socket.current = initSocket()

    socket.current?.on('connect', () => {
    })

    socket.current?.on('updateLeaderboard', (data) => {
      setLeaderboardData(data)
    })

    socket.current?.emit('requestLeaderboard')

    return () => {
      if (socket) {
        socket.current?.disconnect()
      }
    }
  }, [socket])

  const serverRequestCriteria = useCallback(() => {
    const CPS_LIMIT = 60
    currentCPS.current = calculateCPS(tempTotalClick.current)
    return currentCPS.current < CPS_LIMIT
  }, [calculateCPS])

  const sendServerClick = useMemo(
    () =>
      debounce(() => {
        // Send 1 click session worth of data
        if (tempTotalClick.current > 0) {
          if (!serverRequestCriteria) return
          for (let i = 0; i < tempTotalClick.current; i++) {
            // Send one click per session
            socket.current?.emit('click', {
              university,
              clicks: 1 // Sending 1 click at a time
            })
          }
          tempTotalClick.current = 0 // Reset session click count
        }
      }, 1000), // Trigger after 1 second of inactivity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [university]
  )
  const registerClick = () => {
    startCPSTimer()
    tempTotalClick.current += 1
    
    sendServerClick()
  }

  return {
    leaderboardData,
    tempTotalClick,
    registerClick,
    sendServerClick,
    serverRequestCriteria,
  }
}

export default usePopCatClicker
