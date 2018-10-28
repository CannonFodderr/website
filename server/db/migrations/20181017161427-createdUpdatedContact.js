'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Contacts', 'created_at', Sequelize.DATE)
    queryInterface.addColumn('Contacts', 'updated_at', Sequelize.DATE)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Contacts', 'created_at')
    queryInterface.removeColumn('Contacts', 'updated_at')
  }
};
