// creates seed/mock data for users to seed our database with 
'use strict';

// from brcypt package
// defines bcrypt, config, params below by setting equalt to the required files
const bcrypt = require('bcrypt');
const config = require('../config/server.json');
// params comes from params file which sets params for user role, gender 
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // bulkInsert seeds (the array of users below)
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        // encrypts the passwords before storing 
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  // deletes all users (like how we have to delete all in rails seeds file before adding new seeds)
  down: (queryInterface, Sequelize) => {
    // bulk delete all users
    return queryInterface.bulkDelete('users', null, {});
  }
}
