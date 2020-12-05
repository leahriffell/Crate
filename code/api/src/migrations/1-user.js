// creates migration for Usrs table in database (like our migrations in rails)
// Sequelize is node's ORM that maps JS to SQL

module.exports = {
  // up = what happens when we run the migration
  // queryInterface = The interface that Sequelize uses to talk to all databases
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      // the attributes and their datatype to be included are below
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // down = what happens when we rollback the migration
  // every up must have a down 
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
}
