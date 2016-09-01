import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, h, i, img } from 'react-hyperscript-helpers'
import { TransitionMotion, spring } from 'react-motion'

import { toggleAlbums, fetchAlbums, playId } from '../actions'
import { getCoverURL } from './Cover'

const _Album = ({ album, currentAlbum, playId, style }) => {
	const cn = cx('album', { 'current-album': currentAlbum === album.title })

	return (
		div({ className: cn, style, onClick: () => playId(album.songs[0].id) }, [
			img('.cover-art', { src: getCoverURL(album.songs[0], 100), alt: 'cover' }),
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
		const albums = this.props.albums || []
		const expandWidth = 100
		const shrinkWidth = this.props.animation ? 0 : expandWidth

		// TransitionMotion
		const willEnter = () => ({ width: shrinkWidth })
		const willLeave = () => ({ width: spring(shrinkWidth) })

		const defaultStyles = albums.map((a) => ({
			key: a.title,
			style: { width: shrinkWidth },
			data: a
		}))

		const styles = albums.map((a) => ({
			key: a.title,
			style: { width: spring(expandWidth) },
			data: a
		}))

		return (
			h(TransitionMotion, { willEnter, willLeave, styles, defaultStyles }, [(iStyles) =>
				div('.albums', {key: 'albums'}, [ iStyles.map(({ key, style, data }) =>
					h(Album, { key, style, album: data, currentAlbum: this.props.song.album })),
					button('.material-button.close-albums', { onClick: () => this.props.toggleAlbums() }, [
						i('.material-icons', 'close') ]) ]) ])
		)
	}
}

const mapStateToProps = (state) => ({ albums: state.mpc.albums, animation: state.ui.animation })

export default connect(mapStateToProps, { toggleAlbums, fetchAlbums })(Albums)
