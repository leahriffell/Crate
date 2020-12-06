// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import { getListByUser } from '../subscription/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import SubscriptionItem from '../subscription/Item'

// Component
class Subscriptions extends PureComponent {

  // Runs on server only for SSR
  // server side responsibility 
  // static method 
  // means that called on the class itself, not instances of class 
  // pertains to this class specifically. 
  // fetches data from the store 
  // uses store.dispatch to get the user's list of subscriptions
  static fetchData({ store }) {
    return store.dispatch(getListByUser())
  }

  // Runs on client only
  // will run first and then again after state change ^^^ function above 
  // need to update the server and then the client 
  componentDidMount() {
    this.props.getListByUser()
  }

  // after getting information from server, then will render 
  // ternary if subscriptions isLoading, the display loading
  // if not, then checks subscription list length. if greater than 0 (if list exist) 
  // map over list and render subscription item using each subscription as a prop
  // or display message 
  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>My Subscriptions - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">My subscriptions</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>The crates you are subscribed to are listed here. You can
              cancel
              anytime.</p>
          </GridCell>
        </Grid>

        {/* Product list */}
        <Grid>
          <GridCell>
            {
              this.props.subscriptions.isLoading
                ? <Loading/>
                : this.props.subscriptions.list.length > 0
                    ? this.props.subscriptions.list.map(subscription => (
                        <div key={subscription.id} style={{ margin: '2em', float: 'left' }}>
                          <SubscriptionItem subscription={subscription} />
                        </div>
                      ))
                    : <EmptyMessage message="You are not subscribed to any crates yet." />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Subscriptions.propTypes = {
  subscriptions: PropTypes.object.isRequired,
  getListByUser: PropTypes.func.isRequired
}

// Component State
// connect subscriptionsByUser to store 
function subscriptionsState(state) {
  return {
    subscriptions: state.subscriptionsByUser
  }
}

export default connect(subscriptionsState, { getListByUser })(Subscriptions)
