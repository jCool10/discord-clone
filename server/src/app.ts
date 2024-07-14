import express, { Request } from 'express'
import { notFoundError, returnError } from './middlewares/errorHandle.middleware'
import { expressConfig } from './configs/express.config'
import http from 'http'
import { socketConfig } from './configs/socket.config'
import routes from './routes'
import { authentication } from './utils/auth.util'

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const app = express()
const server = http.createServer(app)

expressConfig(app)

socketConfig(server)

// app.use(authentication)

routes(app)

app.use(notFoundError)

app.use(returnError)

export default server
