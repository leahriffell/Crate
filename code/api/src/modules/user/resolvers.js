// Imports
// bcyrpt - is a password-hashing function
import bcrypt from 'bcrypt'
// jwt -  is a compact URL-safe means of representing claims to be transferred between two parties
import jwt from 'jsonwebtoken'

// App Imports
// Imports server details (what server does my api talk to)
import serverConfig from '../../config/server'
// Imports JSON param details about our models
import params from '../../config/params'
// SQL object database models
import models from '../../setup/models'

// Create
// This function is called modules/user/mutation.js
// Exports a create function that takes name, email, and a raw password
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })
  // If the user does not exist, then...
  if (!user) {
    // User does not exists
    // Since user isn't in system, use bcrypt to "password-hash" (aka secure encryption) the password
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)
    // await - after the promise fulfilled
    // call the user model and create with name, email, and password-hashed (never save raw passwords!!!!!)
    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  // Else = the user does exist in the database
  } else {
    // User exists
    // Dynamic error message
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
// Closes create function
}

// Exports a login function that takes email and raw password
export async function login(parentValue, { email, password }) {
  // Defines a user variable that will only save once the database is searched for the user by email
  const user = await models.User.findOne({ where: { email } })
  // If the user does NOT exist in the database, then...
  if (!user) {
    // User does not exists
    // Throw a dynamic error message because email was not in database
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  // Else = the user does exist in database
  } else {
    // Defines a new variable (userDetails) that calls a user.get
    const userDetails = user.get()

    // User exists
    // Confirms password matches by waiting for the bcrypt comparison of the raw password and the password-hash
    const passwordMatch = await bcrypt.compare(password, userDetails.password)
    // if the passwords do NOT match
    if (!passwordMatch) {
      // Incorrect password
      // Throw an error message
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    // Else = password does match
    } else {
      // define a new block of data called userDetailsToken that returns id, name, email, and role of a user
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }
      // Explicitly returns the user details from above && the jwt secret for authorization
      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
// Exports a function for getting a user by id that takes in an id param/argument
export async function getById(parentValue, { id }) {
  // returns after promise is fulfilled, a single user from the database that matches the id
  return await models.User.findOne({ where: { id } })
  // curious what the graphql server response error is when you enter an id that doesn't exist in database?
}

// Get all
// Exports a function for getting all users in the database
export async function getAll() {
  // returns after promise if fulfilled, all users are returned
  return await models.User.findAll()
}

// Delete
// Exports a function for deleting a user that takes in an id as param/arg
export async function remove(parentValue, { id }) {
  // returns after promise is fulfilled, a user is destroyed from the database
  return await models.User.destroy({ where: { id } })
  // curious what the graphql server response error is when you enter an id that doesn't exist in database?
}

// User genders
// Exports a function for sorting users by gender
export async function getGenders() {
  // Returns of users by gender
  return Object.values(params.user.gender)
}
