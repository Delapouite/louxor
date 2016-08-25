const { homedir } = require('os')
const fs = require('fs')
const path = require('path')
const debug = require('debug')
const Promise = require('bluebird')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mpc = require('mpcpp').connect()

const logMpc = debug('mpc')
const PORT = 44190
const MUSIC_ROOT = homedir() + '/music/'
const COVER_FORMATS = ['.jpg', '.png']

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
    sendCover(res, coverPath + format)
  })
  .catch(() => sendDefaultCover(res))
})

server.listen(PORT)
