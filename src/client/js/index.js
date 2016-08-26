import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { FETCH_MPC_STATE } from './actions'
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(rootReducer)

const socket = io.connect()
socket.on('mpc.state', (state) => {
	store.dispatch({
		type: FETCH_MPC_STATE, state
	})
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body.appendChild(document.createElement('div'))
)
