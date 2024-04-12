import { Application } from 'express'
import { ChannelsRouter } from './channels.route'
import { DirectMessagesRouter } from './directMessages.route'
import { MembersRouter } from './members.route'
import { MessagesRouter } from './messages.route'
import { ServersRouter } from './servers.route'
import { LivekitRouter } from './livekit.route'
import { authentication } from '~/utils/auth.util'
import { ProfileRouter } from './profile.route'
import { ConversationRouter } from './conversation.route'
import { SocketRouter } from './socket.route'
import { createRouteHandler } from 'uploadthing/express'
import { uploadRouter } from '~/uploadthing'

export default function routes(app: Application) {
  app.use('/api/profile', ProfileRouter)

  app.use(authentication)

  app
    .use('/api/channels', ChannelsRouter)
    .use('/api/direct-messages', DirectMessagesRouter)
    .use('/api/members', MembersRouter)
    .use('/api/messages', MessagesRouter)
    .use('/api/servers', ServersRouter)
    .use('/api/livekit', LivekitRouter)
    .use('/api/conversation', ConversationRouter)
    .use('/api/socket', SocketRouter)
    .use(
      '/api/uploadthing',
      createRouteHandler({
        router: uploadRouter
      })
    )
}
