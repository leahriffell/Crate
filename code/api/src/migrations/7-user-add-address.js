'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'address_line1', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'address_line2', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'zipcode', {
        type: Sequelize.INTEGER
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'address_line1'),
      queryInterface.removeColumn('users', 'address_line2'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'state'),
      queryInterface.removeColumn('users', 'zipcode')
    ]);
  }
};
