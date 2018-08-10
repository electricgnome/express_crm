const db = require("./models");

function dataToCustomer(customerData) {
  return {
    first_name: customerData.first_name1,
    last_name: customerData.last_name1,
    birthdate: customerData.birthdate1,
    contact: JSON.stringify({
      phone: customerData.cell_phone,
      email: customerData.email
    }),
    gender: customerData.gender1,
    marital_status: customerData.marital_status1,
    occupation: customerData.occupation1,
    id_type: customerData.id_type1,
    id_number: customerData.id_number1,
    address: customerData.address,
    city: customerData.city,
    state: customerData.state,
    zip: customerData.zip,
    tickets: customerData.tickets1,
    accidents: customerData.accidents1,
    at_fault: customerData.at_fault1,
    pref_lang: customerData.pref_lang,
    home_owner: customerData.home_owner,
    has_pop: customerData.has_pop,
    pop_length: customerData.pop_length,
    pop_carrier: customerData.pop_carrier,
    status: customerData.status
  };
}

function dataToPolicy(customerData) {
  return {
    policy_id: customerData.policy_id,
    carrier: customerData.carrier,
    // policy_type: customerData.
    agent: customerData.agent,
    down_payment: customerData.down_payment,
    premium: customerData.premium,
    effective_date: customerData.effective_date,
    // renewal_date: customerData.renewal_date
    status: customerData.status
  };
}

function dataToDriver(customerData, customerId, policyId) {
  return {
    relation: customerData.relation1,
    customerId: customerId,
    policyId: policyId
  };
}

function dataToVehicle(customerData, policyId, i) {
  return {
    vin: customerData['vin'+i],
    year: customerData['year'+i],
    make: customerData['make'+i],
    model: customerData['model'+i],
    coverage:customerData['coverage'+i],
    deductible: customerData['deductible'+i],
    pip: customerData['pip'+i],
    um: customerData['um'+i],
    rental: customerData['rental'+i],
    towing: customerData['towing'+i],
    policyId: policyId 
  };

}


function addVehicles(customerData, policyId) {
  for (let i=0; i < customerData.vehicleCt; i++){
   db.vehicle.create(dataToVehicle(customerData, policyId, i))
}
}

function dataToTables(customerData, nextFn) {


 db.customer.create(dataToCustomer(customerData)).then(
    result => {
      let customerId = result.id;
      console.log("customer ID: " + customerId);
     db.policy.create(dataToPolicy(customerData)).then(
        result => {
          let policyId = result.id;
          Promise.all([
            db.driver.create(dataToDriver(customerData, customerId, policyId)),
            addVehicles(customerData, policyId)
          ]);
        }
      );
    }
  );
}

exports.dataToTables = dataToTables;


