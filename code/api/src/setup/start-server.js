// ability to start the server from command line

// App Imports
// which port
import { PORT, NODE_ENV } from '../config/env'

// Start server
export default function (server) {
  // provide info that it's starting (prints to console)
  console.info('SETUP - Starting server..')

  server.listen(PORT, (error) => {
    if (error) {
      // sends error in console if error
      console.error('ERROR - Unable to start server.')
    } else {
      // notifies of success in console w/ dyanmic port 
      console.info(`INFO - Server started on http://localhost:${ PORT } [${ NODE_ENV }]`)
    }
  })
}
