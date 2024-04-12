import express from 'express'
import { MembersController } from '~/controllers/members.controller'

const MembersRouter = express.Router()

MembersRouter.delete('/:memberId', MembersController.deleteMember)
  .patch('/:memberId', MembersController.updateMember)
  .get('/:memberId', MembersController.getMemberById)

export { MembersRouter }
