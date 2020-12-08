// Imports
import { GraphQLString, GraphQLInt } from 'graphql'
  // This file writes all the mutation (post/patch/destroy) api calls for a user
  // pulls graphql dataypes from graphql package

// App Imports
import { UserType } from './types'
  // Imports UserType from the types file in the module/user/types.js file
  // this method makes a GraphQL object while the model makes a database object/record
import { create, remove } from './resolvers'
  // retrieves the 'create' and 'remove' functions from the module/user/resolvers.js file
  // Create: writes the behavior of making a create/post api call for Users
  // Remove: writes a 'destroy' behavior if one makes an api call for Users by putting in ID

// Create
export const userSignup = {
  // defines and exports userSignup const (create user) - mutation?
  // defines what the user is allowed to send
  type: UserType,
    // This is called from the UserType method in '.types.js' file (which makes it a graphql object)
  args: {
    // Like a hash in Ruby
    name: {
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
  resolve: create
     // executes create function from 'modules/user/resolvers.js' file
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
