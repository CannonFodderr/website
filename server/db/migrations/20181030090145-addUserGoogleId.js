'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'googleId', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'googleId')
  }
};
