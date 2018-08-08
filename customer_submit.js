app.post('/success', function (request, response, next) {
  var data = request.body
   console.table(data)
   
    // if (
    //   (request.body.miles != '') &
    //   (request.body.gallons != '') &
    //   (request.body.amount != '')
    // ) {


      db.customer
        .create({
          first_name: data.first_name1,
          last_name: data.last_name1,
          birthdate: data.birthdate1,
          contact: data.contact,       //turn to json
          gender: data.gender1,
          marital_status: data.marital_status1,
          occupation: data.occupation1, 
          id_type: data.id_type1,
          id_number: data.id_number1,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          tickets: data.tickets1,
          accidents: data.accidents1,
          at_fault: data.at_fault1,
          pref_lang: data.pref_lang,
          home_owner:data.home_owner,
          has_pop: data.has_pop,
          pop_length: data.pop_length,
          pop_carrier:data.pop_carrier,
          status: data.status

        })

        db.policy.create({
          policy_id: data.policy_id,
          carrier: data.carrier,
          // policy_type: data.
          agent: data.agent,
          down_payment: data.down_payment,
          premium: data.premium,
          effective_date: data.effective_date,
          // renewal_date: data.renewal_date
          status: data.status

        })

        db.driver.create({
          relation: data.relation1,
          policyId: 3,               //Fix
          customerId: 3             //Fix
        })

        db.vehicle.create({
          vin: data.vin1,
          year: data.year1,
          make: data.make1,
          model: data.model1,
          coverage: data.coverage1,
          deductible: data.deductible1,
          pip: data.pip1,
          um: data.um1,
          rental: data.rental1,
          towing: data.towing1,
          // leinholder: data.
        
          policyId: 3

        })
        .then(log => {
          // console.log("task: " + task.get('name') + " ");
          response.redirect('/log')
        })
        .catch(next)








    // } else {
      // response.send(500, 'ShowAlert')
      // response.redirect('/log')
      // console.log('this: ' + request.body.n_task)
    // }
  })





  userId: request.body.user_id,
  odometer: request.body.odometer,
  units: request.body.units,
  product: request.body.product,
  cost: request.body.cost,
  vehicle_id: request.body.vehicle_id.toUpperCase(),
  merchant: request.body.merchant.toUpperCase(),
  notes: request.body.notes.toUpperCase(),
  location: 'loc',
  due: due_date