import { OPEN_ALBUMS, CLOSE_ALBUMS } from '../actions/'

const initialState = {
	albums: false // bottom panel opened?
}

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_ALBUMS:
			return Object.assign({}, state, {albums: true})

		case CLOSE_ALBUMS:
			return Object.assign({}, state, {albums: false})

		default:
			return state
	}
}
