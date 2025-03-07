'use client'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL =
  process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL || 'http://localhost:8083'

const useFootballSocket = () => {
  const [scoreboard, setScoreboard] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      path: '/api/football-service/socket'
    })

    socket.on('connect', () => {
      console.log('Connected to WebSocket:', socket.id)
    })

    socket.on('updateDashboard', (data) => {
      console.log('Received dashboard update:', data)
      setScoreboard(data)
    })

    socket.on('updateScoreboard', (data) => {
      console.log('Received opening match update:', data)
      setMatches(data)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return { scoreboard, matches }
}

export default useFootballSocket
