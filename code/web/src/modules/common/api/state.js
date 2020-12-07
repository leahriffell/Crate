// App Imports
// state of which messages are being shown
import { MESSAGE_SHOW, MESSAGE_HIDE } from './actions'

// Initial State - will always be the default state
export const commonInitialState = {
  message: {
    text: null,
    open: false
  }
}

// State
// Messages set with a timeout
export default (state = commonInitialState, action) => {
  switch (action.type) {
    case MESSAGE_SHOW:
      return {
        ...state,
        message: {
          text: action.message,
          open: true
        }
      }

    case MESSAGE_HIDE:
      return {
        ...state,
        message: {
          text: null,
          open: false
        }
      }

    default:
      return state
  }
}
