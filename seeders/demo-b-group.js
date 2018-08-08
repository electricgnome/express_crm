"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {

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
    
    queryInterface.bulkDelete("tasks", null, {});
    queryInterface.bulkDelete("drivers", null, {});
    queryInterface.bulkDelete("vehicles", null, {});
    queryInterface.bulkDelete("payments", null, {});
    return queryInterface.bulkDelete("notes", null, {});
  }
};
