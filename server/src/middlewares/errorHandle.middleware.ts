import { NextFunction, Request, Response } from 'express'
import { BaseError, NotFoundError } from '../core/error.response'

const returnError = (error: BaseError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error',
    error: error.errors
  })
}

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError('Not found')
  next(error)
}

export { notFoundError, returnError }
