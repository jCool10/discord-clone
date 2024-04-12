import { SuccessResponse } from '~/core/success.response'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '~/helpers/cathAsync'
import { MembersService } from '~/services/members.service'

class membersController {
  deleteMember = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Delete member successfully.',
      data: await MembersService.deleteMember(req)
    }).send(res)
  })

  updateMember = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Update member successfully.',
      data: await MembersService.updateMember(req)
    }).send(res)
  })

  getMemberById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Find member by id successfully.',
      data: await MembersService.getMemberById(req)
    }).send(res)
  })
}

export const MembersController = new membersController()
