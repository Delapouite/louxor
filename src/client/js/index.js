import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './store'
import App from './components/App'

const initialState = {
	status: {},
	currentSong: {}
}
const store = createStore(initialState)

store.dispatch({ type: 'CONNECT' })

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body.appendChild(document.createElement('div'))
)
