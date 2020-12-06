// App Imports
import { MESSAGE_SHOW, MESSAGE_HIDE } from './actions'

// Initial State
// 
export const commonInitialState = {
  message: {
    text: null,
    open: false
  }
}

// State
// why does this look like a reducer, yet it is in this state file instead of ind. files?
// saw that appReducers are combined in store (under setup)
// this state is in the combined reducers 
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
