// migration files are where table creation happens and database additions are created in our local db
// This file is telling our database how to build a user
// module.exports == other files can now access this file
module.exports = {
  // up = defines what should happen when we run the migration. (i.e. What changes do we want to make to our database?)
  // queryInterface = The interface that Sequelize uses to talk to all databases
  // Sequelize = a promise-based Node. js ORM for Postgres; a powerful JS library that makes it easy to manage a SQL database
  up: (queryInterface, Sequelize) => {
    // will return a table of users with the features/params/attributes defined in the curly brace block
    return queryInterface.createTable('users', {
      // creates an id for each user
      id: {
        // id should not be null
        allowNull: false,
        // ids will increase in order; Automatically gets converted to SERIAL for postgres
        autoIncrement: true,
        // defines this id as the primary key (since sequalize will assume your table has an id primary key property by default)
        primaryKey: true,
        // Defines the data type as an integer
        type: Sequelize.INTEGER
      },
      // creates a name for each user
      name: {
        // Defines the data type as a string
        type: Sequelize.STRING
      },
      // creates an email for each user
      email: {
        // Defines the data type as a text (TEXT VERSUS STRING: string = A variable length string. Default length 255. also has a binary property; text = An unlimited length text column)
        type: Sequelize.TEXT
      },
      // creates a password for each user
      password: {
        // Defines the data type as a text
        type: Sequelize.TEXT
      },
      // creates a role for each user
      role: {
        // Defines the data type as a text
        type: Sequelize.TEXT
      },
      // creates a createdAt timestamp for each user
      createdAt: {
        // timestamp should not be null
        allowNull: false,
        // Defines the data type as a Date
        type: Sequelize.DATE
      },
      // creates an updatedAt timestamp for each user
      updatedAt: {
        // timestamp should not be null
        allowNull: false,
        // Defines the data type as a Date
        type: Sequelize.DATE
      }
    // Closes return table of users block
    });
  // Closes up block
  },
  // For every up to the database, you need and equal down to the database (since migrations are basically version control, this allows you to 'rollback' migration files)
  // down = is the reverse. If we want to roll back to a previous version, then down undoes whatever up did.
  down: (queryInterface, Sequelize) => {
    // will return the action of dropping the table for users
    return queryInterface.dropTable('users');
  // closes down statement
  }
// closes module export
}
