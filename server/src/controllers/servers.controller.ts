import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { ServersService } from '~/services/servers.serivice'

class serversController {
  createServer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Create server successfully.',
      data: await ServersService.createServer(req)
    }).send(res)
  })

  deleteServer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Delete server successfully.',
      data: await ServersService.deleteServer(req)
    }).send(res)
  })

  updateServer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update server successfully.',
      data: await ServersService.updateServer(req)
    }).send(res)
  })

  leaveServer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Leave server successfully.',
      data: await ServersService.leaveServer(req)
    }).send(res)
  })

  inviteServer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Invite server successfully.',
      data: await ServersService.inviteServer(req)
    }).send(res)
  })

  findServerByProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Find server by profile successfully.',
      data: await ServersService.findServerByProfile(req)
    }).send(res)
  })

  findServersByProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Find servers by profile successfully.',
      data: await ServersService.findServersByProfile(req)
    }).send(res)
  })

  findServerByIdAndProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Find server by id and profile successfully.',
      data: await ServersService.findServerByIdAndProfile(req)
    }).send(res)
  })

  getServerAndProfileById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get server and profile by id successfully.',
      data: await ServersService.getServerAndProfileById(req)
    }).send(res)
  })

  getServerByInviteCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get server by invite code successfully.',
      data: await ServersService.getServerByInviteCode(req)
    }).send(res)
  })

  updateServerByInviteCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update server by invite code successfully.',
      data: await ServersService.updateServerByInviteCode(req)
    }).send(res)
  })
}

export const ServersController = new serversController()
