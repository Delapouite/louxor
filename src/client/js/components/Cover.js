import React from 'react'
import { connect } from 'react-redux'
import { default as cx } from 'classnames'
import { div, h, img } from 'react-hyperscript-helpers'

import { flip } from '../actions'
import Songs from './Songs'

export const getCoverURL = (song, size) => {
	const URL = song && song.file
		? '/art/' + encodeURIComponent(song.file)
		: '/art'
	return size ? URL + '?size=' + size : URL
}

	// do not refresh if same album to avoid flash
const shouldImageUpdate = (props, nextProps) => {
	// singles can have their own cover
	if (nextProps.song.album === 'singles') return true

	return props.song.album !== nextProps.song.album
}

export class BackgroundCover extends React.Component {
	shouldComponentUpdate (nextProps) {
		return shouldImageUpdate(this.props, nextProps)
	}

	render () {
		return div('.background-cover', { style: { backgroundImage: 'url("' + getCoverURL(this.props.song, 100) + '")' }})
	}
}

class Progress extends React.Component {
	constructor (props) {
		super(props)
		this.state = { elapsed: Number(this.props.elapsed || 0) }
	}

	componentDidMount () {
		this.interval = setInterval(() => this.tick(), 1000)
	}

	componentWillUnmount () {
		clearInterval(this.interval)
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.total !== nextProps.total) {
			this.setState({ elapsed: 0 })
		}
		if (this.props.elapsed !== nextProps.elapsed) {
			this.setState({ elapsed: Number(nextProps.elapsed) })
		}
	}

	tick () {
		if (this.props.paused) return
		this.setState({ elapsed: this.state.elapsed + 1 })
	}

	render () {
		let p = this.state.elapsed * 100 / this.props.total
		if (p < 1.5) p = 1.5
		if (p > 100) p = 100

		return div('.progress', { style: { height: `${p}%`, width: `${p}%` }})
	}
}

class Art extends React.Component {
	shouldComponentUpdate (nextProps) {
		return shouldImageUpdate(this.props, nextProps)
	}

	render () {
		return img('.cover-front', { src: getCoverURL(this.props.song), alt: 'cover' })
	}
}

const _Cover = ({ status, song, flipped, flip }) => {
	const tilt = cx('cover-tilt', { flipped })
	const vynil = cx('cover-vynil', { spinning: !status.paused })

	return (
		div('.cover', [
			div({ className: tilt, onClick: () => { if (!flipped) flip() }}, [
				img({className: vynil, src: '/images/vynil.png', alt: 'vynil' }),
				h(Progress, { elapsed: status.elapsed, total: song.time, paused: status.paused }),
				h(Art, { song }),
				div('.cover-back', [ h(Songs, { song }) ]) ]) ])
	)
}

const mapStateToProps = (state) => ({ flipped: state.ui.flipped })

export const Cover = connect(mapStateToProps, { flip })(_Cover)


