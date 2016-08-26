import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import socketMiddleware from './socket'

export default (initialState) =>
	createStore(reducer, initialState, compose(
		applyMiddleware(socketMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	))
