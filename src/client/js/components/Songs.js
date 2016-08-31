import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, i, li, ul, span } from 'react-hyperscript-helpers'

import { fetchCurrentAlbum, flip, playId } from '../actions'
import { toHHMMSS } from '../../../shared/util'

class Songs extends React.Component {
	componentWillMount () {
		this.props.fetchCurrentAlbum()
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.currentAlbum && this.props.currentAlbum.title !== nextProps.song.album) {
			this.props.fetchCurrentAlbum()
		}
	}

	render () {
		if (!this.props.currentAlbum) return null

		return (
			div('.songs', [
				button('.material-button.close-songs',
					{ key: 'close', onClick: () => this.props.flip() }, [
					i('.material-icons', 'close')]),
				ul(this.props.currentAlbum.songs.map((s) =>
					li({ className: cx({ selected: this.props.song.title === s.title }),
						key: s.id, onClick: () => this.props.playId(s.id) },
						[ span('.song-title', s.title), span('.song-duration', toHHMMSS(s.time)) ]))) ])
		)
	}
}

const mapStateToProps = (state) => ({ currentAlbum: state.mpc.currentAlbum })

export default connect(mapStateToProps, { fetchCurrentAlbum, flip, playId })(Songs)

