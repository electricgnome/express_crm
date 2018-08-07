'use strict';
module.exports = (sequelize, DataTypes) => {
    var payment = sequelize.define('payment', {
        status: DataTypes.STRING,
        payment_number: DataTypes.STRING,
        payment_date:DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    payment.belongsTo(models.policy)  
    // belongs to policy
  };
  return payment;
};