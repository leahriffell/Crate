// this file creates mutation endpoints for Users (create and delete) model

// Imports
// GraphQLString (a scalar type representing strings), GraphQLInt (a scalar type representing integers) are modules imported from graphql 
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
// imports UserType const from user/types, which contains user attr and their role type
import { UserType } from './types'
// imports create and remove functions from user resolvers
import { create, remove } from './resolvers'

// Create
// defines and exports userSignup const (create user)
// defines what the user is allowed to send me (like a schema)
export const userSignup = {
  // UserTypes from user/types (name: name, description: user type)
  type: UserType,
  // args is like a hash in Ruby
  args: {
    name: {
      // 'name' is a placeholder for what the client can edit. I could put anywhere in here as long as it matches datatype
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  // execute create function from user resolver file
  resolve: create
}

// Remove
// defines and exports userRemove const (delete user)
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  // execute remove function
  resolve: remove
}