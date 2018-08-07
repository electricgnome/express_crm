'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    personal_email: DataTypes.STRING,
    phone: DataTypes.STRING,
    personal_phone: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    passcrypt: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};