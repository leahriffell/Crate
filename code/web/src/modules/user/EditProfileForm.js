import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout, editProfile } from './api/actions'
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
        password: '',
        image: '',
        description: '',
        adressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: 0,
        availableDate: '',
        history: {}
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

  // changeImagePath = (event) => {
  //   let user = this.state.user
  //   user.image = event.target.value
  //   user.image.replace("C:\\fakepath\\", '')
  //   this.setState({
  //     user
  //   })
  // }
    //this.props.messageShow('Signing you up, please wait...')

  //   this.props.register(this.state.user)
  //     .then(response => {
  //       this.setState({
  //         isLoading: false
  //       })
  //
  //       if (response.data.errors && response.data.errors.length > 0) {
  //         this.props.messageShow(response.data.errors[0].message)
  //       } else {
  //         this.props.messageShow('Signed up successfully.')
  //
  //         this.props.history.push(userRoutes.login.path)
  //       }
  //     })
  //     .catch(error => {
  //       this.props.messageShow('There was some error signing you up. Please try again.')
  //
  //       this.setState({
  //         isLoading: false,
  //         error: 'Error signing up.'
  //       })
  //     })
  //     .then(() => {
  //       window.setTimeout(() => {
  //         this.props.messageHide()
  //       }, 5000)
  //     })
  // }

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

              {/* Password */}
              <Input
                type="password"
                fullWidth={true}
                placeholder="Password"
                required="required"
                name="password"
                value={this.state.user.password}
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
                placeholder="Address_Line1"
                required="required"
                name="adressLine1"
                value={this.state.user.adressLine1}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              <Input
                type="text"
                fullWidth={true}
                placeholder="Address_Line2"
                required='false'
                name="addressLine2"
                value={this.state.user.addressLine2}
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

              <Input
                type="text"
                fullWidth={true}
                placeholder="Zipcode"
                required="required"
                name="zipCode"
                value={this.state.user.zipCode}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Available Date ??? */}
              <Input
                type="date"
                fullWidth={true}
                placeholder="Available Date"
                name="availableDate"
                value={this.state.user.availableDate}
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
