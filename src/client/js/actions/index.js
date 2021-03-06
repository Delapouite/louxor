// @flow

// network
export const INIT_SOCKET = 'INIT_SOCKET'
export const CONNECT = 'CONNECT'
export const DISCONNECT = 'DISCONNECT'

export const SEND_MPC_COMMAND = 'SEND_MPC_COMMAND'
export const SEND_MPC_QUERY = 'SEND_MPC_QUERY'
export const FETCH_MPC_STATE_SUCCESS = 'FETCH_MPC_STATE_SUCCESS'
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS'
export const FETCH_CURRENT_ALBUM_SUCCESS = 'FETCH_CURRENT_ALBUM_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

// ui
export const TOGGLE_ALBUMS = 'TOGGLE_ALBUMS'
export const CHANGE_ROWS = 'CHANGE_ROWS'
export const TOGGLE_ANIMATION = 'TOGGLE_ANIMATION'
export const FLIP = 'FLIP'
export const EXTEND = 'EXTEND'

// network
export const connect = () => ({ type: CONNECT })
export const disconnect = () => ({ type: DISCONNECT })

export const receiveMpcState = (state: MpcState) => ({ type: FETCH_MPC_STATE_SUCCESS, state })
export const receiveResults = (command: string, results: any) => {
	switch (command) {
		case 'artist':
		case 'date':
			return { type: FETCH_ALBUMS_SUCCESS, albums: results, tag: command }

		case 'currentAlbum':
			return { type: FETCH_CURRENT_ALBUM_SUCCESS, currentAlbum: results }

		default:
			return { type: FETCH_FAILURE }
	}
}

// playback
export const togglePlay = () => ({ type: SEND_MPC_COMMAND, command: 'toggle' })
export const prevSong = () => ({ type: SEND_MPC_COMMAND, command: 'previous' })
export const nextSong = () => ({ type: SEND_MPC_COMMAND, command: 'next' })
export const playId = (id: number) => ({ type: SEND_MPC_COMMAND, command: 'playId', args: [id] })
export const playArtist = (artist: string) => ({ type: SEND_MPC_COMMAND, command: 'playArtist', args: [artist] })
export const playDate = (date: number) => ({ type: SEND_MPC_COMMAND, command: 'playDate', args: [date] })
export const loadPlaylist = (name: string) => ({ type: SEND_MPC_COMMAND, command: 'loadPlaylist', args: [name] })

// mpc options
export const toggleRandom = () => ({ type: SEND_MPC_COMMAND, command: 'random' })

// queries
export const fetchAlbums = (song: { artist: string }, tag: string) => (dispatch: Function, getState: () => Object) => {
	const cache = getCache(getState(), `${tag}-${song[tag]}`)
	if (!cache) {
		return dispatch({ type: SEND_MPC_QUERY, command: tag, args: [song[tag]] })
	} else {
		return dispatch(receiveResults(tag, cache))
	}
}
export const fetchCurrentAlbum = () => ({ type: SEND_MPC_QUERY, command: 'currentAlbum' })

// ui
// tag = 'artist' or 'date'
export const toggleAlbums = (tag: ?string, force?: boolean) => ({ type: TOGGLE_ALBUMS, tag, force })
export const changeRows = (diff: number) => ({ type: CHANGE_ROWS, diff })
export const toggleAnimation = () => ({ type: TOGGLE_ANIMATION })
export const flip = () => ({ type: FLIP })
export const extend = () => ({ type: EXTEND })

// cache
const getCache = ({ cache }, key) => {
	const c = cache && cache[key]
	if (!c) return null
	if (Date.now() - c.ts > 1000 * 60 * 5) return null
	return c.data
}
