import React from 'react'
import { connect } from 'react-redux'

import { prevSong, nextSong } from '../actions'
import { Cover } from './Cover'
import CurrentSong from './CurrentSong'
import Controls from './Controls'

class Player extends React.Component {
  render () {
		const { song, status } = this.props

		return (
				<div className="player">
					<button className="prev-song" title="Prev Song" onClick={() => this.props.prevSong()}></button>

					<div className="col-a">
						<Cover song={song} status={status} />
					</div>

					<div className="col-b">
						<CurrentSong song={song} />
						<Controls song={song} status={status} />
					</div>

					<button className="next-song" title="Next song" onClick={() => this.props.nextSong()}></button>
				</div>
		)
	}
}

export default connect(null, { prevSong, nextSong })(Player)

