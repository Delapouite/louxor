import React from 'react'

class CurrentSong extends React.Component {
	render () {
		let { album, artist, title, date, track } = this.props.song
		album = album !== 'singles' ? 'on ' + album : ''
		date = date ? ' in ' + date : ''

		return (
			<div className="current-song">
				<span className="current-song-title" title={track}>{title}</span>
				<span className="current-song-artist">by {artist}</span>
				<span className="current-song-album">{album}</span>
				<span className="current-song-date">{date}</span>
			</div>
		)
	}
}

export default CurrentSong
