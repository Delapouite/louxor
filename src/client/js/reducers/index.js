import { combineReducers } from 'redux'

import mpc from './mpc'
import ui from './ui'

export default combineReducers({
	mpc,
	ui
})
