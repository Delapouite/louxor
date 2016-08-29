const { homedir } = require('os')
const fs = require('fs')
const path = require('path')
const debug = require('debug')
const Promise = require('bluebird')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mpcpp = require('mpcpp')
const mpc = mpcpp.connect()
const trumpet = require('trumpet')

const { getTitle } = require('./src/shared/util')

const log = ['mpc', 'io', 'express'].reduce((acc, d) => {
	acc[d] = debug(d)
	return acc
}, {})

const PORT = 44190
const MUSIC_ROOT = homedir() + '/music/'
const COVER_FORMATS = ['.jpg', '.png']

// mpc

// no response needed
const sendCommandToMPD = (cmd, args) => {
	log.io('mpc.command', cmd, args)
	const { PLAYBACK, OPTIONS_TOGGLES } = mpcpp.COMMANDS
	const whiteList = ['playId'].concat(PLAYBACK, OPTIONS_TOGGLES)
	if (!whiteList.includes(cmd)) return

	mpc[cmd](args ? args[0] : undefined)
}

const sendQueryToMPD = (socket) => (cmd, args = []) => {
	log.io('mpc.query', cmd, args)
	const whiteList = ['albums']
	if (!whiteList.includes(cmd)) return

	mpc[cmd](args[0], (err, results) => {
		if (err) return
		socket.emit('mpc.results', { command: cmd, results })
	})
}

const getStatus = () => new Promise((resolve) => mpc.status((err, res) => resolve(res)))
const getCurrentSong = () => new Promise((resolve) => mpc.currentSong((err, res) => resolve(res)))

const refresh = () =>
	Promise.all([
		getStatus(),
		getCurrentSong()
	])
	.then(() => mpc.state)
	.tap((state) => log.mpc('state', state))

const broadcastRefresh = () =>
	refresh().then((state) => io.emit('mpc.state', state))

// init
mpc
.on('ready', () => {
	log.mpc('ready')
	broadcastRefresh()
})
.on('system', (sub) => {
	log.mpc('system', sub)
	broadcastRefresh()
})

// io

io
.on('connection', (socket) => {
	log.io('new connection')
	socket.emit('mpc.state', mpc.state)
	socket.on('disconnect', () => log.io('disconnection'))
	socket.on('mpc.command', sendCommandToMPD)
	socket.on('mpc.query', sendQueryToMPD(socket))
})

// express

// inject initial state in index.html
app.get('/', (req, res) => {
	// for elapsed time
	refresh()

	const title = trumpet()
	title.select('title').createWriteStream()
		.end(getTitle(mpc.state.status, mpc.state.currentSong))
	const state = trumpet()
	state.select('#louxor-state').createWriteStream()
		.end(`window.LOUXOR_STATE = ${JSON.stringify(mpc.state)}`)
	fs.createReadStream(`${__dirname}/build/index.html`).pipe(title).pipe(state).pipe(res)
})

app.use(express.static('build'))

const sendCover = (res, p) => res.sendFile(p, { root: MUSIC_ROOT })
const sendDefaultCover = (res) => sendCover(res, '!/cover.jpg')

app.get('/art/:songFile?', (req, res) => {
	const { songFile } = req.params
	if (!songFile) return sendDefaultCover(res)

	const dir = path.dirname(songFile)
	// TODO handle FLAC
	const coverPath = dir === '!'
		? dir + '/covers/' + path.basename(songFile, '.mp3')
		: dir + '/cover'

	const stats = COVER_FORMATS.map((ext) =>
		new Promise((resolve, reject) => {
			fs.stat(MUSIC_ROOT + coverPath + ext, (err) => {
				if (err) reject(err); else resolve(ext)
			})
		})
	)

	Promise.some(stats, 1).then(([format]) => {
		log.express('cover', format)
		sendCover(res, coverPath + format)
	})
	.catch(() => sendDefaultCover(res))
})

server.listen(PORT, () => log.express(`Listening on port ${PORT}`))
