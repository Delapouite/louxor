// @flow

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { h } from 'react-hyperscript-helpers'

import createStore from './store'
import App from './components/App'

const store = createStore({ mpc: window.LOUXOR_STATE })

store.dispatch({ type: 'INIT_SOCKET' })

ReactDOM.render(
	h(Provider, { store }, [h(App)]),
	// $FlowFixMe
	document.body.appendChild(document.createElement('div'))
)
