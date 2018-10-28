'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn('Users', 'salt', Sequelize.STRING)
  ],

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('Users', 'salt')
  ]
};
