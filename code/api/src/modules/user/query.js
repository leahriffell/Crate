// This file writes all the query (basically GET/SHOW/NEW/INDEX calls) api calls for a user

// Imports
// Pulls details (datatypes from graphql) from the graphql package
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
// Imports UserType from the types file in the module/user/types.js file (this method makes a GraphQL object - vs the model which makes a database object/record)
// Imports UserLoginType from the types file in the module/user/types.js file (this method creates a graphql object for user authentication)
// Imports UserGenderType from the types file in the module/user/types.js file (this method creates a graphql object for pulling by a particular gender)
import { UserType, UserLoginType, UserGenderType } from './types'
// Imports the getAll, getById, login and getGenders functions from the module/user/resolvers.js file
// getAll - writes a behavior for calling all Users in the database
// getById - writes a behavior for calling a single User by their id
// login - passed params of email and password; writes a complex behavior that first checks if the user is in the sytem (if not, throws an error); otherwise, it 'gets' the user from the database and then checks if it the passwword if correct (if not, throws a new error); if password matches, it returns user details for the profile page AND the jwt token
// getGenders - writes a behavior for calling a list of user by a passed gender in the API call
import { getAll, getById, login, getGenders } from './resolvers'

// All
// Writes the query variable (users) for getting a list of all users
// Note - this does not take arguments
export const users = {
  // Defines it as a graphql list datatype (specifically pulling on the graphql type object of UserType - aka returning a list of all the user graphql objects)
  type: new GraphQLList(UserType),
  // calls resolver behavior of getAll
  resolve: getAll
}

// By ID
// Writes the query variable (user) for returning a single user by id
export const user = {
  // Defines it as a graphql object
  type: UserType,
  // Takes in an argument
  args: {
    // The argument needs to be the user id
    // Defines the type as graphql Integer
    id: { type: GraphQLInt }
  },
  // calls resolver behavior of getById
  resolve: getById
}

// Auth
// Writes the query variable (userLogin) for returning data after a successful login
export const userLogin = {
  // Defines it as a graphql object dealing with authentication
  type: UserLoginType,
  // Takes in an argument
  args: {
    // The argument needs email
    email: {
      // Defines the user input as a string
      name: 'email',
      type: GraphQLString
    },
    // The argument needs password
    password: {
      // Defines the user input as a string
      name: 'password',
      type: GraphQLString
    },
    // The argument takes on a role?
    // This may be some sort of default - still trying to find where a user can be defined as Admin vs User
    // The usage is to assign role to show in data response (for user profile page)
    role: {
      // Defines the user input as a string
      name: 'role',
      type: GraphQLString
    }
  },
  // calls resolver behavior login
  resolve: login
}

// Genders
// Writes the query variable (userGenders) for returning a list of users by a passed param of gender
// Note - this does not take arguments
export const userGenders = {
  // Defines it as a graphql list datatype (specifically pulling on the graphql type object of UserType - aka returning a list of all the user graphql objects BY PASSED GENDER REQUIREMENT)
  type: new GraphQLList(UserGenderType),
  // calls resolver behavior getGenders
  resolve: getGenders
}
