import express from 'express'

import { SocketController } from '~/controllers/socket.controller'

const SocketRouter = express.Router()

SocketRouter.post('/messages', SocketController.createMessageBySocket)
  .delete('/messages/:messageId', SocketController.deleteMessageBySocket)
  .patch('/messages/:messageId', SocketController.updateMessageBySocket)
  .post('/direct-messages', SocketController.createDirectMessageBySocket)
  .delete('/direct-messages/:directMessageId', SocketController.deleteDirectMessageBySocket)
  .patch('/direct-messages/:directMessageId', SocketController.updateDirectMessageBySocket)

export { SocketRouter }
