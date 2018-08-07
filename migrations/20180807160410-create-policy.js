'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('policies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      policy_id: {
        type: Sequelize.STRING
      },
      carrier: {
        type: Sequelize.STRING
      },
      policy_type: {
        type: Sequelize.STRING
      },
      agent: {
        type: Sequelize.STRING
      },
      down_payment: {
        type: Sequelize.DECIMAL(6,2)
      },
      premium: {
        type: Sequelize.DECIMAL(6,2)
      },
      effective_date: {
        type: Sequelize.DATEONLY
      },
      renewal_date: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('policies');
  }
};