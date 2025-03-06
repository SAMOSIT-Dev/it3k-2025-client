import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BasketballMatch, DashboardEntry } from '../interfaces/basketball'

export const useFetchBasketball = () => {
  const [matches, setMatches] = useState<BasketballMatch[]>([])
  const [entries, setEntries] = useState<DashboardEntry[]>([])
  const SOCKET_URL =
    process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL || 'http://localhost:8083'
  const SOCKET_PATH = '/api/basketball-service/socket/'
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      path: SOCKET_PATH
    })

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket:', socket.id)
    })
    socket.on('updateDashboard', (data) => {
      if (data.length === 0) {
        console.warn('⚠️ No match data received!')
      }
      setEntries(data)
    })
    socket.on('updateScoreboard', (data) => {
      if (data.length === 0) {
        console.warn('⚠️ No match data received!')
      }
      setMatches(data)
    })

    socket.on('connect_error', (err) => {
      console.error('❌ WebSocket Connection Error:', err)
    })

    return () => {
      socket.disconnect()
    }
  }, [SOCKET_URL])

  return { matches, entries }
}
