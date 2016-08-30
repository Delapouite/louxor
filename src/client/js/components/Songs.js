import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentAlbum, flip, playId } from '../actions'

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
			<ul className="songs">
				<button key="close" className="material-button close-songs" onClick={() => this.props.flip()}>
					<i className="material-icons">close</i>
				</button>
				{this.props.currentAlbum.songs.map((s) =>
					<li className={this.props.song.title === s.title ? 'selected' : ''}
						key={s.title} onClick={() => this.props.playId(s.id)}>{s.title}</li>
				)}
			</ul>
		)
	}
}

const mapStateToProps = (state) => ({ currentAlbum: state.mpc.currentAlbum })

export default connect(mapStateToProps, { fetchCurrentAlbum, flip, playId })(Songs)

