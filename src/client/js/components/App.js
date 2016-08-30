import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import screenfull from 'screenfull'

import { getTitle } from '../../../shared/util'
import { BackgroundCover } from './Cover'
import Player from './Player'
import Albums from './Albums'

class App extends React.Component {
	componentDidMount () {
		document.addEventListener(screenfull.raw.fullscreenchange, () => this.forceUpdate())
	}

  render () {
		const { currentSong, status, albums } = this.props.mpc
		const fullScreen = () => { if (screenfull.enabled) screenfull.request() }

		return (
			<DocumentTitle title={getTitle(status, currentSong)}>
				<div className="app">
					<BackgroundCover song={currentSong} />

					{screenfull.isFullscreen ? null : <button className="material-button fullscreen" onClick={fullScreen}>
						<i className="material-icons">fullscreen</i>
					</button>}

					<Player song={currentSong} status={status} />

					{ this.props.ui.albums && albums && albums.length ? <Albums albums={albums} currentAlbum={currentSong.album} /> : null }
				</div>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)
