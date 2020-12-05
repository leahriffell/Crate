// authentication process
// checks that the user should be able to access

// Imports
// JSON Web Token
import jwt from 'jsonwebtoken'
// import from server config so that 'secret' can be accessed (super secret crate api key)
import serverConfig from '../config/server.json'

// Authentication middleware
export default function (request, response, next) {
  // set authToken var to the auth in request headers
  let authToken = request.headers.authorization

  // if a token was passed and it's not null
  if (authToken && authToken !== null) {
    // The try statement allows you to define a block of code to be tested for errors while it is being executed. The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.
    try {
      const token = authToken.split(' ')
      // verify the first element split from above is what is expected in secret
      request.user = jwt.verify(token[1], serverConfig.secret)
    } catch (e) {
      console.warn('Invalid token detected.')
    }
    // if there was no token or it's null
  } else {
    // send back empty response? what is this {}?
    request.user = {}
  }
  // next action is passed in above when function is called, this next action will happen after auth 
  next()
}
