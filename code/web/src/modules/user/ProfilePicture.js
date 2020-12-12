import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from './api/actions'
import { upload } from '../common/api/actions'


class ProfilePicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      id: ''
    }
  }

  componentDidMount(props) {
    this.setState({ 
      image: this.props.user.details.image,
      id: this.props.user.details.id
    })
  }

  render(props) {

      return (
        <div>
          <img src={this.state.image} />
        </div>
      )
  }
}

function profileState(state) {
  return {
    user: state.user
  }
}



export default connect(profileState, { upload })(ProfilePicture)
