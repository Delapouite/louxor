/* global io */
import { CONNECT, SEND_MPC_COMMAND, fetchMpcState } from '../actions'

let socket = null

export default store => next => action => {
	switch (action.type) {
		case CONNECT:
			if (socket != null) {
				socket.close()
			}

			socket = io.connect()
			socket.on('mpc.state', (state) => {
				store.dispatch(fetchMpcState(state))
			})
			break

		case SEND_MPC_COMMAND:
			socket.emit('mpc.command', action.command)
			break

		default:
			return next(action)
	}
}
