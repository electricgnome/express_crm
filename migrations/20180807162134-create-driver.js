'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      relation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      policyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'policies',
          key: 'id'
        },
        allowNull: false
      },
        customerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'customers',
            key: 'id'
          },
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drivers');
  }
};