exports.getTitle = (status, song) => `${status.paused ? '▮▮' : '▶'} ${song.title} - ${song.artist}`
