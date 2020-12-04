// This is where authentication information is held

// Imports
// jwt is a package (JWT = internet standard for creating data with optional signature or optional encryption whose payloads hold JSON)
// This means you can transfer information safely
import jwt from 'jsonwebtoken'
// Gives access to the port and secrets needed for authentication and JWT/JSON
import serverConfig from '../config/server.json'

// Authentication middleware
export default function (request, response, next) {
  // your request headers will contain the credentials to authenticate a user agent with a server
  let authToken = request.headers.authorization

  // if authToken exists AND it is NOT null
  if (authToken && authToken !== null) {
    // The try...catch statement marks a block of statements to try and specifies a response should an exception be thrown.
    try {
      // token (an array) will now hold authToken where the string is broken up by spaces
      const token = authToken.split(' ')
      // your request.user should verify if the token matches the secret in the config
      request.user = jwt.verify(token[1], serverConfig.secret)
    // catch will be your error
    } catch (e) {
      // displays a warning that token is invalid or not detected
      console.warn('Invalid token detected.')
    }
  // if authToken doesn't exist or is null
  } else {
    // return an opportunity to assign authorization?
    request.user = {}
  }
  // Calls the next action to perform once default function is done
  next()
// Closes export
}
