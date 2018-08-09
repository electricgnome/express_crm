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

function dataToDriver(customerData) {
  return {
    relation: customerData.relation1,
    customerId: 1, // FIXME
    policyId: 2 // FIXME
  };
}

function dataToVehicle(customerData) {
  return {
    vin: customerData.vin1,
    year: customerData.year1,
    make: customerData.make1,
    model: customerData.model1,
    coverage: customerData.coverage1,
    deductible: customerData.deductible1,
    pip: customerData.pip1,
    um: customerData.um1,
    rental: customerData.rental1,
    towing: customerData.towing1,
    policyId: 2 // FIXME
  };
}

function dataToTables(customerData, nextFn) {
  db.customer.create(dataToCustomer(customerData));
  db.policy.create(dataToPolicy(customerData));
  db.driver.create(dataToDriver(customerData));
  db.vehicle
    .create(dataToVehicle(customerData))

    .then(customerData => {
      response.redirect("/");
    })
    .catch(next);
}

exports.dataToTables = dataToTables;

// db.customer.create({
//   first_name: customerData.first_name1,
//   last_name: customerData.last_name1,
//   birthdate: customerData.birthdate1,
//   contact: JSON.stringify({
//     phone:`${customerData.cell_phone}`,
//     email:`${customerData.email}`
//   }),
//   gender: customerData.gender1,
//   marital_status: customerData.marital_status1,
//   occupation: customerData.occupation1,
//   id_type: customerData.id_type1,
//   id_number: customerData.id_number1,
//   address: customerData.address,
//   city: customerData.city,
//   state: customerData.state,
//   zip: customerData.zip,
//   tickets: customerData.tickets1,
//   accidents: customerData.accidents1,
//   at_fault: customerData.at_fault1,
//   pref_lang: customerData.pref_lang,
//   home_owner: customerData.home_owner,
//   has_pop: customerData.has_pop,
//   pop_length: customerData.pop_length,
//   pop_carrier: customerData.pop_carrier,
//   status: customerData.status
// });

// db.policy.create({
//   policy_id: customerData.policy_id,
//   carrier: customerData.carrier,
//   // policy_type: customerData.
//   agent: customerData.agent,
//   down_payment: customerData.down_payment,
//   premium: customerData.premium,
//   effective_date: customerData.effective_date,
//   // renewal_date: customerData.renewal_date
//   status: customerData.status
// });

// db.driver.create({
//   relation: customerData.relation1,
//   customerId: 2, //Fix
//   policyId: 2 //Fix
// });

// db.vehicle
//   .create({
//     vin: customerData.VIN1,
//     year: customerData.year1,
//     make: customerData.make1,
//     model: customerData.model1,
//     coverage: customerData.coverage1,
//     deductible: customerData.deductible1,
//     pip: customerData.pip1,
//     um: customerData.um1,
//     rental: customerData.rental1,
//     towing: customerData.towing1,
//     policyId: 2 //fix
//   })