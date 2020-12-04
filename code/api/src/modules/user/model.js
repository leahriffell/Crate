// executes js strict mode, which throws errors for "bad syntax" and doesn't let you use undeclared variables (can't accidentally create a global variable)
'use strict'

// creates User model with attributes 
// models live under modules 
// Module exports are the instructions that tells Node.js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code
// we're used to just requiring a file in ruby, but in JS we have to export AND include
module.exports = function(sequelize, DataTypes) {
  // let is used to declare a var (let has block scope as opposed to const which is global)
  // sequelize.define defines a new model, which represents a table in the db
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {  
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  // add relationship for user to have many subscriptions
  // this is a callback function (function that you pass as an argument)
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }
// ***are we explicitly returning User below because of {}s? Why one over the other? Halp FE***
  return User
}