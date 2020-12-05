// This file writes all the mutation (basically POST/PATCH/DESTROY calls) api calls for a user

// Imports
// Pulls details (datatypes from graphql) from the graphql package
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
// Imports UserType from the types file in the module/user/types.js file (this method makes a GraphQL object - vs the model which makes a database object/record)
import { UserType } from './types'
// Imports the create and remove functions from the module/user/resolvers.js file
// Create writes the behavior of making a create/post api call for Users (or throws an error is the email is already in system - because it first checks if the User is in the database by email)
// Remove writes a destroy/delete behavior if you make an api call for Users by putting in an id
import { create, remove } from './resolvers'

// Create
// Defines the mutation for an api call for userSignup
export const userSignup = {
  // This is called from the UserType method in .types.js file (which makes it a graphql object)
  type: UserType,
  // Makes arguments for this user type (aka - what can you input in the Graphql using a mutation)
  args: {
    // arg = name
    name: {
      // defines user input as a string
      name: 'name',
      type: GraphQLString
    },
    // arg = email
    email: {
      // defines user input as a string
      name: 'email',
      type: GraphQLString
    },
    // arg = password
    password: {
      // defines user input as a string
      name: 'password',
      type: GraphQLString
    }
  // closes arguments
  },
  // applies resolver create
  resolve: create
// closes mutation userSignup
}

// Remove
// Defines the mutation for an api call for userRemove
export const userRemove = {
  // This is called from the UserType method in .types.js file (which makes it a graphql object)
  type: UserType,
  // Makes arguments for this user type (aka - what can you input in the Graphql using a mutation)
  args: {
    // arg = id
    id: {
      // defines user input as a Integer
      name: 'id',
      type: GraphQLInt
    }
  // closes arguments
  },
  // applies resovler remove
  resolve: remove
// closes mutation userRemove
}
