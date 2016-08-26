export const CONNECT = 'CONNECT'

export const SEND_MPC_COMMAND = 'SEND_MPC_COMMAND'
export const FETCH_MPC_STATE = 'FETCH_MPC_STATE'

export const fetchMpcState = (state) => ({ type: FETCH_MPC_STATE, state })
export const togglePlay = () => ({ type: SEND_MPC_COMMAND, command: 'toggle' })
