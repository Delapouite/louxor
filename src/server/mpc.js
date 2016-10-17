const Promise = require('bluebird')
const mpcpp = require('mpcpp')
const mpc = mpcpp.connect()
const log = require('debug')('mpc')

;['status', 'currentSong'].forEach((f) => {
	mpc[f] = Promise.promisify(mpc[f])
})

mpc.refresh = () =>
	Promise.all([
		mpc.status(),
		mpc.currentSong()
	])
	.then(() => mpc.state)
	.tap((state) => log('state', state))

// init
mpc
.on('ready', () => {
	log('ready')
})
.on('system', (sub) => {
	log('system', sub)
})
.on('error', (err) => {
	if (err.code === 'ECONNREFUSED') {
		log('Can\'t connect to MPD on port 6600. Make sure the daemon is running')
		process.exit(1)
	} else {
		throw err
	}
})

module.exports = mpc
