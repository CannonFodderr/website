'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'birthday', {
      type: Sequelize.DATEONLY
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Users', 'birthday', {
      type: Sequelize.DATE
    })
  }
};
