// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// User type
// Why do we need this Object when we have User creating in module/user/model.js
// Ahh, the model.js file is interacting with your SQL database
// Whereas this file is converting it to a graphql object
const UserType = new GraphQLObjectType({
  // labels the object as a user
  name: 'user',
  // describes the obect
  description: 'User type',
  // Defines the user model attributes using graphql datatypes that match the model.js file
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    // Includes a timestamp createdAt
    createdAt: { type: GraphQLString },
    // Includes a timestamp updatedAt
    updatedAt: { type: GraphQLString }
  })
})

// User Login type
// Makes a graphql object for UserLoginType
const UserLoginType = new GraphQLObjectType({
  // labels the object as userAuth
  name: 'userAuth',
  // describes the object
  description: 'User Authentication Type',
  // writes graphql fields for user and token (the two datas reported in the api response)
  fields: () => ({
    // graphql user object
    user: { type: UserType },
    // data type = graphql string
    token: { type: GraphQLString }
  })
})

// User Gender type
// Makes a graphql object for UserGenderType
const UserGenderType = new GraphQLObjectType({
  // labels the object as userGender
  name: 'userGender',
  // describes the object
  description: 'User Gender Type',
  // writes graphql fields for id and name (the two attributes reported in the api response)
  fields: () => ({
    // data type = graphql integer
    id: { type: GraphQLInt },
    // data type = graphql string
    name: { type: GraphQLString }
  })
})

// Explicitly exports the 3 types defined in this file
export { UserType, UserLoginType, UserGenderType }
