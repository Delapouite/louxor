import { connect } from 'react-redux'
import { div, span } from 'react-hyperscript-helpers'

import { toggleAlbums } from '../actions'

const CurrentSong = ({ song, toggleAlbums }) => {
	let { album, artist, title, date, track } = song

	return (
		div('.current-song', [
			div('.current-song-title', { title: track }, title),
			div('.current-song-artist', [
				span('.current-song-by', 'by'),
				span({ onClick: toggleAlbums }, artist) ]),
			album !== 'singles' && span('.current-song-album', [span('.current-song-on', 'on'), album]),
			date && span('.current-song-date', [span('.current-song-in', 'in'), date]) ])
	)
}

export default connect(null, { toggleAlbums })(CurrentSong)
