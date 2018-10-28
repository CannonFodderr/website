'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn('Users', 'firstName', Sequelize.STRING),
    queryInterface.addColumn('Users', 'lastName', Sequelize.STRING)
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('Users', 'firstName', Sequelize.STRING),
    queryInterface.removeColumn('Users', 'lastName', Sequelize.STRING)
  ],
};
