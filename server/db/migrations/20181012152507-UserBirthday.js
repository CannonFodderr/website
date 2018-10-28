'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.addColumn('Users', 'birthday', Sequelize.DATE)
  ,

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('users', 'birthday')
};
