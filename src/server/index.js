// @flow

const os = require('os')
const http = require('http')
const open = require('open')
const log = require('debug')('http')

const app = require('./app')
const socket = require('./socket')

module.exports = ({ port, browser } /*: { port: number, browser: boolean } */) => {
	const server = socket(http.createServer(app))
	server.on('error', console.error)
	server.listen(port, () => {
		const url = `http://${os.hostname()}:${port}`
		log(`Listening on ${url}`)
		if (browser) open(url)
	})
}

