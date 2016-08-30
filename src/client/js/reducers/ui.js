import { FLIP, OPEN_ALBUMS, CLOSE_ALBUMS } from '../actions/'

const initialState = {
	albums: false, // bottom panel opened?
	flipped: false // songs list visible?
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_ALBUMS:
			return Object.assign({}, state, {albums: true})

		case CLOSE_ALBUMS:
			return Object.assign({}, state, {albums: false})

		case FLIP:
			return Object.assign({}, state, {flipped: !state.flipped})

		default:
			return state
	}
}
