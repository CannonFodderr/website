'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        username: 'Admin',
        password: '123456',
        firstName: 'idan',
        lastName: 'izhaki',
        createdAt: new Date(),
        updatedAt: new Date(),
        birthday: new Date(),
        isAdmin: true
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
