// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'
import socketMiddleware from './socket'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (initialState: { mpc: MpcState }) =>
	createStore(reducer, initialState, composeEnhancers(
		applyMiddleware(thunk, socketMiddleware),
	))
