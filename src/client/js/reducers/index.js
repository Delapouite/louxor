import { FETCH_MPC_STATE_SUCCESS, FETCH_ALBUMS_SUCCESS } from '../actions/'

const initialState = {
	status: {},
	currentSong: {},
	albums: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MPC_STATE_SUCCESS:
			return Object.assign({}, state, action.state)

		case FETCH_ALBUMS_SUCCESS:
			return Object.assign({}, state, {albums: action.albums })

		default:
			return state
	}
}
