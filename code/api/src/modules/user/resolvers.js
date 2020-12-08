// This file tells query or mutation what to send back to the client as a reponse


// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
  // jwt: a compact URL-safe means of representing claims to be transferred between two parties

// App Imports
import serverConfig from '../../config/server'
  // Imports server details, what server does one's API talk to
import params from '../../config/params'
  // Imports JSON param details about our models
import models from '../../setup/models'
  // Imports SQL object database models

// Create
export async function create(parentValue, { name, email, password }) {
  // Exports a create function that takes name, email, and a raw password in 'modules/user/mutation.js'

// Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exist
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)
      // User isn't in system so use bcrypt to "password-hash" (aka secure encryption) the password
    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) {
  // Exports a login function that takes email and raw password
  const user = await models.User.findOne({ where: { email } })
     // Defines a user variable that will only save once the database is searched for the user by email

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

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
