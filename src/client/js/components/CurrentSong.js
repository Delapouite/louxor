import React from 'react'
import { connect } from 'react-redux'

import { openAlbums } from '../actions'

class CurrentSong extends React.Component {
	render () {
		let { album, artist, title, date, track } = this.props.song

		return (
			<div className="current-song">
				<div className="current-song-title" title={track}>{title}</div>
				<div className="current-song-artist">
					<span className="current-song-by">by</span>
					<span onClick={() => {this.props.openAlbums()}}>{artist}</span>
				</div>
				{ album !== 'singles' ? <span className="current-song-on">on</span> : null }
				{ album !== 'singles' ? <span className="current-song-album">{album}</span> : null }
				<span className="current-song-in">in</span>
				{ date ? <span className="current-song-date">{date}</span> : null }
			</div>
		)
	}
}

export default connect(null, { openAlbums })(CurrentSong)
