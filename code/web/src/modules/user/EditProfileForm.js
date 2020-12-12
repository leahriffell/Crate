import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editProfile } from './api/actions'
import { Grid, GridCell } from '../../ui/grid'
import { Helmet } from 'react-helmet'
import { Link, withRouter } from 'react-router-dom'
import Input from '../../ui/input/Input'
import userRoutes from '../../setup/routes/user'
import Button from '../../ui/button'
import profileImage from '../../setup/routes/user'


class EditProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      isLoading: false,
      user: {
        id: this.props.user.details.id,
        name: '',
        email: '',
        image: '',
        description: '',
        adress_line1: '',
        address_line2: '',
        city: '',
        state: ''
      }
    }
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value
    this.setState({
      user
    })
  }

  onSubmit = (event) => {
    this.setState({
      isLoading: true
    })
    this.props.editProfile(this.state.user)
  }

  render() {
    return (
      <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
        {/* SEO */}
        <Helmet>
          <title>Edit Your Account - Crate</title>
        </Helmet>

          {/* Edit Info Form */}
          <form>
            <div style={{ width: '25em', margin: '0 auto' }}>
              {/* Name */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Name"
                required="required"
                name="name"
                value={this.state.user.name}
                onChange={this.onChange}
              />

              {/* Email */}
              <Input
                type="email"
                fullWidth={true}
                placeholder="Email"
                required="required"
                name="email"
                value={this.state.user.email}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Image
              <Input
                type="file"
                accept="image/*"
                fullWidth={true}
                placeholder="Image"
                name="image"
                value={this.state.user.image}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              /> */}

              {/* image */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Image"
                name="image"
                value={this.state.user.image}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Description */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Description"
                name="description"
                value={this.state.user.description}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Shipping Address */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Address_line1"
                required="required"
                name="adress_line1"
                value={this.state.user.adress_line1}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              <Input
                type="text"
                fullWidth={true}
                placeholder="Address_line2"
                required={false}
                name="address_line2"
                value={this.state.user.address_line2}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />  

              <Input
                type="text"
                fullWidth={true}
                placeholder="City"
                required="required"
                name="city"
                value={this.state.user.city}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              <Input
                type="text"
                fullWidth={true}
                placeholder="State"
                required="required"
                name="state"
                value={this.state.user.state}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />
 
            </div>

            <div style={{ marginTop: '2em' }}>
            {/* Profile Form link */}
            <Link to={userRoutes.profile.path}>
              <Button type="button" onClick={this.onSubmit} style={{ marginRight: '0.5em' }}>Submit</Button>
            </Link>

            {/* Form submit */}
            </div>
          </form>

      </Grid>
    )
  }
}



function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { editProfile })(EditProfileForm)
