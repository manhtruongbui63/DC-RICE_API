import socketIo from 'socket.io'
import { env } from '@/configs/evironment'
import { LIST_METHODS } from '@/utils/constants'

const socket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: env.FRONT_END_URL,
      methods: LIST_METHODS
    }
  })
  io.on('connection', (socket) => {
    socket.on('createOrder', (data) => {
      io.emit('newOrder', data)
    })
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Client disconnected')
    })
  })
  return io
}

module.exports = {
  socket
}
