"use strict";
module.exports = (sequelize, DataTypes) => {
  var payment = sequelize.define(
    "payment",
    {
      status: DataTypes.STRING,
      payment_number: DataTypes.INTEGER,
      payment_date: DataTypes.DATEONLY
    },
    {}
  );
  payment.associate = function(models) {
    payment.belongsTo(models.policy);
    // associations can be defined here
  };
  return payment;
};
