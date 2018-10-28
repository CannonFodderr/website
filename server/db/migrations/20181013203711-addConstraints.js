'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users',['username'],{
      type: 'unique',
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users',['username'], {type: 'unique'})
  }
};
