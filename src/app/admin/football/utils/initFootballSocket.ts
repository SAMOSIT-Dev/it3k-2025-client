import { io, Socket } from 'socket.io-client'

let socket: Socket
const socketServerUrl =
  process.env.NEXT_PUBLIC_DEFAULT_API_BASE_URL || 'http://localhost:8083'

export const initFootballSocket = (): Socket => {
  socket = io(socketServerUrl, {
    transports: ['websocket'],
    withCredentials: true,
    path: '/api/football-service/socket'
  })

  if (!socket) {
    throw new Error('Socket failed to initialize')
  }

  return socket
}

export const getFootballSocket = (): Socket | null => {
  if (socket && socket.connected) {
    return socket
  }
  console.warn('Socket is not connected')
  return null
}
