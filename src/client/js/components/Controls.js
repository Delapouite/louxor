import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { a, button, div, i } from 'react-hyperscript-helpers'

import { togglePlay, toggleRandom } from '../actions'

class Controls extends React.Component {
	render () {
		const { artist, title } = this.props.song
		const youtube = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + title)
		const random = cx('material-icons', {'material-enabled' : this.props.status.random})

		return (
			div('.controls', [
				button('.material-button', { onClick: () => this.props.togglePlay() }, [
					i('.material-icons', this.props.status.paused ? 'play_arrow' : 'pause') ]),
				button('.material-button', { onClick: () => this.props.toggleRandom() }, [
					i({ className: random }, 'shuffle') ]),
				a('.material-button', { href: youtube }, [
					i('.material-icons', 'ondemand_video') ]) ])
		)
	}
}

export default connect(null, { togglePlay, toggleRandom })(Controls)
