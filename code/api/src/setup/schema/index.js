// creates schema for the endpoint

// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
// import the schema/queries file and set equal to 'query'
import query from './queries'
// import the schema/mutations file and set equal to 'mutation'
import mutation from './mutations'

// Schema
// schema meaning what the user is available to query? (what shows up in graphiql interface?)
const schema = new GraphQLSchema({
  query,
  mutation
})

// export to be available elsewhere
export default schema
