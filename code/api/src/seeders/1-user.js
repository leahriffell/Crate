// use strict = invokes strict mode; strict mode = throws errors on syntax mistakes that might not be caught in "sloppy mode"; can make run time faster since it fixes mistakes found as you optimize
'use strict';
// const is a block variable that cannot be updated or reassigned
// bcyrpt is our const variable name that is set to require from the bcrypt package
const bcrypt = require('bcrypt');
// config is our const variable name that is set to require a local file - in this case it is setting up information for what server we want to port to
const config = require('../config/server.json');
// params is our const variable name that is set to require a local file - in this case it is calling particular db table params defined in a separate file
// These params take the migration (table) attributes of user and nested defines them further, like role can now take on admin vs user
const params = require('../config/params.json');

// module exports allows other files to access this data
module.exports = {
  // up will define what will happen when we run seeds
  // queryInterface belongs to Sequelize, and Sequelize is our way of connecting to our Postgres database
  up: (queryInterface, Sequelize) => {
    // will return a bulk insert of users
    // bulkInsert = a queryInterface(aka Sequelize) method that inserts multiple records into a table
    // We are inserting an array of data
    return queryInterface.bulkInsert('users', [
      // this defines the first element of the array
      {
        // the following represents dummy data for an admin user
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // the following represents dummy data for a traditional user
        name: 'The User',
        email: 'user@crate.com',
        // This should be how we login on the web app server
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    // Closes the bulkInsert block
    ])
  // Closes the up block
  },
  // For every up, there is always a down
  // This will allow us to roll back these seeds (dummy data)
  down: (queryInterface, Sequelize) => {
    // bulkDelete = detle multiple records from a table
    // This will bulkDelete the users dummy data from above
    return queryInterface.bulkDelete('users', null, {});
  // Closes the down block
  }
// Closes the module export
}
