'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users','birthday')
    queryInterface.addColumn('Users', 'birthday', Sequelize.DATEONLY)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users','birthday')
    queryInterface.addColumn('Users','birthday', Sequelize.DATE)
  }
};
