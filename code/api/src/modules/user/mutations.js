// Imports
import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, update } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
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
}

// Update
export const userUpdate = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

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
    },

    image: {
      name: 'image',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }, 

    addressLine1: {
      name: 'addressLine1', 
      type: GraphQLString
    }, 

    addressLine2: {
      name: 'addressLine2', 
      type: GraphQLString
    },

    city: {
      name: 'city', 
      type: GraphQLString
    },

    state: {
      name: 'state', 
      type: GraphQLString
    },

    zipcode: {
      name: 'zipcode', 
      type: GraphQLString
    },

    availableDate: {
      name: 'availableDate',
      type: GraphQLString
    },

    history: {
      name: 'history',
      type: GraphQLString 
    }
  },
  resolve: update
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