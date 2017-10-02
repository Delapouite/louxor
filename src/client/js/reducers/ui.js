// @flow

import { FLIP, TOGGLE_ALBUMS, TOGGLE_ANIMATION, CHANGE_ROWS } from '../actions/'

type State = {
	albums: boolean,
	albumsTag: ?string,
	rows: number,
	flipped: boolean,
	animation: boolean,
}

const initialState = {
	albums: false, // bottom panel opened?
	albumsTag: null, // what's inside the bottom panel? albums by artist or date?
	rows: 1, // how many rows in the albums panel ?
	flipped: false, // songs list visible?
	animation: false, // disable for low end devices
}

export default (state: State = initialState, action: Object) => {
	switch (action.type) {
		case TOGGLE_ALBUMS:
			var albums = state.albumsTag
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

		default:
			return state
	}
}
