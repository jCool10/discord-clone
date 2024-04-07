import express from 'express'
import { ChannelsRouter } from './channels.route'
import { DirectMessagesRouter } from './directMessages.route'
import { MembersRouter } from './members.route'
import { MessagesRouter } from './messages.route'
import { ServersRouter } from './servers.route'
import { LivekitRouter } from './livekit.route'
import { UploadthingRouter } from './uploadthing.route'
import { authentication } from '~/utils/auth.util'
import { ProfileRouter } from './profile.route'
import { ConversationRouter } from './conversation.route'

const router = express.Router()

router.use('/profile', ProfileRouter)

router.use(authentication)

router
  .use('/channels', ChannelsRouter)
  .use('/direct-messages', DirectMessagesRouter)
  .use('/members', MembersRouter)
  .use('/messages', MessagesRouter)
  .use('/servers', ServersRouter)
  .use('/livekit', LivekitRouter)
  .use('/conversation', ConversationRouter)

export { router }
