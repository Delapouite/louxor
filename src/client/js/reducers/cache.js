// @flow

import { FETCH_ALBUMS_SUCCESS } from '../actions/'

type Action = {
	type: string,
	albums: Array<Object>,
	tag: string,
}

type CacheState = {
	[key: string]: {
		ts: number,
		data: Array<Object>,
	}
}

const initialState: CacheState = {}

export default (state: CacheState = initialState, action: Action) => {
	switch (action.type) {
		case FETCH_ALBUMS_SUCCESS: {
			if (!action.albums || !action.albums.length) return state
			const cacheKey = `${action.tag}-${action.albums[0][action.tag]}`

			return {...state, [cacheKey]: {
				ts: Date.now(),
				data: action.albums
			}}
		}

		default:
			return state
	}
}
