import express from 'express'
import { ServersController } from '~/controllers/servers.controller'

const ServersRouter = express.Router()

ServersRouter.post('/', ServersController.createServer)
  .get('/:serverId/profile', ServersController.getServerAndProfileById)
  .get('/profile', ServersController.findServerByProfile)
  .get('/profile/all', ServersController.findServersByProfile)
  .delete('/:serverId', ServersController.deleteServer)
  .patch('/:serverId', ServersController.updateServer)
  .patch('/:serverId/leave', ServersController.leaveServer)
  .patch('/:serverId/invite-code', ServersController.inviteServer)
  .get('/:serverId', ServersController.findServerByIdAndProfile)
  .get('/invite-code/:inviteCode', ServersController.getServerByInviteCode)
  .patch('/invite-code/:inviteCode', ServersController.updateServerByInviteCode)

export { ServersRouter }
