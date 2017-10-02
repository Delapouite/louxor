// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'
import socketMiddleware from './socket'

export default (initialState: { mpc: MpcState }) =>
	createStore(reducer, initialState, compose(
		applyMiddleware(thunk, socketMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	))
