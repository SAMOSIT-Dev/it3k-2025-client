import { io, Socket } from 'socket.io-client'

let socket: Socket

export const initSocket = (): Socket => {
  if (!socket && typeof window !== 'undefined') {
    const socketServerUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
    if (!socketServerUrl) {
      throw new Error('Socket server URL is not defined')
    }
    socket = io(socketServerUrl)
  }
  if (!socket) {
    throw new Error('Socket failed to initialize')
  }
  return socket
}

export const getSocket = (): Socket | null => socket
