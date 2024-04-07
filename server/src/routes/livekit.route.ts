import express from 'express'
import { LivekitController } from '~/controllers/livekit.controller'

const LivekitRouter = express.Router()

LivekitRouter.get('/', LivekitController.getToken)

export { LivekitRouter }
