'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('customer', [{
        first_name: 'John',
        last_name: 'Doe',
        birthdate: '01/01/1970',
        contact: '',
        gender: 1,
        marital_status: 'married',
        occupation: 'physician',
        id_type: 'dl',
        id_number: '10918371',
        address: '123 nowhere st',
        
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
