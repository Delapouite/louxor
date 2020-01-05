// @flow

import { FLIP, TOGGLE_ALBUMS, EXTEND,
	TOGGLE_ANIMATION, CHANGE_ROWS,
	CONNECT, DISCONNECT } from '../actions/'

type State = {
	connected: boolean,
	albums: boolean,
	albumsTag: ?string,
	rows: number,
	flipped: boolean,
	animation: boolean,
	extended: boolean,
}

const initialState = {
	connected: false, // socket connected?
	albums: false, // bottom panel opened?
	albumsTag: null, // what's inside the bottom panel? albums by artist or date?
	rows: 1, // how many rows in the albums panel?
	flipped: false, // songs list visible?
	animation: false, // disable for low end devices
	extended: false, // show extra info like track, duration…
}

export default (state: State = initialState, action: Object) => {
	switch (action.type) {
		case CONNECT:
			return {...state, connected: true}

		case DISCONNECT:
			return {...state, connected: false}

		case TOGGLE_ALBUMS:
			let albums = state.albumsTag
			if (typeof action.force == 'boolean') {
				albums = action.force
			} else if (!state.albumsTag || action.tag === state.albumsTag) {
				albums = !state.albums
			}
			return {...state, albums, albumsTag: action.tag}

		case CHANGE_ROWS:
			return {...state, rows: state.rows + action.diff}

		case TOGGLE_ANIMATION:
			return {...state, animation: !state.animation}

		case FLIP:
			return {...state, flipped: !state.flipped}

		case EXTEND:
			return {...state, extended: !state.extended}

		default:
			return state
	}
}
