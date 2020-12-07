// error catcher for "bad" JS syntax
'use strict'

// model.js in Module folder are where Object-relational mapping exist (ORM)
// in Rails this would be like the model files that contain relationships and validations
// User
// module exports are instructions that tell Node.js which pieces of code to export from a different file. In Ruby we just 'require', vs Javascript where we have to export and include.
module.exports = function(sequelize, DataTypes) {
  // let = declares a var (const is global, let has scope)
  // sequelize.define = defines new model, representing table in db
  let User = sequelize.define('users', {
    // creates attribute of name
    name: {
      type: DataTypes.STRING
      // defining the dataype (in this case string)
    },
    // creates attribute of email, etc.
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
  // calls user object and makes relationships
  // this is a callback function = function that you pass as an argument
  User.associate = function(models) {
    // User can have many subscriptions
    User.hasMany(models.Subscription)
  }

  return User
}
