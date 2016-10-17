const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const { homedir } = require('os')
const trumpet = require('trumpet')
const express = require('express')
const compression = require('compression')
const gm = require('gm')
const log = require('debug')('express')

const mpc = require('./mpc')
const { getTitle } = require('../shared/util')

const MUSIC_ROOT = homedir() + '/music/'
const COVER_FORMATS = ['.jpg', '.png']

const app = express()

app.use(compression())

// inject initial state in index.html
app.get('/', (req, res) => {
	// for elapsed time
	mpc.refresh()

	const title = trumpet()
	title.select('title').createWriteStream()
		.end(getTitle(mpc.state.status, mpc.state.currentSong))
	const state = trumpet()
	state.select('#louxor-state').createWriteStream()
		.end(`window.LOUXOR_STATE = ${JSON.stringify(mpc.state)}`)
	fs.createReadStream('./build/index.html').pipe(title).pipe(state).pipe(res)
})

app.use(express.static('build'))

const sendCover = (res, p, size) => {
	log('cover', p, size)
	return !size
		? res.sendFile(p, { root: MUSIC_ROOT })
		: gm(MUSIC_ROOT + p).resize(size, size) .stream().pipe(res)
}

const sendDefaultCover = (res) => sendCover(res, '!/cover.jpg')

app.get('/art/:songFile?', (req, res) => {
	const { songFile } = req.params
	if (!songFile) return sendDefaultCover(res)

	let size = Number(req.query.size)
	if (size < 1 || size >= 2000) size = false

	const dir = path.dirname(songFile)
	// TODO handle FLAC
	const coverPath = dir === '!'
		? dir + '/covers/' + path.basename(songFile, '.mp3')
		: dir + '/cover'

	const stats = COVER_FORMATS.map((ext) =>
		fs.statAsync(MUSIC_ROOT + coverPath + ext).then(() => ext))

	Promise.some(stats, 1).then(([format]) => {
		sendCover(res, coverPath + format, size)
	})
	.catch(() => sendDefaultCover(res))
})

module.exports = app
