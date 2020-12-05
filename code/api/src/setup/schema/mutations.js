// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
// imports all mutations for all models (users, products, crates, modules)
// * meaning get all functions defined in that file?
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'

// Mutation
// mutation is defined as graphql object
const mutation = new GraphQLObjectType({
  // name and description of this graphql object
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  // all of the things defined above are used here to be packaged under mutation and be passed to schema
  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

// export so that the schema can access
export default mutation
