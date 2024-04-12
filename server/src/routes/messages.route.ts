import express from 'express'
import { MessagesController } from '~/controllers/messages.controller'

const MessagesRouter = express.Router()

MessagesRouter.get('/', MessagesController.getMessages)

export { MessagesRouter }
