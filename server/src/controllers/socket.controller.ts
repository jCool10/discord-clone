import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { SocketService } from '~/services/socket.service'

class socketController {
  createMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Create message by socket successfully.',
      data: await SocketService.createMessageBySocket(req)
    }).send(res)
  })

  deleteMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Delete message by socket successfully.',
      data: await SocketService.deleteMessageBySocket(req)
    }).send(res)
  })

  updateMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update message by socket successfully.',
      data: await SocketService.updateMessageBySocket(req)
    }).send(res)
  })

  createDirectMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Create direct message by socket successfully.',
      data: await SocketService.createDirectMessageBySocket(req)
    }).send(res)
  })

  deleteDirectMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Delete direct message by socket successfully.',
      data: await SocketService.deleteDirectMessageBySocket(req)
    }).send(res)
  })

  updateDirectMessageBySocket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update direct message by socket successfully.',
      data: await SocketService.updateDirectMessageBySocket(req)
    }).send(res)
  })
}

export const SocketController = new socketController()
