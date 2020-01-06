// @flow

import { FETCH_MPC_STATE_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_CURRENT_ALBUM_SUCCESS } from '../actions/'

type Action = {
	type: string,
	albums: Array<Object>,
	state: Object,
	currentAlbum: Object,
}

type State = {
	status: Object,
	currentSong: Object,
	currentAlbum: Object,
	albums: Array<Object>,
}

const initialState: State = {
	status: {},
	currentSong: {},
	currentAlbum: {},
	albums: []
}

export default (state: State = initialState, action: Action) => {
	switch (action.type) {
		case FETCH_MPC_STATE_SUCCESS:
			return {...state, ...action.state}

		case FETCH_ALBUMS_SUCCESS:
			return {...state, albums: action.albums}

		case FETCH_CURRENT_ALBUM_SUCCESS:
			return {...state, currentAlbum: action.currentAlbum}

		default:
			return state
	}
}
