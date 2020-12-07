// App Imports
import * as dashboard from './dashboard'
import * as product from './product'
import * as crate from './crate'
import * as subscription from './subscription'
import * as user from './user'

// Admin routes
// Bundles all endpoints
// Data we are using
// Format of the request and response
const admin = {
  ...dashboard,
  ...product,
  ...crate,
  ...subscription,
  ...user
}

export default admin
