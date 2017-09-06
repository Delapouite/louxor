exports.getTitle = (status, song) => `${status.paused ? '▮▮' : '▶'} ${song.title} - ${song.artist}`

const pad = (n) => String(n).padStart(2, 0)

exports.toHHMMSS = (secs) => {
	secs = Number(secs || 0)
	let hours = Math.floor(secs / 3600)
	let minutes = Math.floor((secs - (hours * 3600)) / 60)
	let seconds = secs - (hours * 3600) - (minutes * 60)

	const time = `${pad(minutes)}:${pad(seconds)}`
	hours = pad(hours)
	return (hours === '00') ? time : `${hours}:${time}`
}
