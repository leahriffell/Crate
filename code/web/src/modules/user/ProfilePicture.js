import React, { Component } form 'react'
import PropTypes from 'prop-types'


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

    )
  }
}

function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState)(ProfilePicture)
