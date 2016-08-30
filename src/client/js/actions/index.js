// network
export const CONNECT = 'CONNECT'

export const SEND_MPC_COMMAND = 'SEND_MPC_COMMAND'
export const SEND_MPC_QUERY = 'SEND_MPC_QUERY'
export const FETCH_MPC_STATE_SUCCESS = 'FETCH_MPC_STATE_SUCCESS'
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS'
export const FETCH_CURRENT_ALBUM_SUCCESS = 'FETCH_CURRENT_ALBUM_SUCCESS'

// ui
export const OPEN_ALBUMS = 'OPEN_ALBUMS'
export const CLOSE_ALBUMS = 'CLOSE_ALBUMS'
export const FLIP = 'FLIP'


export const receiveMpcState = (state) => ({ type: FETCH_MPC_STATE_SUCCESS, state })
export const receiveResults = (command, results) => {
	switch (command) {
		case 'albums':
			return { type: FETCH_ALBUMS_SUCCESS, albums: results }

		case 'currentAlbum':
			return { type: FETCH_CURRENT_ALBUM_SUCCESS, currentAlbum: results }

		default:
			return {}
	}
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
export const fetchCurrentAlbum = () => ({ type: SEND_MPC_QUERY, command: 'currentAlbum' })

// ui
export const openAlbums = () => ({ type: OPEN_ALBUMS })
export const closeAlbums = () => ({ type: CLOSE_ALBUMS })
export const flip = () => ({ type: FLIP })
