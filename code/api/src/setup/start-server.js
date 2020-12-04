// This file allows you to start server from command line or throws an error if server cannot connect

// App Imports
import { PORT, NODE_ENV } from '../config/env'

// Start server
// exports a server
export default function (server) {
  console.info('SETUP - Starting server..')
  // server.listen method creates a listener on the specified port or path.
  server.listen(PORT, (error) => {
    // throws an error
    if (error) {
      console.error('ERROR - Unable to start server.')
      // otherwise boots up server and prints message to user that server is on (dynamic port)
    } else {
      console.info(`INFO - Server started on http://localhost:${ PORT } [${ NODE_ENV }]`)
    }
  })
}
