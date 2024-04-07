import express from 'express'
import { ConversationController } from '~/controllers/conversation.controller'

const ConversationRouter = express.Router()

ConversationRouter.post('/', ConversationController.getOrCreateConversation)

export { ConversationRouter }
