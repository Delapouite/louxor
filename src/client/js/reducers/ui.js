import { FLIP, TOGGLE_ALBUMS, TOGGLE_ANIMATION } from '../actions/'

const initialState = {
	albums: false, // bottom panel opened?
	albumsTag: null, // what's inside the bottom panel? albums by artist or date?
	flipped: false, // songs list visible?
	animation: false // disable for low end devices
}

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_ALBUMS:
			var albums = state.albumsTag
			if (typeof action.force == 'boolean') {
				albums = action.force
			} else if (!state.albumsTag || action.tag === state.albumsTag) {
				albums = !state.albums
			}
			return Object.assign({}, state, {albums, albumsTag: action.tag})

		case TOGGLE_ANIMATION:
			return Object.assign({}, state, {animation: !state.animation})

		case FLIP:
			return Object.assign({}, state, {flipped: !state.flipped})

		default:
			return state
	}
}
