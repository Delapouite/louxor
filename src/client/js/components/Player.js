import React from 'react'
import { connect } from 'react-redux'
import { button, div, i, h } from 'react-hyperscript-helpers'

import { prevSong, nextSong } from '../actions'
import { Cover } from './Cover'
import CurrentSong from './CurrentSong'
import Controls from './Controls'

class Player extends React.Component {
	render () {
		const { song, status } = this.props

		return (
			div('.player', [
				button('.prev-song', { onClick: () => this.props.prevSong() }, [
					i('.material-icons', 'skip_previous')]),
				div('.col-a', [h(Cover, { song, status })]),
				div('.col-b', [
					h(CurrentSong, { song }),
					h(Controls, { song, status }) ]),
				button('.next-song', { onClick: () => this.props.nextSong() }, [
					i('.material-icons', 'skip_next')]) ])
		)
	}
}

export default connect(null, { prevSong, nextSong })(Player)

