import React from 'react'
import { connect } from 'react-redux'
import { div, span } from 'react-hyperscript-helpers'

import { openAlbums } from '../actions'

class CurrentSong extends React.Component {
	render () {
		let { album, artist, title, date, track } = this.props.song

		return (
			div('.current-song', [
				div('.current-song-title', { title: track }, title),
				div('.current-song-artist', [
					span('.current-song-by', 'by'),
					span({ onClick: () => this.props.openAlbums() }, artist) ]),
				album !== 'singles' && span('.current-song-album', [span('.current-song-on', 'on'), album]),
				date && span('.current-song-date', [span('.current-song-in', 'in'), date]) ])
		)
	}
}

export default connect(null, { openAlbums })(CurrentSong)
