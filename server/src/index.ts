import app from './app'
import { config } from './configs'

const PORT = config.app.port || 5000

const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

process.on('SIGINT', () => server.close(() => console.log('Exit Server express')))
