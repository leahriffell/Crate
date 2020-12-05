// for client to upload image files?

// Imports
import path from 'path'
// Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
import multer from 'multer'

// App Imports
import serverConfig from '../config/server.json'

// File upload configurations and route
export default function (server) {
  console.info('SETUP - Upload...')

  // Set destination
  // use the .diskStorage() method to tell Express where to store files to the disk.
  const storage = multer.diskStorage({
    // destination path for where file will be stored 
    destination: path.join(__dirname, '..', '..', 'public', 'images', 'uploads'),

    filename: function (request, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({
    storage: storage
  }).single('file')

  // Upload route
  // post to db
  server.post(serverConfig.upload.endpoint, (request, response) => {
    upload(request, response, function (error) {
      if (!error) {
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
