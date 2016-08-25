import { FETCH_MPC_STATE } from '../actions/'

const initialState = {
	status: {},
	currentSong: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MPC_STATE:
			return action.state
		default:
			return state
	}
}
