import React from 'react'
import { connect } from 'react-redux'

import CurrentSong from './CurrentSong'

class App extends React.Component {
  render () {
		return (
			<div class="app">
				<CurrentSong song={this.props.currentSong} />
			</div>
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)
