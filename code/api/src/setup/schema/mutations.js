// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'
    // everything (*) as one variable from its respective file


// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',
      // Would this make this file sort of like a MutationController?
  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

export default mutation
    // makes part of the index file
