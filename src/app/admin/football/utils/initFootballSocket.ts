import { io, Socket } from 'socket.io-client'

let socket: Socket

export const initFootballSocket = (): Socket => {
  if (!socket && typeof window !== 'undefined') {
    const socketServerUrl = 'it3k-in.sit.kmutt.ac.th'
    const socketServerPath = '/api/admin-service/socket/'
    if (!socketServerUrl) {
      throw new Error('Socket server URL is not defined')
    }
    socket = io(socketServerUrl, {
      transports: ['websocket'], // Force WebSocket connection
      withCredentials: true,
      secure: true,
      path: socketServerPath
    })
  }
  if (!socket) {
    throw new Error('Socket failed to initialize')
  }
  return socket
}

export const getFootballSocket = (): Socket | null => socket