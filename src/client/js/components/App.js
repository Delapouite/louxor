import React from 'react'
import { connect } from 'react-redux'

import { BackgroundCover, Cover } from './Cover'
import CurrentSong from './CurrentSong'

class App extends React.Component {
  render () {
		return (
			<div className="app">
				<BackgroundCover song={this.props.currentSong} />
				<div className="col-a">
					<Cover song={this.props.currentSong} />
				</div>
				<div className="col-b">
					<CurrentSong song={this.props.currentSong} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)
