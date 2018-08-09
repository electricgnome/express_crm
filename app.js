// converted to use sequelize instead of pgp
const express = require("express");
nunjucks = require("nunjucks");
body_parser = require("body-parser");
jsonfile = "/src/file.json";
const Promise = require("bluebird");
session = require("express-session");
(redis = require("redis")), (client = redis.createClient());
RedisStore = require("connect-redis")(session);
pbkdf2 = require("pbkdf2");
passhelper = require("pbkdf2-helpers");
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

io.use(
  sharedsession(
    session({
      store: new RedisStore(),
      secret: process.env.SECRET_KEY || "dev",
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 24 * hour }
    })
  )
);

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

  if (passhelper.matches(password2, passcrypt)) {
    console.log("Matching passwords!!");
    db.user
      .create({
        firstName: request.body.fname,
        lastName: request.body.lname,
        email: request.body.email,
        passcrypt: passcrypt
      })
      .then(user => {
        response.redirect("/login");
      });
    //pass info to db.
  } else {
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
  db.user.findOne({ where: { email: username } }).then(user => {
    if (
      username == user.email &&
      passhelper.matches(password, user.passcrypt)
    ) {
      request.session.user = username;
      console.log("Welcome!");
      response.render("index.html", { username });
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
        "address"
        // "task",
        // "carrier",
        // "policy"
      ],
      order: ["first_name", "city"]
    })
    .then(customers => {
      response.render("index.html", { customers });
    });
});

app.get("/quote", function(request, response) {
  response.render("quote_form.html");
});

app.get("/customer", function(request, response) {
  response.render("customer.html");
});

// ===== === == == = = = == = = = = = == = = = == = = = = == = = = = = = =
app.post("/success", function(request, response, next) {
  let promises = [];
  let customerData = request.body;
  console.table(customerData);

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

  function insertThings(customerData, nextFn) {
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

  insertThings(customerData);
});

app.get("/todos", function(request, response) {
  db.task.findAll({ include: [{ model: db.user }] }).then(tasks => {
    db.user.findAll({ offset: 1 }).then(users => {
      console.log(users.firstName);
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

var users = [];
io.on("connection", function(client) {
  // console.log(client.id + " CONNECTED");
  // client.emit("message", "Welcome!")
  // client.users=[];
  // io.emit("users", client.users)

  client.on("user", function(user) {
    client.username = user;
    console.log("user: " + client.username);
    if (!users.includes(user)) {
      users.push(user);
    }

    io.emit("users", users);
    console.log("list of users: " + users);
  });

  client.on("incoming", function(msg, user) {
    io.emit("chat-msg", user, msg);
  });

  client.on("disconnect", function(user) {
    client.emit("message", client.username + " has left the room.");
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
