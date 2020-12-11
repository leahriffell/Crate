// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

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
    },

    image: {
      name: 'image',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    address_line1: {
      name: 'address_line1',
      type: GraphQLString
    },

    address_line2: {
      name: 'address_line2',
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
      type: GraphQLInt
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

    image: {
      name: 'image',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    address_line1: {
      name: 'address_line1',
      type: GraphQLString
    },

    address_line2: {
      name: 'address_line2',
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
      type: GraphQLInt
    },

    email: {
      name: 'email',
      type: GraphQLString
    }
  },
  resolve: update
}

// Remove user
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
