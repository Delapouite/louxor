// @flow

import { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import screenfull from 'screenfull'
import { button, div, h, form, i, input } from 'react-hyperscript-helpers'

import { getTitle } from '../../../shared/util'
import { fetchAlbums, toggleAnimation } from '../actions'
import { BackgroundCover } from './Cover'
import Player from './Player'
import Albums from './Albums'

type Props = {
	mpc: Object,
	ui: Object,
	// actions
	fetchAlbums: typeof fetchAlbums,
	toggleAnimation: typeof toggleAnimation,
}

type State = {
	search: string
}

class App extends Component<Props, State> {
	state = {
		search: ''
	}

	componentDidMount () {
		document.addEventListener(screenfull.raw.fullscreenchange, () => this.forceUpdate())
	}

	handleSubmit (e) {
		e.preventDefault()
		this.props.fetchAlbums({ artist: this.state.search}, 'artist')
	}

	render () {
		const { ui } = this.props
		const { currentSong, status } = this.props.mpc
		const fullScreen = () => { if (screenfull.enabled) screenfull.request() }

		return (
			h(DocumentTitle, { title: getTitle(status, currentSong) }, [
				div('.app', [
					h(BackgroundCover, { song: currentSong }),
					button('.material-button.animation', { onClick: () => this.props.toggleAnimation() }, [
						i('.material-icons', ui.animation ? 'flash_on' : 'flash_off')
					]),
					ui.albums && form('.search-form', { onSubmit: (e) => this.handleSubmit(e) }, [
						input('.search-input', { onChange: ({ target }) => { this.setState({ search: target.value }) }, value: this.state.search })
					]),
					!screenfull.isFullscreen && button('.material-button.fullscreen', { onClick: fullScreen }, [
						i('.material-icons', 'fullscreen')
					]),
					h(Player, { song: currentSong, status }),
					h(Albums, { song: currentSong, show: ui.albums }) ]) ])
		)
	}
}

export default connect((x => x), { fetchAlbums, toggleAnimation })(App)
