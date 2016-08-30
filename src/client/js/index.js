import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './store'
import App from './components/App'

const store = createStore({ mpc: window.LOUXOR_STATE })

store.dispatch({ type: 'CONNECT' })

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body.appendChild(document.createElement('div'))
)
