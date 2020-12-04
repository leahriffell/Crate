// Imports
import { GraphQLSchema } from 'graphql'
    // I think that GraphQLSchema is a model, but usure because I can't find it anywhere on the graphql file nor anywhere in this project besides this file 


// App Imports
import query from './queries'
import mutation from './mutations'
    // Both query and mutation are objects in their respective files

// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
    // Schema now consists of query and mutation
    // To Priya: would you also consider this a runner file? I'm conflicted
