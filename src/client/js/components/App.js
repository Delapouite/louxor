import React from 'react'
import { connect } from 'react-redux'

import Cover from './Cover'
import CurrentSong from './CurrentSong'

class App extends React.Component {
  render () {
		return (
			<div className="app">
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
