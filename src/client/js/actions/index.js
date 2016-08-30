// network
export const CONNECT = 'CONNECT'

export const SEND_MPC_COMMAND = 'SEND_MPC_COMMAND'
export const SEND_MPC_QUERY = 'SEND_MPC_QUERY'
export const FETCH_MPC_STATE_SUCCESS = 'FETCH_MPC_STATE_SUCCESS'
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS'

// ui
export const CLOSE_ALBUMS = 'CLOSE_ALBUMS'


export const receiveMpcState = (state) => ({ type: FETCH_MPC_STATE_SUCCESS, state })
export const receiveResults = (command, results) => {
	if (command === 'albums') {
		return { type: FETCH_ALBUMS_SUCCESS, albums: results }
	}
	return {}
}

// playback
export const togglePlay = () => ({ type: SEND_MPC_COMMAND, command: 'toggle' })
export const prevSong = () => ({ type: SEND_MPC_COMMAND, command: 'previous' })
export const nextSong = () => ({ type: SEND_MPC_COMMAND, command: 'next' })
export const playId = (id) => ({ type: SEND_MPC_COMMAND, command: 'playId', args: [id] })

// mpc options
export const toggleRandom = () => ({ type: SEND_MPC_COMMAND, command: 'random' })

// queries
export const fetchAlbums = (artist) => ({ type: SEND_MPC_QUERY, command: 'albums', args: [artist] })

// ui
export const closeAlbums = () => ({ type: CLOSE_ALBUMS })
