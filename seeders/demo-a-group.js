"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      "policies",
      [
        {
          policy_id: "q100",
          carrier: "progressive",
          policy_type: "personal auto",
          agent: 1,
          down_payment: "1500.49",
          premium: "1210.34",
          effective_date: new Date(),
          renewal_date: new Date(),
          status: "quote",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

   return queryInterface.bulkInsert(
      "customers",
      [
        {
          first_name: "John",
          last_name: "Doe",
          birthdate: "01/01/1970",
          contact: JSON.stringify({
            phone: "9564558779",
            email: "jon@doe.com"
          }),
          gender: "male",
          marital_status: "married",
          occupation: "physician",
          id_type: "dl",
          id_number: "10918371",
          address: "123 nowhere st",
          city: "houston",
          state: "tx",
          zip: "77040",
          tickets: 0,
          accidents: 0,
          at_fault: false,
          pref_lang: "english",
          home_owner: true,
          has_pop: true,
          pop_length: "6 months",
          pop_carrier: "progressive",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

},

down: (queryInterface, Sequelize) => {
  //  return sequelize.query("TRUNCATE TABLE customers drivers notes payments policies vehicles ")
  queryInterface.bulkDelete("policies", null, {});
 
  return queryInterface.bulkDelete("customers", null, {});
  
}
};