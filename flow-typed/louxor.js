// @flow

declare type Song = {
	album: string,
	artist: string,
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
