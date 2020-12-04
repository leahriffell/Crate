// This file looks like it handles what happens when your app uploads a file onto your server

// Imports
// The Path module provides a way of working with directories and file paths.
import path from 'path'
// Multer is a node.js middleware for handling multipart/form-data, which is primary used for uploading files.
import multer from 'multer'

// App Imports
import serverConfig from '../config/server.json'

// File upload configurations and route
export default function (server) {
  // The console.info() method outputs an informational message to the Web Console
  console.info('SETUP - Upload...')

  // Set destination
  // diskStorage is a preshipped storage engine belonging to Multer
  const storage = multer.diskStorage({
    // sets a path for storing the uploaded file
    destination: path.join(__dirname, '..', '..', 'public', 'images', 'uploads'),

    filename: function (request, file, callback) {
      // adds a datestamp and other under-the-hood info for saving the sile
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  // upload will now hold a multer object that holds the storage variable created on line 19
  const upload = multer({
    storage: storage
    // Multer method for uploading a single file
  }).single('file')

  // Upload route
  // Tells the dynamic server to post
  server.post(serverConfig.upload.endpoint, (request, response) => {
    upload(request, response, function (error) {
      if (!error) {
        // Uses json to post
        response.json({
          success: true,
          file: request.file.filename
        })
      } else {
        response.json({
          success: false,
          file: null
        })
      }
    })
  })
}
