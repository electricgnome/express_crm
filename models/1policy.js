'use strict';
module.exports = (sequelize, DataTypes) => {
  var policy = sequelize.define('policy', {
    Policy_id: DataTypes.STRING, 
    Carrier: DataTypes.STRING, 
    policy_type:DataTypes.STRING, //personal auto, renters, HO, Commercial
    Agent: DataTypes.INTEGER, 
    down_payment: DataTypes.DECIMAL(5,2), 
    premium: DataTypes.DECIMAL(5,2), 
    effective_date: DataTypes.DATEONLY , 
    // payment_day: DataTypes.INTEGER, 
    renewal_date: DataTypes.DATEONLY, 
    status: DataTypes.STRING 

  }, {});
  policy.associate = function(models) {
    // belongs to 
  };
  return policy;
};