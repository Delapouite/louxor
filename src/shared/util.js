exports.getTitle = (status, song) => `${status.paused ? '▮▮' : '▶'} ${song.title} - ${song.artist}`

exports.toHHMMSS = (secs) => {
	secs = Number(secs || 0)
	let hours = Math.floor(secs / 3600)
	let minutes = Math.floor((secs - (hours * 3600)) / 60)
	let seconds = secs - (hours * 3600) - (minutes * 60)

	// padding
	if (hours < 10) {hours = '0' + hours}
	if (minutes < 10) {minutes = '0' + minutes}
	if (seconds < 10) {seconds = '0' + seconds}
	return (hours === '00')
		? minutes + ':' + seconds
		: hours + ':' + minutes + ':' + seconds
}
