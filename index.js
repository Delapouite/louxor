const debug = require('debug')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mpc = require('mpcpp').connect()

const logMpc = debug('mpc')
const PORT = 44190

// mpc

const state = {
	status: {},
	currentSong: {}
}

const getStatus = () => new Promise((resolve) => mpc.status((err, res) => resolve(res)))
const getCurrentSong = () => new Promise((resolve) => mpc.currentSong((err, res) => resolve(res)))

const refresh = () =>
	Promise.all([
		getStatus(),
		getCurrentSong()
	])
	.then(([status, currentSong]) => Object.assign(state, { status, currentSong }))

const broadcastRefresh = () =>
	refresh().then((state) => io.emit('mpc.state', state))

// init
mpc
.on('ready', () => {
	logMpc('ready')
	broadcastRefresh()
})
.on('system', (sub) => {
	logMpc('system', sub)
	broadcastRefresh()
})

// io

io.on('connection', (socket) => {
	socket.emit('mpc.state', state)
})

// express

app.use(express.static('src/client'))

server.listen(PORT)
