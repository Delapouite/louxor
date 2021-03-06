// @flow
// This component is displayed at the bottom of App after a search

import { Component } from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { button, div, h, i, img, span } from 'react-hyperscript-helpers'
import { Motion, TransitionMotion, spring } from 'react-motion'
import Select from 'react-select'

import { toggleAlbums, fetchAlbums, playId,
	changeRows, playArtist, playDate, loadPlaylist } from '../actions'
import { getCoverURL } from './Cover'
import YearPicker from './YearPicker'

const _Album = ({ album, currentAlbum, tag, playId, style }) => {
	const cn = cx('album', { 'current-album': currentAlbum === album.title })

	return (
		div({ className: cn, style, onClick: () => playId(album.songs[0].id) }, [
			img('.cover-art', { src: getCoverURL(album.songs[0], 100), alt: 'cover' }),
			div('.album-songs-count', album.songs.length),
			div('.album-title', album.title),
			tag !== 'artist' && div('.album-artist', album.artist),
			tag !=='date' && div('.album-date', album.date) ])
	)
}

const AlbumCover = connect(null, { playId })(_Album)

type AlbumsProps = {
	albums: Array<Album>,
	animation: number,
	rows: number,
	song: Song,
	show: boolean,
	tag: 'date' | 'artist',
	// actions
	changeRows: typeof changeRows,
	fetchAlbums: typeof fetchAlbums,
	toggleAlbums: typeof toggleAlbums,
	playArtist: typeof playArtist,
	playDate: typeof playDate,
	loadPlaylist: typeof loadPlaylist
}

type AlbumsState = {
	showYearPicker: boolean,
	songsCount: number,
}

class Albums extends Component<AlbumsProps, AlbumsState> {

	date = 0
	state = {
		showYearPicker: false,
		songsCount: 0,
	}

	componentWillReceiveProps ({ show, song, tag, albums }) {
		if (!show) return

		if (!this.props.show
			|| this.props.song.album !== song.album
			|| this.props.tag !== tag) {
			this.fetchAlbums(song, tag)
		}
		if (!albums) return

		const songsCount = albums.reduce((acc, a) => acc + a.songs.length, 0)

		this.setState({ songsCount })
	}

	fetchAlbums (song, tag) {
		this.date = song.date
		this.props.fetchAlbums(song, tag)
	}

	toggleYearPicker () {
		this.setState({ showYearPicker: !this.state.showYearPicker })
	}

	renderButtons () {
		return div('.buttons', [

			h(Select, {
				searchable: false,
				placeholder: '2 playlists…',
				options: [
					{ value: 'main', label: 'main'},
					{ value: 'favs', label: 'favs'}
				],
				onChange: ({ value }) => this.props.loadPlaylist(value),
			}),

			button('.material-button',
				{ onClick: () => {
					this.props.tag === 'date'
					? this.props.playDate(this.date)
					: this.props.playArtist(this.props.song.artist)
				} }, [
				i('.material-icons', 'playlist_play') ]),

			this.props.albums && span(`${this.state.songsCount} songs`),
			this.props.albums && span(`${this.props.albums.length} albums`),

			this.props.tag !== 'date'
				? span(this.props.song.artist)
				: div('.year-picker-toggle', [
					span({ onClick: () => this.toggleYearPicker() }, this.date),
					this.state.showYearPicker && h(YearPicker, {
						date: this.date,
						onPick: (date) => this.fetchAlbums({...this.props.song, date }, 'date'),
					}) ]),

			this.props.tag !== 'date' ? null : button('.material-button',
				{ onClick: () => this.fetchAlbums({...this.props.song, date: this.date - 1 }, 'date') }, [
				i('.material-icons', 'keyboard_arrow_left') ]),
			this.props.tag !== 'date' ? null : button('.material-button',
				{ onClick: () => this.fetchAlbums({...this.props.song, date: this.date + 1 }, 'date') }, [
				i('.material-icons', 'keyboard_arrow_right') ]),

			this.props.rows <= 1 ? null : button('.material-button',
				{ onClick: () => this.props.changeRows(-1) }, [
				i('.material-icons', 'vertical_align_bottom') ]),
			button('.material-button',
				{ onClick: () => this.props.changeRows(1) }, [
				i('.material-icons', 'vertical_align_top') ]),
			button('.material-button',
				{ onClick: () => this.props.toggleAlbums(null, false) }, [
				i('.material-icons', 'close') ])
		])
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
				data: a,
			})),
			styles: albums.map((a) => ({
				key: a.title,
				style: { width: spring(expandWidth) },
				data: a,
			}))
		}

		// Motion, for toggling the albums panel

		const height = 135 * this.props.rows
		const toggleHeight = this.props.animation
			? spring(this.props.show ? height : 0, springProps)
			: this.props.show ? height : 0

		const motionProps = {
			defaultStyle: { height: 0 },
			style: { height: toggleHeight },
		}

		const buttons = this.props.show ? this.renderButtons() : null

		return (
			h(TransitionMotion, transitionProps, [(transitionStyles) =>
				h(Motion, motionProps, [(motionStyle) =>
					div('.albums', {key: 'albums', style: motionStyle}, [ transitionStyles.map(({ key, style, data }) =>
						h(AlbumCover, { key, style, tag: this.props.tag, album: data, currentAlbum: this.props.song.album })),
						buttons,
					])
				])
			])
		)
	}
}


export default connect(
	({ mpc, ui }) => ({
		albums: mpc.albums,
		animation: ui.animation,
		tag: ui.albumsTag,
		rows: ui.rows,
	}),
	{ toggleAlbums, fetchAlbums, changeRows, playArtist, playDate, loadPlaylist },
)(Albums)
