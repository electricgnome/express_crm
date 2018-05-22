'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'tasks',
      'status',
      {
        type: Sequelize.BOOLEAN
      }
    );
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'tasks', 'status');
  }
};
