import React from 'react'

const getCoverURL = (song) => song && song.file
	? '/art/' + encodeURIComponent(song.file)
	: '/art'

export class BackgroundCover extends React.Component {
	render() {
		const style = { backgroundImage: 'url("' + getCoverURL(this.props.song) + '")' }
		return <div className="background-cover" style={style}/>
	}
}

export class Cover extends React.Component {
	render () {
		return (
			<div className="cover">
				<img src={getCoverURL(this.props.song)} alt="cover" />
			</div>
		)
	}
}


