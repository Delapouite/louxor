// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, i, li, ul, span } from 'react-hyperscript-helpers'

import { fetchCurrentAlbum, flip, playId } from '../actions'
import { toHHMMSS } from '../../../shared/util'

type Props = {
	album: Album,
	song: Song,
	// actions
	fetchCurrentAlbum: typeof fetchCurrentAlbum,
	flip: typeof flip,
	playId: typeof playId,
}

class Songs extends Component<Props> {

	componentWillMount () {
		this.props.fetchCurrentAlbum()
	}

	componentWillReceiveProps (nextProps) {
		const { album, fetchCurrentAlbum } = this.props
		if (!album) return

		if (album.title !== nextProps.song.album
			&& nextProps.album.title !== nextProps.song.album) {
			fetchCurrentAlbum()
		}
	}

	renderTitle (song) {
		let { track } = song
		if (!track) return span('.song-title', song.title)

		const splits = track.split('/')
		if (splits) [track] = splits
		if (track.length === 1) track = '0' + track

		return span('.song-title', `${track} – ${song.title}`)
	}

	render () {
		if (!this.props.album || !this.props.album.songs) return null

		return (
			div('.songs', [
				button('.material-button.close-songs',
					{ key: 'close', onClick: () => this.props.flip() }, [
					i('.material-icons', 'close')]),
				ul(this.props.album.songs.map((s) =>
					li({ className: cx({ selected: this.props.song.title === s.title }),
						key: s.id, onClick: () => this.props.playId(s.id) },
						[ this.renderTitle(s) , span('.song-duration', toHHMMSS(s.time)) ]))) ])
		)
	}
}

export default connect(
	({ mpc }) => ({ album: mpc.currentAlbum }),
	{ fetchCurrentAlbum, flip, playId },
)(Songs)

