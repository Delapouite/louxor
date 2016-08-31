import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import screenfull from 'screenfull'
import { button, div, h, i } from 'react-hyperscript-helpers'

import { getTitle } from '../../../shared/util'
import { BackgroundCover } from './Cover'
import Player from './Player'
import Albums from './Albums'

class App extends React.Component {
	componentDidMount () {
		document.addEventListener(screenfull.raw.fullscreenchange, () => this.forceUpdate())
	}

	render () {
		const { currentSong, status } = this.props.mpc
		const fullScreen = () => { if (screenfull.enabled) screenfull.request() }

		return (
			h(DocumentTitle, { title: getTitle(status, currentSong) }, [
				div('.app', [
					h(BackgroundCover, { song: currentSong }),
					screenfull.isFullscreen && button('.material-buttom.fullscreen', { onClick: fullScreen }, [
						i('.material-icons', 'fullscreen')
					]),
					h(Player, { song: currentSong, status }),
					this.props.ui.albums && h(Albums, { song: currentSong }) ]) ])
		)
	}
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)
