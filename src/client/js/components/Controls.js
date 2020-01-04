// @flow

import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { a, button, div, i } from 'react-hyperscript-helpers'

import { togglePlay, toggleRandom } from '../actions'

type Props = {
	status: MpcStatus,
	song: Song,
	togglePlay: typeof togglePlay,
	toggleRandom: typeof toggleRandom,
}

const Controls = ({ song, status, togglePlay, toggleRandom }: Props) => {
	const { artist, title } = song
	const youtube = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + title)
	const discogs = 'https://www.discogs.com/search/?q=' + encodeURIComponent(artist + ' ' + title)
	const random = cx('material-icons', {'material-enabled' : status.random})

	return (
		div('.controls', [
			button('.material-button', { onClick: togglePlay }, [
				i('.material-icons', status.paused ? 'play_arrow' : 'pause') ]),
			button('.material-button', { onClick: toggleRandom }, [
				i({ className: random }, 'shuffle') ]),
			a('.material-button', { href: youtube }, [
				i('.material-icons', 'ondemand_video') ]),
			a('.material-button', { href: discogs }, [
				i('.material-icons', 'info') ]) ])
	)
}

export default connect(null, { togglePlay, toggleRandom })(Controls)
