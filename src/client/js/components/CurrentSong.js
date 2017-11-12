// @flow

import { connect } from 'react-redux'
import { div, span } from 'react-hyperscript-helpers'

import { flip, toggleAlbums, extend } from '../actions'
import { toHHMMSS } from '../../../shared/util'

type Props = {
	song: Song,
	extended: boolean,
	// actions
	flip: typeof flip,
	toggleAlbums: typeof toggleAlbums,
	extend: typeof extend,
}

const CurrentSong = ({ extended, song, flip, toggleAlbums, extend }: Props) => {
	let { album, artist, title, date, track, time } = song

	return (
		div('.current-song', [
			div('.current-song-title', { onClick: extend }, title),
			div('.current-song-artist', [
				span('.current-song-by', 'by'),
				span({ onClick: () => toggleAlbums('artist') }, artist) ]),
			album !== 'singles' &&
				extended && span('.current-song-track', `#${track}`),
			album !== 'singles' &&
				span('.current-song-album', [
					span('.current-song-on', 'on'),
					span({ onClick: flip }, album)]),
			date &&
				span('.current-song-date', [
					span('.current-song-in', 'in'),
					span({ onClick: () => toggleAlbums('date') }, date)]),
			extended && span('.current-song-sep', '|'),
			extended && span('.current-song-duration', `(${toHHMMSS(time)})`) ])
	)
}

export default connect(
	({ ui }) => ({ extended: ui.extended }),
	{ flip, toggleAlbums, extend },
)(CurrentSong)
