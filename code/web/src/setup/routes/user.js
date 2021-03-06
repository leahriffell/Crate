// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'
import EditProfileForm from '../../modules/user/EditProfileForm'
import ProfilePicture from '../../modules/user/ProfilePicture'

// User routes
export default {
  login: {
    path: '/user/login',
    component: Login
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  },

  editProfile: {
    path: '/user/editprofile',
    component: EditProfileForm,
  }, 

  profileImage: {
    path: '/user/profile/image',
    component: ProfilePicture
  }
}
