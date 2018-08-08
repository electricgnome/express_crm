// converted to use sequelize instead of pgp
const express = require("express");
nunjucks = require("nunjucks");
body_parser = require("body-parser");
jsonfile = "/src/file.json";
const Promise = require("bluebird");
session = require("express-session");
redis = require("redis"),
client = redis.createClient();
RedisStore = require("connect-redis")(session);
pbkdf2 = require("pbkdf2");
passhelper = require('pbkdf2-helpers');
crypto = require("crypto");


let connection;

const db = require("./models"); //for use with sequelize

var app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);



app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));


var hour = 3600000;
app.use(
  session({
    store: new RedisStore(),
    secret: process.env.SECRET_KEY || "dev",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * hour }
  })
);
const sharedsession = require("express-socket.io-session");

io.use(sharedsession(session({
  store: new RedisStore(),
  secret: process.env.SECRET_KEY || "dev",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * hour }
})));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});


app.use(function(request, response, next) {
  if (request.session.user) {
    next();
  } else if (request.path == "/login") {
    next();
  } else if (request.path == "/register") {
    next();
  } else {
    response.redirect("/login");
  }
});





app.get("/register", function(request, response) {
  response.render("register.html");
});

app.post("/register", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var password2 = request.body.password2;
  var passcrypt = passhelper.generate_storage(password);


  if (passhelper.matches(password2, passcrypt)){
    console.log("Matching passwords!!")
    db.user.create({
      firstName:request.body.fname,
      lastName:request.body.lname,
      email:request.body.email,
      passcrypt:passcrypt
    }).then(user=>{
      response.redirect("/login");
    })
    //pass info to db.

  }else{
    console.log("mismatch!!");
    response.redirect("/register");
  }

});


app.get("/login", function(request, response) {
  response.render("login.html");
});

app.post("/login", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  db.user.findOne({where:{email:username}}).then( user =>{
    if (username == user.email && passhelper.matches(password, user.passcrypt)) {
      request.session.user = username;
      console.log("Welcome!");
      response.render("index.html", {username});
    } else {
      console.log("failed!");
      response.redirect("/login");
    }
  });

});

app.get("/logout", function(request, response) {
  request.session.destroy();
  response.redirect("login.html");
});

//Todo APPl

app.get("/", function(request, response) {
  db.customer
  .findAll({
    attrributes: [
      "first_name",
      "zip",
      "id_number",
      "occupation",
      "city",
      "address",
      // "task",
      // "carrier",
      // "policy"
    ],
    order: ["first_name", "city"]
  })
  .then(customers => {
    response.render("index.html", { customers })
  })
});

app.get("/quote", function (request, response) {
  response.render("quote_form.html");
});

app.get("/customer", function (request, response) {
  response.render("customer.html");
});


// ===== === == == = = = == = = = = = == = = = == = = = = == = = = = = = =
app.post("/success", function (request, response, next) {
  var data = request.body
  console.table(data)
  
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
         'customerId': 3,             //Fix
         'policyId': 4               //Fix
       })

       db.vehicle.create({
         vin: data.VIN1,
         year: data.year1,
         make: data.make1,
         model: data.model1,
         coverage: data.coverage1,
         deductible: data.deductible1,
         pip: data.pip1,
         um: data.um1,
         rental: data.rental1,
         towing: data.towing1,
         policyId: 4              //fix
       })
       .then(data => {         
        response.render("success.html", {data});
       })
       .catch(next)
 });
  
  





app.get("/todos", function(request, response) {
  db.task.findAll({ include: [{ model: db.user }] }).then(tasks => {
    db.user.findAll({ offset: 1 }).then(users=>{
      console.log(users.firstName)
      response.render("todos.html", { tasks, users });
    });
    // response.json({tasks: tasks})
  });
});

app.post("/todos", function(request, response, next) {
  console.log("DUE: " + request.body.date);
  var due_date = request.body.date + "T19:00:00";
  if (
    (request.body.n_task != "") &
    (request.body.agent != undefined) &
    (request.body.date != "")
  ) {
    db.task
      .create({
        name: request.body.n_task,
        due: due_date,
        userId: request.body.agent,
        status: false
      })
      .then(task => {
        // console.log("task: " + task.get('name') + " ");
        response.redirect("/todos");
      })
      .catch(next);
  } else {
    // response.send(500, 'ShowAlert')
    response.redirect("/todos");
    console.log("this: " + request.body.n_task);
  }
});

app.post("/todos/:done", function(request, response, next) {
  var tasks = request.body.task;
  if (typeof tasks === "string") {
    tasks = [tasks];
  } else if (typeof tasks === "undefined") {
    tasks = [0];
  }
  tasks = tasks.map(JSON.parse);

  var promises = [];

  if (request.body.action == "done") {
    for (let i = 0; i < tasks.length; i++) {
      var stat = !tasks[i].status;
      var p = db.task.update({ status: stat }, { where: { id: tasks[i].id } });
      promises.push(p);
    }
  } else if (request.body.action == "remove") {
    for (let i = 0; i < tasks.length; i++) {
      var stat = !tasks[i].status;
      var p = db.task.destroy({ where: { id: tasks[i].id } });
      promises.push(p);
    }
  }
  Promise.all(promises)
    .then(result => {
      response.redirect("/todos");
      // response.json({success: true})
    })
    .catch(next);
});

app.get("/canvas", function(request, response) {
  response.render("canvas.html");
});

//===========chat app----------------

app.use("/socket-io", express.static("node_modules/socket.io-client/dist"));

var users=[];
io.on("connection", function(client) {
  // console.log(client.id + " CONNECTED");
  // client.emit("message", "Welcome!")
  // client.users=[];
  // io.emit("users", client.users)

  client.on('user', function(user){
    client.username=user;
    console.log("user: " + client.username)
    if (!users.includes(user)){
      users.push(user)
    }

    io.emit("users", users)
    console.log("list of users: " + users)
  })


  client.on("incoming", function(msg, user) {
    io.emit("chat-msg", user, msg);
  });



  client.on("disconnect", function(user) {
    client.emit("message", client.username + " has left the room.")
    console.log(client.username + " EXITED");
  });
});
//===============-------------------------

app.get("/chat", function(request, response) {
  response.render("chat.html");
});

http.listen(8800, function() {
  console.log("Listening on port 8800");
});
