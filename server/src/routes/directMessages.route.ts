import express from 'express'
import { DirectMessagesController } from '~/controllers/directMessages.controller'

const DirectMessagesRouter = express.Router()

DirectMessagesRouter.get('/', DirectMessagesController.getDirectMessages)

export { DirectMessagesRouter }
