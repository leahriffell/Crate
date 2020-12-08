import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from './api/actions'


class ProfilePicture extends Component {
  constructor() {
    super()
    this.state = {
      image: '',
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
      Hello
      </div>
    )
  }
}

function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(ProfilePicture)
