'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn('Users', 'phone', Sequelize.STRING)
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('Users', 'phone')
  ]
};
