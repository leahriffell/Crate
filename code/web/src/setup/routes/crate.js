// App Imports
import List from '../../modules/crate/List'

// Crate routes
// Will route to crates page on nav bar
export default {
  list: {
    path: '/crates',
    component: List,
    auth: true
  }
}
