// This file will setup graphql
// GraphQL = a query language for APIs and a runtime for fulfilling those queries with your existing data

// Imports
import graphqlHTTP from 'express-graphql'

// App Imports
// imposrt our server file for json
import serverConfig from '../config/server.json'
// imports our setup/authenication file
import authentication from './authentication'
// imports entire schema folder
import schema from './schema'

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL...')

  server.use(authentication)

  // API (GraphQL on route `/`)
  server.use(serverConfig.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    graphiql: serverConfig.graphql.ide,
    pretty: serverConfig.graphql.pretty,
    context: {
      auth: {
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}
