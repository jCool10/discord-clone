import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { ConversationService } from '~/services/conversation.service'

class conversationController {
  getOrCreateConversation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get or create conversation successfully.',
      data: await ConversationService.getOrCreateConversation(req)
    }).send(res)
  })
}

export const ConversationController = new conversationController()
