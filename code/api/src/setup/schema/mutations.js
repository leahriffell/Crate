// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
// Imports ALL mutation files (the astrix) from users/products/crate/subscriptions model/database setup
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'

// Mutation
// mutation becomes a graphql object
const mutation = new GraphQLObjectType({
  // labels what this object is
  name: 'mutations',
  // describes the object
  description: 'API Mutations [Create, Update, Delete]',
  // creates a fields block to import the individual mutation files for user/product/crates/subscriptions
  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

// Exports the mutation objects for your schema (see schema/index.js for the import)
export default mutation
