import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, h, i, img } from 'react-hyperscript-helpers'

import { toggleAlbums, fetchAlbums, playId } from '../actions'
import { getCoverURL } from './Cover'

const _Album = ({ album, currentAlbum, playId }) => {
	const cn = cx('album', { 'current-album': currentAlbum === album.title })

	return (
		div({ className: cn, onClick: () => playId(album.songs[0].id) }, [
			img('.cover-art', { src: getCoverURL(album.songs[0]), alt: 'cover' }),
			div('.album-title', album.title),
			div('.album-date', album.date) ])
	)
}

const Album = connect(null, { playId })(_Album)

class Albums extends React.Component {
	componentWillMount () {
		this.props.fetchAlbums(this.props.song.artist)
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.song.album !== nextProps.song.album) {
			this.props.fetchAlbums(nextProps.song.artist)
		}
	}

	render () {
		if (!this.props.albums) return null

		return (
			div('.albums', [ this.props.albums.map((a) =>
				h(Album, { key: a.title, album: a, currentAlbum: this.props.song.album })),
				button('.material-button.close-albums', { onClick: () => this.props.toggleAlbums() }, [
					i('.material-icons', 'close') ]) ])
		)
	}
}

const mapStateToProps = (state) => ({ albums: state.mpc.albums })

export default connect(mapStateToProps, { toggleAlbums, fetchAlbums })(Albums)
