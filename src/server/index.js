const http = require('http')
const log = require('debug')('http')

const app = require('./app')
const socket = require('./socket')

module.exports = (port) => {
	const server = socket(http.Server(app))
	server.listen(port, () => log(`Listening on port ${port}`))
}

