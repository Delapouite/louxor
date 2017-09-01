const os = require('os')
const http = require('http')
const open = require('opn')
const log = require('debug')('http')

const app = require('./app')
const socket = require('./socket')

module.exports = ({ port, browser }) => {
	const server = socket(http.Server(app))
	server.on('error', console.error)
	server.listen(port, () => {
		const url = `http://${os.hostname()}:${port}`
		log(`Listening on ${url}`)
		if (browser) open(url)
	})
}

