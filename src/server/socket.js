const sio = require('socket.io')
const { COMMANDS: { PLAYBACK, OPTIONS_TOGGLES } } = require('mpcpp')
const log = require('debug')('io')

const mpc = require('./mpc')

const WHITE_LISTS = {
	COMMANDS: ['playId'].concat(PLAYBACK, OPTIONS_TOGGLES),
	QUERIES: ['artist', 'currentAlbum', 'date']
}

const sendCommandToMPD = (cmd, args) => {
	log('mpc.command', cmd, args)
	if (!WHITE_LISTS.COMMANDS.includes(cmd)) return

	mpc[cmd](args ? args[0] : undefined)
}

const sendQueryToMPD = (socket) => (cmd, args = []) => {
	log('mpc.query', cmd, args)
	if (!WHITE_LISTS.QUERIES.includes(cmd)) return

	const cb = (err, results) => {
		if (err) return

		log('mpc.results', cmd, results)
		socket.emit('mpc.results', { command: cmd, results })
	}

	args ? mpc[cmd](args[0], cb) : mpc[cmd](cb)
}

module.exports = (server) => {
	const io = sio(server)

	const broadcastRefresh = () =>
		mpc.refresh().then((state) => io.emit('mpc.state', state))

	io.on('connection', (socket) => {
		log('new connection')
		socket.emit('mpc.state', mpc.state)
		socket.on('disconnect', () => log('disconnection'))
		socket.on('mpc.command', sendCommandToMPD)
		socket.on('mpc.query', sendQueryToMPD(socket))
	})

	mpc
	.on('ready', broadcastRefresh)
	.on('system', broadcastRefresh)

	return server
}

