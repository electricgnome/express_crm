var db = require('./models');
var me;
// create a user
db.user.create({firstName: "Perla"})
  .then(function (user) {
    console.log(user);
    me = user;
  });
// update a user
me.lastName = 'Tapia';
me.email = 'perla@kappainsure.com';
me.save().then(() => {
  console.log('done saving');
});