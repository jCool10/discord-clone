import express from 'express'
import { createUploadthingExpressHandler } from 'uploadthing/express'
import { uploadRouter } from '~/uploadthing'

const UploadthingRouter = express.Router()

UploadthingRouter.use(
  '/',
  createUploadthingExpressHandler({
    router: uploadRouter
  })
)

export { UploadthingRouter }
