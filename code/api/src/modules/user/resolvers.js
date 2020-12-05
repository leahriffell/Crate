// resolver tells query or mutation what to send back to the client as a reponse
// // Within the query - if a field produces a scalar value like a string or number, then the execution completes. However if a field produces an object value then the query will contain another selection of fields which apply to that object. This continues until scalar values are reached. GraphQL queries always end at scalar values.

// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
// imports all from the server file and sets it to serverConfig
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
// The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains (waits for all promises to be resolved)
// defines and exports the create function, parentValue is an operation
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  // findOne comes from node
  // The await expression causes async function execution to pause until a Promise is settled
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    // saltRounds is set in serverConfig file
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    // creates user with the hashed password set above
    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    // throws error below
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// what is parentValue used here and in function above? Where does this come from? It's used in all of the resolvers but I don't see it defined anywhere and couldn't find it on Google
export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    // is this 'get' below built in? How does it get the user with the specific email entered?
    const userDetails = user.get()

    // User exists
    // .compare is built into node's bcrypt package
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      // if password is correct, sets the user details to a const
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      // sends user details set above plus their json web token
      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// all of these below user node's methods to fetch specific users from the db

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
