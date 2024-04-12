import { Server, Socket } from 'socket.io'
import http from 'http'

export const socketConfig = (server: http.Server) => {
  const io = new Server(server, {
    path: '/api/socket/io',
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }
  })

  io.on('connection', (socket: Socket) => {
    console.log(`a user connected, ${socket.id}`)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  global.io = io
}
