import express from 'express'
import { ChannelsController } from '~/controllers/channels.controller'

const ChannelsRouter = express.Router()

ChannelsRouter.post('/', ChannelsController.createChannel)
  .delete('/:channelId', ChannelsController.deleteChannel)
  .put('/:channelId', ChannelsController.updateChannel)
  .get('/:channelId', ChannelsController.getChannelById)

export { ChannelsRouter }
