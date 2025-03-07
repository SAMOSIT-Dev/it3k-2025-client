import { io, Socket } from 'socket.io-client'

let socket: Socket

const SOCKET_URL = process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL || 'http://localhost:8083'

export const initFootballSocket = (): Socket => {
  if (!socket && typeof window !== 'undefined') {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      path: '/api/football-service/socket'
    })
  }
  if (!socket) {
    throw new Error('Socket failed to initialize')
  }
  return socket
}

export const getFootballSocket = (): Socket | null => socket
