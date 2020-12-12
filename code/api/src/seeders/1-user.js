'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: 'https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg',
        description: "I'm baby meggings church-key neutra, coloring book kitsch banh mi slow-carb pop-up irony snackwave",
        address_line1: '1234 There Blvd',
        address_line2: 'PO BOX 801234',
        city: 'Denver',
        state: 'CO',
        zipcode: 36479
      },
      {
        id: 2,
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: 'https://en.pimg.jp/045/948/028/1/45948028.jpg',
        description: 'Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke',
        address_line1: '5678 Here Ave',
        city: 'Pueblo',
        state: 'CO',
        zipcode: 85623
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
