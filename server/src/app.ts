import express from 'express'
import { router } from './routes'
import { notFoundError, returnError } from './middlewares/errorHandle.middleware'
import { expressConfig } from './configs/express.config'
import { createRouteHandler } from 'uploadthing/express'
import { uploadRouter } from './uploadthing'

const app = express()

expressConfig(app)

app.use('/api', router)

app.use(
  '/api/uploadthing',
  createRouteHandler({
    router: uploadRouter
  })
)

app.use(notFoundError)

app.use(returnError)

export default app
