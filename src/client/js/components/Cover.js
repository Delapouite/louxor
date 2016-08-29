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

export class Cover extends React.Component {
	render () {
		const cn = classNames('cover-vynil', { spinning: !this.props.paused })

		return (
			<div className="cover">
        <div className="cover-tilt">
					<img className={cn} src="/images/vynil.png" alt="vynil" />
					<img className="cover-art" src={getCoverURL(this.props.song)} alt="cover" />
				</div>
			</div>
		)
	}
}


