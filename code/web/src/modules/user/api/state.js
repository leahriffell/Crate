// App Imports
// import necessary actions and a helper funciton 
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
// initial state for the reducers
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
// large reducer that sets the initial state with an object with key/value pairs for the states that are being accessed
// each case is what idenitifies the action and state being modified 
// SET_USER returns initialState object, updates isAuthenticated and details part of the state. 
// isAuthenticated is being updated via a helper function 
// isEmpty passes in an action associated with the user
// isEmpty checks to see if user has a name, if so, not empty. If no name or not an object, then returns false. 
// if there is a user, then isEmpty returns false
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

      // takes LOGIN_REQUEST action and sets state of error and isLoading
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

      // This depends on the backend's response
      // only updates if there's an error 
      // updates isLoading to false to signify that a connect with backend was established 
    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

      // Updates all of the state object back to it's original state once the user logsout
    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

      // no actions, then return initialState
    default:
      return state
  }
}