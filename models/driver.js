'use strict';
module.exports = (sequelize, DataTypes) => {
  var driver = sequelize.define('driver', {
    relation: DataTypes.STRING
 
  }, {});
  driver.associate = function(models) {
    driver.belongsTo(models.policy)
    //  driver.belongsTo(models.customer)
    // associations can be defined here
  };
  return driver;
};