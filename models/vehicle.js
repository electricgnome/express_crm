'use strict';
module.exports = (sequelize, DataTypes) => {
  var vehicle = sequelize.define('vehicle', {
    vin: DataTypes.STRING,
    year: DataTypes.INTEGER,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    coverage: DataTypes.STRING,
    deductible: DataTypes.STRING,
    pip: DataTypes.BOOLEAN,
    um: DataTypes.BOOLEAN,
    rental: DataTypes.BOOLEAN,
    towing: DataTypes.BOOLEAN,
    leinholder: DataTypes.STRING
  }, {});
  vehicle.associate = function(models) {
    vehicle.belongsTo(models.policy)
    // associations can be defined here
  };
  return vehicle;
};