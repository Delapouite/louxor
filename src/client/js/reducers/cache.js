import { FETCH_ALBUMS_SUCCESS } from '../actions/'
const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ALBUMS_SUCCESS:
			if (!action.albums || !action.albums.length) return state
			var cacheKey = `${action.tag}-${action.albums[0][action.tag]}`

			return Object.assign({}, state, {[cacheKey]: {
				ts: Date.now(),
				data: action.albums
			}})

		default:
			return state
	}
}
