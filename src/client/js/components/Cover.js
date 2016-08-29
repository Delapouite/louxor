import React from 'react'
import classNames from 'classnames'

export const getCoverURL = (song) => song && song.file
	? '/art/' + encodeURIComponent(song.file)
	: '/art'

export class BackgroundCover extends React.Component {
	render() {
		const style = { backgroundImage: 'url("' + getCoverURL(this.props.song) + '")' }
		return <div className="background-cover" style={style} />
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

		const style = {
			height: `${p}%`,
			width: `${p}%`
		}

		return (
			<div className="progress" style={style}></div>
		)
	}
}

export class Cover extends React.Component {
	render () {
		const { status, song } = this.props
		const cn = classNames('cover-vynil', { spinning: !status.paused })

		return (
			<div className="cover">
				<div className="cover-tilt">
					<img className={cn} src="/images/vynil.png" alt="vynil" />
					<Progress elapsed={status.elapsed} total={song.time} paused={status.paused} />
					<img className="cover-art" src={getCoverURL(song)} alt="cover" />
				</div>
			</div>
		)
	}
}


