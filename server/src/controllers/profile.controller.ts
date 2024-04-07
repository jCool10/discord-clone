import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { ProfileService } from '~/services/profile.service'

class profileController {
  checkProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Check profile successfully.',
      data: await ProfileService.checkProfile(req)
    }).send(res)
  })
}

export const ProfileController = new profileController()
