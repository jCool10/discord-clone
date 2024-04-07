import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const expressConfig = (app: express.Application) => {
  app
    .use(morgan('dev'))
    .use(helmet.frameguard({ action: 'deny' }))
    .use(helmet.hsts({ maxAge: 2629746000 }))
    .use(
      helmet.contentSecurityPolicy({
        directives: {
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"]
        }
      })
    )
    .use(helmet.noSniff())
    .use(helmet.xssFilter())
    .use(helmet.referrerPolicy({ policy: 'no-referrer' }))
    .use(
      compression({
        level: 6,
        threshold: 100 * 1024,
        filter: (req) => !req.headers['x-no-compress']
      })
    )
    .use(express.json({ limit: '10kb' }))
    .use(express.urlencoded({ extended: true, limit: '10kb' }))
    .use(cookieParser())
    .use(cors({ credentials: true, origin: true }))
}
