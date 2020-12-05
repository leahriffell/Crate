// Imports
// I was getting confused about the different ways I've seen files import
// What I found in research looks like it is a difference in ES6 vs CommonJS? Maybe?
    // import { graphql } from 'graphql'; // ES6
    // var { graphql } = require('graphql'); // CommonJS
import { GraphQLSchema } from 'graphql'

// App Imports
// Imports from schema/queries.js
import query from './queries'
// Imports from schema/mutations.js
import mutation from './mutations'

// Schema
// Build a new schema with our queries and mutations files
const schema = new GraphQLSchema({
  query,
  mutation
})

// Exports our schema with our query and mutation behaviors
export default schema
