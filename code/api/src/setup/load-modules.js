// This file will load all module folder file data

// Imports
// express is a like lightweight node
import express from 'express'
// The Path module provides a way of working with directories and file paths.
import path from 'path'
// Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources.
import cors from 'cors'
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import bodyParser from 'body-parser'
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
import cookieParser from 'cookie-parser'
// a logging tool
import morgan from 'morgan'

// App Imports
import { NODE_ENV } from '../config/env'

// Load express modules
// exports server
export default function (server) {
  console.info('SETUP - Loading modules...')

  // Enable CORS
  server.use(cors())

  // Request body parser
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))

  // Request body cookie parser
  server.use(cookieParser())

  // Static files folder
  server.use(express.static(path.join(__dirname, '..', '..', 'public')))

  // HTTP logger
  if(NODE_ENV === 'development') {
    server.use(morgan('tiny'))
  }
}
