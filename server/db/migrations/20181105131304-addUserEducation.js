'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'education', {
      type: Sequelize.ARRAY({ type: Sequelize.STRING })
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'education')
  }
};
