'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'facebookId');
    queryInterface.addColumn('Users', 'facebookId', {
      type: Sequelize.BIGINT
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'facebookId');
    queryInterface.addColumn('Users', 'facebookId', {
      type: Sequelize.INTEGER
    });
  }
};
