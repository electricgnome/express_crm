'use strict';
module.exports = (sequelize, DataTypes) => {
    var vehicle = sequelize.define('vehicle', {
        VIN: DataTypes.STRING, 
        year: DataTypes.INTEGER, 
        make: DataTypes.STRING, 
        model: DataTypes.STRING,     
        coverage: DataTypes.STRING, 
        leinholder: DataTypes.STRING,
        dealership: DataTypes.STRING,
        dealer_rep: DataTypes.STRING

  }, {});
  vehicle.associate = function(models) {
    vehicle.belongsTo(models.policy)
    // belongs to policy
  };
  return vehicle;
};