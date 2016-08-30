import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { closeAlbums, playId } from '../actions'
import { getCoverURL } from './Cover'

class Albums extends React.Component {
	render () {
		return (
			<div className="albums">
				{this.props.albums.map((a) =>
					<div className={classNames('album', { 'current-album': this.props.currentAlbum === a.title  })} key={a.title}
						onClick={() => this.props.playId(a.songs[0].id)}>
						<img className="cover-art" src={getCoverURL(a.songs[0])} alt="cover" />
						<div className="album-title">{a.title}</div>
						<div className="album-date">{a.date}</div>
					</div>
				)}

				<button className="material-button close-albums" onClick={() => this.props.closeAlbums()}>
					<i className="material-icons">close</i>
				</button>
			</div>
		)
	}
}

export default connect(null, { playId, closeAlbums })(Albums)
