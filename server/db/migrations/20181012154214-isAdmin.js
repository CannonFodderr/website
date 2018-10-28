'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => [
      queryInterface.addColumn('Users', "isAdmin", Sequelize.BOOLEAN)
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('Users', "isAdmin", Sequelize.BOOLEAN)
  ],
};
