import React from 'react'

class CurrentSong extends React.Component {
	render () {
		let { album, artist, title, date, track } = this.props.song
		album = album !== 'singles' ? 'on ' + album : ''
		date = date ? ' in ' + date : ''

		const youtube = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + title)

		return (
			<div className="current-song">
				<span className="current-song-title" title={track}>
					{title}
					<a className="current-song-youtube" title="search on youtube" href={youtube}>►</a>
				</span>
				<span className="current-song-artist">by {artist}</span>
				<span className="current-song-album">{album}</span>
				<span className="current-song-date">{date}</span>
			</div>
		)
	}
}

export default CurrentSong
