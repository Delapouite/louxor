import { CLOSE_ALBUMS, FETCH_ALBUMS_SUCCESS } from '../actions/'

const initialState = {
	albums: false // bottom panel opened?
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLOSE_ALBUMS:
			return Object.assign({}, state, {albums: false})

		case FETCH_ALBUMS_SUCCESS:
			return Object.assign({}, state, {albums: true})

		default:
			return state
	}
}
