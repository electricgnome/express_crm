'use strict';
module.exports = (sequelize, DataTypes) => {
  var customer = sequelize.define('customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    contact: DataTypes.JSON,
    gender: DataTypes.BOOLEAN,
    marital_status: DataTypes.STRING,
    occupation: DataTypes.STRING,
    id_type: DataTypes.STRING,
    id_number: DataTypes.STRING,
    adress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    tickets: DataTypes.INTEGER,
    accidents: DataTypes.INTEGER,
    at_fault: DataTypes.BOOLEAN,
    pref_lang: DataTypes.STRING,
    home_owner: DataTypes.BOOLEAN,
    has_pop: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};