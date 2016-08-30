import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { closeAlbums, fetchAlbums, playId } from '../actions'
import { getCoverURL } from './Cover'

class Album extends React.Component {
	render () {
		const { album, currentAlbum } = this.props
		const cn = classNames('album', { 'current-album': currentAlbum === album.title })

		return (
			<div className={cn} onClick={() => playId(album.songs[0].id)}>
				<img className="cover-art" src={getCoverURL(album.songs[0])} alt="cover" />
				<div className="album-title">{album.title}</div>
				<div className="album-date">{album.date}</div>
			</div>
		)
	}
}

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
			<div className="albums">
				{this.props.albums.map((a) =>
					<Album key={a.title} album={a} currentAlbum={this.props.song.album} playId={playId} />
				)}
				<button key="close" className="material-button close-albums" onClick={() => this.props.closeAlbums()}>
					<i className="material-icons">close</i>
				</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ albums: state.mpc.albums })

export default connect(mapStateToProps, { playId, closeAlbums, fetchAlbums })(Albums)
