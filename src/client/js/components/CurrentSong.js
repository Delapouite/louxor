// @flow

import { connect } from 'react-redux'
import { div, span } from 'react-hyperscript-helpers'

import { flip, toggleAlbums } from '../actions'

type Props = {
	flip: typeof flip,
	song: Song,
	toggleAlbums: typeof toggleAlbums,
}

const CurrentSong = ({ flip, song, toggleAlbums }: Props) => {
	let { album, artist, title, date, track } = song

	return (
		div('.current-song', [
			div('.current-song-title', { title: track }, title),
			div('.current-song-artist', [
				span('.current-song-by', 'by'),
				span({ onClick: () => toggleAlbums('artist') }, artist) ]),
			album !== 'singles' &&
				span('.current-song-album', [
					span('.current-song-on', 'on'),
					span({ onClick: flip }, album)]),
			date &&
				span('.current-song-date', [
					span('.current-song-in', 'in'),
					span({ onClick: () => toggleAlbums('date') }, date)]) ])
	)
}

export default connect(null, { flip, toggleAlbums })(CurrentSong)
