'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Contacts', 'name')
    queryInterface.addColumn('Contacts', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Contacts', 'name')
    queryInterface.addColumn('Contacts', 'name', {
        type: Sequelize.STRING,
        allowNull: false,
    })
  }
};
