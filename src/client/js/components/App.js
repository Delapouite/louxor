import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import { getTitle } from '../../../shared/util'
import { BackgroundCover } from './Cover'
import Player from './Player'
import Albums from './Albums'

class App extends React.Component {
  render () {
		const { currentSong, status, albums } = this.props

		return (
			<DocumentTitle title={getTitle(status, currentSong)}>
				<div className="app">
					<BackgroundCover song={currentSong} />
					<Player song={currentSong} status={status} />
					{ albums && albums.length ? <Albums albums={albums} currentAlbum={currentSong.album} /> : null }
				</div>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)
