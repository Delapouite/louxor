import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import screenfull from 'screenfull'
import { button, div, h, i } from 'react-hyperscript-helpers'

import { getTitle } from '../../../shared/util'
import { toggleAnimation } from '../actions'
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
					button('.material-button.animation', { onClick: () => this.props.toggleAnimation() }, [
						i('.material-icons', this.props.ui.animation ? 'flash_on' : 'flash_off')
					]),
					!screenfull.isFullscreen && button('.material-button.fullscreen', { onClick: fullScreen }, [
						i('.material-icons', 'fullscreen')
					]),
					h(Player, { song: currentSong, status }),
					h(Albums, { song: currentSong, show: this.props.ui.albums }) ]) ])
		)
	}
}

export default connect((x => x), { toggleAnimation })(App)
