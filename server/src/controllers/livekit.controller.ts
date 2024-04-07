import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { LivekitService } from '~/services/livekit.service'

class livekitController {
  getToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get token successfully.',
      data: await LivekitService.getToken(req)
    }).send(res)
  })
}

export const LivekitController = new livekitController()
