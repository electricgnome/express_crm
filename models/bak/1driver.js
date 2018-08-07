'use strict';
module.exports = (sequelize, DataTypes) => {
  var driver = sequelize.define('driver', {
    person: DataTypes.INTEGER, //customer_id
    relation: DataTypes.STRING
  }, {});
  driver.associate = function(models) {
    driver.belongsTo(models.policy)
    // belongs to policy
  };
  return driver;
};