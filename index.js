const http = require('http')
const log = require('debug')('http')

const app = require('./src/server/app')
const socket = require('./src/server/socket')

const PORT = 44190
const server = socket(http.Server(app))

server.listen(PORT, () => log(`Listening on port ${PORT}`))
