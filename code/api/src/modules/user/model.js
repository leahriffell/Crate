// enters strict mode, a modern error catcher for JS syntax and optimization
'use strict'

// The model.js files in Module folder are where ORM exist
// Rails connection == model files with attributes section and relationships section

// User
// exports a function that uses Sequelize (postgres and SQL connection to local database) and DataTypes (a Sequelize method)
module.exports = function(sequelize, DataTypes) {
  // let = ES6 update from var
  // User variable is set to a sequel definition of a table
  let User = sequelize.define('users', {
    // creates attribute name
    name: {
      // sets it to data type = string
      type: DataTypes.STRING
    },
    // creates attribute email
    email: {
      // sets it to data type = text
      type: DataTypes.TEXT
    },
    // creates attribute password
    password: {
      // sets it to data type = text
      type: DataTypes.TEXT
    },
    // creates attribute role
    role: {
      // sets it to data type = text
      type: DataTypes.TEXT
    }
  // Closes new User variable function block
  })

  // Calls User object and makes relationships
  User.associate = function(models) {
    // Users will have many subscriptions
    // How are we able to call models? Is it just set on line 37?
    User.hasMany(models.Subscription)
  }
  // Explicit return of the User object
  return User
}
