'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vin: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      coverage: {
        type: Sequelize.STRING
      },
      deductible: {
        type: Sequelize.STRING
      },
      pip: {
        type: Sequelize.BOOLEAN
      },
      um: {
        type: Sequelize.BOOLEAN
      },
      rental: {
        type: Sequelize.BOOLEAN
      },
      towing: {
        type: Sequelize.BOOLEAN
      },
      leinholder: {
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
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vehicles');
  }
};