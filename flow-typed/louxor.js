// @flow

declare type Song = {
	album: string,
	artist: string,
	date: number,
	duration: string,
	file: string,
	id: number,
	lastModified: string,
	pos: number,
	time: number,
	title: string,
	track: string,
}

declare type Album = {
	title: string,
	date: number,
	songs: Array<Song>,
}

declare type MpcStatus = {
	elapsed: number,
	paused: boolean,
	random: boolean,
	repeat: boolean,
}

declare type MpcState = {
	currentSong: Song,
	status: MpcStatus,
}
