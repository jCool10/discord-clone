import express from 'express'
import { ProfileController } from '~/controllers/profile.controller'

const ProfileRouter = express.Router()

ProfileRouter.post('', ProfileController.checkProfile)

export { ProfileRouter }
