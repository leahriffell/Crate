// App Imports
import params from '../../../setup/config/params'
import Dashboard from '../../../modules/admin/Dashboard'

// Admin dashboard routes
// Component represents what is rendered for the endpoint
// If auth is true for this path check to see if there is permission to access
// Role will check the role
export const dashboard = {
  path: '/admin/dashboard',
  component: Dashboard,
  auth: true,
  role: params.user.roles.admin
}
