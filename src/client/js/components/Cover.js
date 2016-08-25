import React from 'react'

class Cover extends React.Component {
	render () {
		const { song } = this.props
		const url = song && song.file
			? '/art/' + encodeURIComponent(song.file)
			: '/art'

		return (
			<div className="cover">
				<img src={url} alt="cover" />
			</div>
		)
	}
}

export default Cover

