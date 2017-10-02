// @flow

declare type Song = {
	album: string,
	artist: string,
	title: string,
	file: string,
}

declare type MpcState = {
	status: {
		elapsed: number,
		paused: boolean,
		random: boolean,
		repeat: boolean,
	},
	currentSong: Song,
}
