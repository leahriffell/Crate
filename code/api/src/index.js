// Reminds me of a "runner file"
// This "plays" the information for the API

// Imports
// Express = Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// Express and APIS = With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
import express from 'express'

// App Imports
// These import local files from our setup folder that deal with things like parsing, JSON, server ports, graphql loading, etc
import setupLoadModules from './setup/load-modules'
import setupGraphQL from './setup/graphql'
import setupUpload from './setup/upload'
import setupStartServer from './setup/start-server'

// Create express server
// Creates a const variable to use in lines 21 and below so you don't call 'express()' each time
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)
