const { promisify } = require('util')
const mpcpp = require('mpcpp')
const mpc = mpcpp.connect()
const log = require('debug')('mpc')

// monkey patch
;['status', 'currentSong'].forEach((f) => {
	mpc[f] = promisify(mpc[f])
})

mpc.refresh = async () => {
	await Promise.all([
		mpc.status(),
		mpc.currentSong(),
	])
	log('state', mpc.state)
	return mpc.state
}

// init
mpc
.on('ready', () => log('ready'))
.on('system', (sub) => log('system', sub))
.on('error', (err) => {
	if (err.code === 'ECONNREFUSED') {
		log('Can\'t connect to MPD on port 6600. Make sure the daemon is running')
		process.exit(1)
	} else {
		throw err
	}
})

module.exports = mpc
