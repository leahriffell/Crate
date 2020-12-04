// this file creates query endpoints for Users (create and delete) model

// Imports
// imports from graphql
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
// defines and exports users const (get all users)
export const users = {
  // GraphQL list represents a sequence of values
  type: new GraphQLList(UserType),
  // runs getAll in resolver file which fetches all from User model
  resolve: getAll
}

// By ID
// defines and exports user const (get user by id query)
export const user = {
  // UserType sends specific fields when a user is displayed (id, name, email, etc.). Defined in /types
  type: UserType,
  args: {
    // client passes in desired id as GraphQLInt
    id: { type: GraphQLInt }
  },
  // runs getById in resolver file which finds the user within User model that has that id
  resolve: getById
}

// Auth
// defines and exports userLogin const (auth and login user)
export const userLogin = {
  // UserLoginType displays user details and token
  type: UserLoginType,
  args: {
    // client passes in these args
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
  // runs login in resolver file which auths and manages error handling
  resolve: login
}

// Genders
// defines and exports userGenders const ()
export const userGenders = {
  // UserGenderType sends user id and gender 
  // what if i just wanted to add gender to the getUsers query?
  type: new GraphQLList(UserGenderType),
  // runs getGenders from resolver file which includes a user's gender attr
  resolve: getGenders
}
