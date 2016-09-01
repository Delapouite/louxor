import { FLIP, TOGGLE_ALBUMS } from '../actions/'

const initialState = {
	albums: false, // bottom panel opened?
	flipped: false, // songs list visible?
	animation: false // disable for low end devices
}

export default (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_ALBUMS:
			return Object.assign({}, state, {albums: !state.albums})

		case FLIP:
			return Object.assign({}, state, {flipped: !state.flipped})

		default:
			return state
	}
}
