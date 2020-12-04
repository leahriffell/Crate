// defines types for User model 
// GraphQL cannot execute a query without a type system
// type system which is used to determine what to do next

// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// User type
// GraphQLObjectType = type with some fields (most types will be object types)
const UserType = new GraphQLObjectType({
  // names and describes what UserType is
  name: 'user',
  description: 'User type',

  // defines the possible data you can query on this service
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// User Login type
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  // defines what data to send for UserLogin 
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

// User Gender type
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',

  // defines the possible data you can query on this service
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

// explicitly export to be available elsewhere
export { UserType, UserLoginType, UserGenderType }