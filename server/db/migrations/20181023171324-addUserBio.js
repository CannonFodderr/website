'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'bio')
  }
};
