import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { DirectMessagesService } from '~/services/directMessages.service'

class directMessagesController {
  getDirectMessages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get direct messages successfully.',
      data: await DirectMessagesService.getDirectMessages(req)
    }).send(res)
  })
}

export const DirectMessagesController = new directMessagesController()
