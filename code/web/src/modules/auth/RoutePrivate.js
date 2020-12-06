// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// App Imports
import userRoutes from '../../setup/routes/user'

// Component
// if the user logs in succefully, they go to thier page, otherwise, they are directed to the login
const RoutePrivate = (props) => (
  props.user.isAuthenticated
    ? props.role
        ? props.user.details.role === props.role
          ? <Route {...props} component={props.component}/>
          : <Redirect to={userRoutes.login.path}/>
        : <Route {...props} component={props.component}/>
    : <Redirect to={userRoutes.login.path}/>
)

// Component Properties
RoutePrivate.propTypes = {
  user: PropTypes.object.isRequired,
}

// Component State
// This function is acting as mapStateToState

function routePrivateState(state) {
  return {
    user: state.user
  }
}

export default connect(routePrivateState, {})(RoutePrivate);
