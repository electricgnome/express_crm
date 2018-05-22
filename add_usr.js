var db = require('./models');
var me;
// create a user
db.user.create({firstName: "Hector"})
  .then(function (user) {
    console.log(user);
    me = user;
  });
// update a user
me.lastName = 'Saldana';
me.email = 'hector@kappainsure.com';
me.save().then(() => {
  console.log('done saving');
});