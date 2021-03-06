// @flow

import io from 'socket.io-client'
import { INIT_SOCKET, SEND_MPC_COMMAND, SEND_MPC_QUERY,
	connect, disconnect,
	receiveMpcState, receiveResults } from '../actions'

let socket = null

type Action = {
	type: string,
	command: string,
	args: any,
}

export default (store: { dispatch: Function}) => (next: Function) => (action: Action) => {
	switch (action.type) {
		case INIT_SOCKET:
			if (socket != null) {
				socket.close()
			}

			socket = io.connect()
			socket.on('connect', () => {
				store.dispatch(connect())
			})

			socket.on('mpc.state', (state) => {
				store.dispatch(receiveMpcState(state))
			})
			// after a query
			socket.on('mpc.results', ({ command, results }) => {
				store.dispatch(receiveResults(command, results))
			})

			socket.on('disconnect', () => {
				store.dispatch(disconnect())
			})

			break

		// one shot
		case SEND_MPC_COMMAND:
			if (!socket) return next(action)
			socket.emit('mpc.command', action.command, action.args)
			break

		// queries expect results
		case SEND_MPC_QUERY:
			if (!socket) return next(action)
			socket.emit('mpc.query', action.command, action.args)
			break

		default:
			return next(action)
	}
}
