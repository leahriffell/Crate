// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const GET_USER = 'GET_USER'


// Actions

export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {id, name, email, role, image, description}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

export function loginSetUserLocalStorageAndCookie(token, user) {
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  cookie.set('auth', { token, user }, { path: '/' })
}

export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

export function editProfile(user) {
  return dispatch => {
    dispatch({
      type: EDIT_PROFILE,
      user
    })
    return axios.post(routeApi, mutation({
      operation: 'userUpdate',
      variables: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description
      },
      fields: ['id, name, email, image, description']
    }))
     .then(response => {
       const user = response.data.data.userUpdate
       getUserData(user)
     })
  }
}

export function getUserData(user) {
  return dispatch => {
    dispatch({ 
      type: GET_USER,
      user
    })
    return axios.post(routeApi, query({
      operation: 'user',
      variables: {
        id: user.id
      },
      fields: ['id, name, email, image, description']
    }))
     .then(response => {
       console.log(response)
    })
  }
}

export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
