import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { ChannelsService } from '~/services/channels.service'

class channelsController {
  createChannel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Create channel successfully.',
      data: await ChannelsService.createChannel(req)
    }).send(res)
  })

  deleteChannel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Delete channel successfully.',
      data: await ChannelsService.deleteChannel(req)
    }).send(res)
  })

  updateChannel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update channel successfully.',
      data: await ChannelsService.updateChannel(req)
    }).send(res)
  })

  getChannelById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Find channel by id successfully.',
      data: await ChannelsService.getChannelById(req)
    }).send(res)
  })
}

export const ChannelsController = new channelsController()
