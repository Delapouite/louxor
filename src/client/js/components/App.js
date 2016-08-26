import React from 'react'
import { connect } from 'react-redux'

import { prevSong, nextSong } from '../actions'
import { BackgroundCover, Cover } from './Cover'
import CurrentSong from './CurrentSong'

class App extends React.Component {
  render () {
		return (
			<div className="app">
				<BackgroundCover song={this.props.currentSong} />

				<button className="prev-song" title="Prev Song" onClick={() => this.props.prevSong()}></button>
				<button className="next-song" title="Next song" onClick={() => this.props.nextSong()}></button>

				<div className="col-a">
					<Cover song={this.props.currentSong} paused={this.props.status.paused} />
				</div>

				<div className="col-b">
					<CurrentSong song={this.props.currentSong} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, { prevSong, nextSong })(App)
