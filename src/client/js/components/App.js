import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import { prevSong, nextSong } from '../actions'
import { getTitle } from '../../../shared/util'
import { BackgroundCover, Cover } from './Cover'
import CurrentSong from './CurrentSong'
import Controls from './Controls'

class App extends React.Component {
  render () {
		const { currentSong, status } = this.props

		return (
			<DocumentTitle title={getTitle(status, currentSong)}>
				<div className="app">
					<BackgroundCover song={currentSong} />

					<button className="prev-song" title="Prev Song" onClick={() => this.props.prevSong()}></button>

					<div className="col-a">
						<Cover song={currentSong} paused={status.paused} />
					</div>

					<div className="col-b">
						<CurrentSong song={currentSong} />
						<Controls song={currentSong} status={status} />
					</div>

					<button className="next-song" title="Next song" onClick={() => this.props.nextSong()}></button>
				</div>
			</DocumentTitle>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, { prevSong, nextSong })(App)
