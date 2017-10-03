// @flow

import { connect } from 'react-redux'
import { button, div, i, h } from 'react-hyperscript-helpers'

import { prevSong, nextSong } from '../actions'
import { Cover } from './Cover'
import CurrentSong from './CurrentSong'
import Controls from './Controls'

type Props = {
	song: Song,
	status: MpcStatus,
	prevSong: typeof prevSong,
	nextSong: typeof nextSong,
}

const Player = ({ song, status, prevSong, nextSong }: Props) =>
	div('.player', [
		button('.prev-song', { onClick: prevSong }, [
			i('.material-icons', 'skip_previous')]),
		div('.col-a', [h(Cover, { song, status })]),
		div('.col-b', [
			h(CurrentSong, { song }),
			h(Controls, { song, status }) ]),
		button('.next-song', { onClick: nextSong }, [
			i('.material-icons', 'skip_next')]) ])

export default connect(null, { prevSong, nextSong })(Player)

