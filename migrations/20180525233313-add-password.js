'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
     'users',
      'passcrypt',
      {
        type: Sequelize.STRING(40106)
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users','passcrypt');
}
  
};
