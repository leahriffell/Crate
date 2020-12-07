// Imports
import dotenv from 'dotenv'

// Load .env
// Is a node package
// the environment variable
// Different envs have differnt URLS because there are 3 deployed versions of the app
// Different environments will use different urls both for front end routing and back end api
dotenv.config()

// URL
export const APP_URL = process.env.APP_URL
export const APP_URL_API = process.env.APP_URL_API

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT || 3000
