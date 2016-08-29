/* global io */
import { CONNECT, SEND_MPC_COMMAND, SEND_MPC_QUERY, receiveMpcState, receiveResults } from '../actions'

let socket = null

export default store => next => action => {
	switch (action.type) {
		case CONNECT:
			if (socket != null) {
				socket.close()
			}

			socket = io.connect()
			socket.on('mpc.state', (state) => {
				store.dispatch(receiveMpcState(state))
			})
			// after a query
			socket.on('mpc.results', ({ command, results }) => {
				store.dispatch(receiveResults(command, results))
			})
			break

		// one shot
		case SEND_MPC_COMMAND:
			socket.emit('mpc.command', action.command, action.args)
			break

		// queries expect results
		case SEND_MPC_QUERY:
			socket.emit('mpc.query', action.command, action.args)
			break;

		default:
			return next(action)
	}
}
