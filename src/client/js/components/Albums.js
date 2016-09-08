// This component is displayed at the bottom of App after a search

import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, h, i, img } from 'react-hyperscript-helpers'
import { Motion, TransitionMotion, spring } from 'react-motion'

import { toggleAlbums, fetchAlbums, playId } from '../actions'
import { getCoverURL } from './Cover'

const _Album = ({ album, currentAlbum, tag, playId, style }) => {
	const cn = cx('album', { 'current-album': currentAlbum === album.title })

	return (
		div({ className: cn, style, onClick: () => playId(album.songs[0].id) }, [
			img('.cover-art', { src: getCoverURL(album.songs[0], 100), alt: 'cover' }),
			div('.album-title', album.title),
			tag !== 'artist' && div('.album-artist', album.artist),
			tag !=='date' && div('.album-date', album.date) ])
	)
}

const Album = connect(null, { playId })(_Album)

class Albums extends React.Component {
	componentWillReceiveProps ({ show, song, tag }) {
		if (!show) return

		if (!this.props.show
			|| this.props.song.album !== song.album) {
			this.props.fetchAlbums(song, tag)
		}
	}

	render () {
		const albums = this.props.albums || []

		const springProps = { stiffness: 170, damping: 26, precision: 0.01 }

		// TransitionMotion, for appearing and disappearing of each album

		const expandWidth = 100
		const shrinkWidth = this.props.animation ? 0 : expandWidth

		const transitionProps = {
			willEnter: () => ({ width: shrinkWidth }),
			willLeave: () => ({ width: spring(shrinkWidth) }),
			defaultStyles: albums.map((a) => ({
				key: a.title,
				style: { width: shrinkWidth },
				data: a
			})),
			styles: albums.map((a) => ({
				key: a.title,
				style: { width: spring(expandWidth) },
				data: a
			}))
		}

		// Motion, for toggling the albums panel

		const toggleHeight = this.props.animation
			? spring(this.props.show ? 135 : 0, springProps)
			: this.props.show ? 135 : 0

		const motionProps = {
			defaultStyle: { height: 0 },
			style: { height: toggleHeight }
		}

		return (
			h(TransitionMotion, transitionProps, [(transitionStyles) =>
				h(Motion, motionProps, [(motionStyle) => {
					return div('.albums', {key: 'albums', style: motionStyle}, [ transitionStyles.map(({ key, style, data }) =>
						h(Album, { key, style, tag: this.props.tag, album: data, currentAlbum: this.props.song.album })),
						button('.material-button.close-albums', { onClick: () => this.props.toggleAlbums() }, [
							i('.material-icons', 'close') ])
					])
				}])
			])
		)
	}
}

const mapStateToProps = ({ mpc, ui }) => ({
	albums: mpc.albums,
	animation: ui.animation,
	tag: ui.albumsTag
})

export default connect(mapStateToProps, { toggleAlbums, fetchAlbums })(Albums)
