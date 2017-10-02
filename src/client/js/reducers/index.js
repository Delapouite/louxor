// @flow

import { combineReducers } from 'redux'

import cache from './cache'
import mpc from './mpc'
import ui from './ui'

export default combineReducers({
	cache,
	mpc,
	ui
})
