import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from './api/actions'

class EditProfileForm extends Component {
  constructor(props) {
    super(props)
    error: '',
    isLoading: false,
    user: {
      name: '',
      email: '',
      password: '',
      image: '',
      description: '',
      shipping: '',
      availableDate: '',
      history: {}
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
    event.preventDefault()

    this.setState({
      isLoading: true
    })

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

        {/* Left Content - Image Collage */}
        <GridCell>
          <Grid gutter={true} alignCenter={true}>
            <GridCell justifyCenter={true}>
              <ImageTile width={300} height={530} shadow={level1} image={`${ APP_URL }/images/stock/men/1.jpg`}/>
            </GridCell>

            <GridCell>
              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/women/2.jpg`}/>
                </GridCell>
              </Grid>

              <Grid>
                <GridCell justifyCenter={true}>
                  <ImageTile width={170} height={250} shadow={level1} image={`${ APP_URL }/images/stock/women/3.jpg`}
                             style={{ marginTop: '1.9em' }}/>
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
        </GridCell>

        {/* Right Content */}
        <GridCell style={{ textAlign: 'center' }}>
          <H3 font="secondary" style={{ marginBottom: '1em' }}>Create an account</H3>

          {/* Edit Info Form */}
          <form onSubmit={this.onSubmit}>
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

              {/* Image */}
              <Input
                type="image"
                fullWidth={true}
                placeholder="Image"
                {/* required="required" */}
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
                {/* required="required" */}
                name="description"
                value={this.state.user.description}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Shipping Address */}
              <Input
                type="text"
                fullWidth={true}
                placeholder="Shipping Address"
                {/* required="required" */}
                name="shipping"
                value={this.state.user.shipping}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />

              {/* Available Date ??? */}
              <Input
                type="date"
                fullWidth={true}
                placeholder="Available Date"
                {/* required="required" */}
                name="availableDate"
                value={this.state.user.availableDate}
                onChange={this.onChange}
                style={{ marginTop: '1em' }}
              />
            </div>

            <div style={{ marginTop: '2em' }}>
              {/* Login link */}
              <Link to={userRoutes.login.path}>
                <Button type="button" style={{ marginRight: '0.5em' }}>Login</Button>
              </Link>

              {/* Form submit */}
              <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                Signup
                <Icon size={1.2} style={{ color: white }}>navigate_next</Icon>
              </Button>
            </div>
          </form>
        </GridCell>

        {/* Auth Check */}
        <AuthCheck/>
      </Grid>
    )
  }
}



  render() {
    return (
      <div>
      EDIT INFO
      </div>
    )
  }
}

function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(EditProfileForm)
