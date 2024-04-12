'use strict'

import { StatusCodes, ReasonPhrases } from 'http-status-codes'

declare class Error {
  public name: string
  public message: string
  public stack: string
  public status: number
  public isOperational: boolean
  public errors: any
  constructor(message: string)
}

class BaseError extends Error {
  constructor(message: string, status: number, errors: any, isOperational: boolean) {
    super(message)
    this.status = status
    this.errors = errors
    this.isOperational = isOperational

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

class NotFoundError extends BaseError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    errors = [],
    status = StatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

class UnauthorizedError extends BaseError {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    errors = [],
    status = StatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

class BadRequestError extends BaseError {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    errors = [],
    status = StatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export { BaseError, NotFoundError, UnauthorizedError, BadRequestError }
