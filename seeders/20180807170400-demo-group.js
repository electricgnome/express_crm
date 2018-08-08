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

    queryInterface.bulkInsert(
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
          gender: true,
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
          has_pop: "6 months",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    queryInterface.bulkInsert(
      "notes",
      [
        {
          note: JSON.stringify({ note1: "some note" }),
          created_by: 1,
          is_task: true,
          category: "pop",
          due_date: "08/24/2018",
          agent_responsible: 2,
          status: "open",
          policyId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    queryInterface.bulkInsert(
      "drivers",
      [
        {
          relation: "self",
          policyId: "1",
          customerId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    queryInterface.bulkInsert(
      "payments",
      [
        {
          status: "paid",
          payment_number: 2,
          payment_date: "08/24/2018",
          policyId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    return queryInterface.bulkInsert(
      "vehicles",
      [
        {
          vin: "0982190rjfdjo8",
          year: "1999",
          make: "nissan",
          model: "sentra",
          coverage: "fullcover",
          deductible: "500",
          pip: true,
          um: true,
          rental: true,
          towing: true,
          policyId: 1,
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
    queryInterface.bulkDelete("tasks", null, {});
    queryInterface.bulkDelete("customers", null, {});
    queryInterface.bulkDelete("drivers", null, {});
    queryInterface.bulkDelete("vehicles", null, {});
    queryInterface.bulkDelete("payments", null, {});
    return queryInterface.bulkDelete("notes", null, {});
  }
};
