// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
  // This file writes all the queries (get/show/new/index) api calls for a user
  // pulls graphql dataypes from graphql package

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
  // Imports UserType, UserLoginType, and UserGenderType from the 'module/user/types.js' file.
  // UserType makes a GraphQL object while the model makes a database object/record
  // UserLoginType makes a GraphQL object for user authentication
  // UserGenderType creates a GraphQL object for pulling by a particular gender
import { getAll, getById, login, getGenders } from './resolvers'
  // retrieves the 'getAll', 'getById', 'login', and 'getGenders' functions from the module/user/resolvers.js file
  // getAll writes a behavior for calling all Users in the database
  // getById writes a behavior for calling a single User by their id
  // login passed params of email and password
  // getGenders - writes a behavior for calling a list of user by a passed gender in the API call


// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
}

// Genders
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
