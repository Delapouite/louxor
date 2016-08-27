import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { togglePlay, toggleRandom } from '../actions'

class Controls extends React.Component {
	render () {
		const { artist, title } = this.props.song
		const youtube = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + title)
		const random = classNames('material-icons', {'material-enabled' : this.props.status.random})

		return (
			<div className="controls">
				<button onClick={() => this.props.togglePlay()}><i className="material-icons">
					{ this.props.status.paused ? 'play_arrow' : 'pause' }
				</i></button>
				<button onClick={() => this.props.toggleRandom()}><i className={random}>shuffle</i></button>
				<a href={youtube}><i className="material-icons">ondemand_video</i></a>
			</div>
		)
	}
}

export default connect(null, { togglePlay, toggleRandom })(Controls)
