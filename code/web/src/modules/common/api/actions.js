// Actions Types
// importing axios - need to do more research 
// look into routeApi to see what its purpose is
import axios from 'axios/index'
import { routeApi } from '../../../setup/routes'

export const MESSAGE_SHOW = 'COMMON_MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON_MESSAGE_HIDE'

// Actions
// these message seems to be modular for multiple components 
// state must be in store because needed actions 
// find reducers that correlate with these actions 
export function messageShow(message) {
  return { type: MESSAGE_SHOW, message }
}

export function messageHide() {
  return { type: MESSAGE_HIDE }
}

//does this refer to any upload? Look to see where this action is imported 
// I believe this referes to any data upload 
// helper function that makes a post request to the routeApi with the passed in data 
// looking at the content-type, I can see that it relates to a form
export function upload(data) {
  return dispatch => {
    return axios.post(routeApi + '/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

