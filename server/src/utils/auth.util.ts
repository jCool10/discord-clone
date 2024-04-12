import { NextFunction, Request, Response } from 'express'
import { db } from '~/configs/prisma.config'
import { NotFoundError, UnauthorizedError } from '~/core/error.response'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'Authorization',
  REFRESH_TOKEN: 'refresh-token',
  USER_ID: 'user-id',
  BEARER: 'Bearer '
}

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new UnauthorizedError('User not found.')
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: authorization
    }
  })

  if (!profile) {
    throw new UnauthorizedError('User not found.')
  }

  req.profile = profile

  next()
}

export { authentication }
