import React from 'react'
import classNames from 'classnames'

import { getCoverURL } from './Cover'

export default class Albums extends React.Component {
	render () {
		return (
			<div className="albums">
				{this.props.albums.map((a) =>
					<div className={classNames('album', { 'current-album': this.props.currentAlbum === a.title  })} key={a.title}>
						<img className="cover-art" src={getCoverURL(a.songs[0])} alt="cover" />
						<div className="album-title">{a.title}</div>
						<div className="album-date">{a.date}</div>
					</div>
				)}
			</div>
		)
	}
}
