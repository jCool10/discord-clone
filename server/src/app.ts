import express from 'express'
import { notFoundError, returnError } from './middlewares/errorHandle.middleware'
import { expressConfig } from './configs/express.config'
import http from 'http'
import { socketConfig } from './configs/socket.config'
import routes from './routes'

const app = express()
const server = http.createServer(app)

expressConfig(app)

socketConfig(server)

routes(app)

app.use(notFoundError)

app.use(returnError)

export default server
