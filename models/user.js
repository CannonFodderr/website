'use strict';
const db = require('./index')
db.
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    password: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};