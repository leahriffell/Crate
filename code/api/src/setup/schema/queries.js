// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
// Imports ALL query files (the astrix) from users/products/crate/subscriptions model/database setup
import * as user from '../../modules/user/query'
import * as product from '../../modules/product/query'
import * as crate from '../../modules/crate/query'
import * as subscription from '../../modules/subscription/query'

// Query
// query becomes a graphql object
const query = new GraphQLObjectType({
  // labels what the object is
  name: 'query',
  // describes the object
  description: 'API Queries [Read]',
  // creates a fields block to import the individual query files for user/product/crates/subscriptions
  fields: () => ({
    ...user,
    ...product,
    ...crate,
    ...subscription
  })
})

// Exports the query objects for your schema (see schema/index.js for the import)
export default query
