import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { MessagesService } from '~/services/messages.service'

class messagesController {
  getMessages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get messages successfully.',
      data: await MessagesService.getMessages(req)
    }).send(res)
  })
}

export const MessagesController = new messagesController()
