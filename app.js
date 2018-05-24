// converted to use sequelize instead of pgp
const express = require("express");
const nunjucks = require("nunjucks");
const body_parser = require("body-parser");
const jsonfile = "/src/file.json";
const Promise = require('bluebird');
const session = require('express-session');

let connection;

const db = require('./models'); //for use with sequelize

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));


var hour = 3600000;
app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 2*hour}
}));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.use(function (request, response, next) {
  if (request.session.user) {
    next();
  } else if (request.path == '/login') {
    next();
  } else {
    response.redirect('/login');
  }
});


app.get("/login", function (request, response) {
  response.render("login.html");
});

//Todo APPl

app.get("/", function (request, response) {
  response.redirect("/todos");
});

app.get("/todos", function (request, response) {
  db.task.findAll({include: [{model: db.user}]})
    .then((tasks) => {
      console.log(tasks[1].due.toDateString());
      response.render("todos.html", { tasks });
      // response.json({tasks: tasks})
    });

});

app.post("/todos", function (request, response, next) {
 console.log("DUE: "+ request.body.date)
 var due_date = request.body.date+"T19:00:00";
  if (request.body.n_task != '' & request.body.agent !=undefined & request.body.date !='') {
    db.task.create({ name: request.body.n_task, due: due_date, userId: request.body.agent ,status: false  })
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

app.post("/todos/:done", function (request, response, next) {

  var tasks = request.body.task
  if (typeof tasks === 'string') {
    tasks = [tasks]
  } else if (typeof tasks === 'undefined') {
    tasks = [0]
  }
  tasks = tasks.map(JSON.parse)

  var promises = [];

  if (request.body.action == "done") {

    for (let i = 0; i < tasks.length; i++) {
      var stat = !tasks[i].status;
      var p = db.task.update({ status: stat }, { where: { id: tasks[i].id } })
        promises.push(p);
    };
    } else if (request.body.action == "remove") {

      for (let i = 0; i < tasks.length; i++) {
        var stat = !tasks[i].status;
        var  p= db.task.destroy({ where: { id: tasks[i].id } })
          promises.push(p);
         
    }
  }
    Promise.all(promises)
    .then((result)=> {
        response.redirect("/todos");
        // response.json({success: true})
      })
      .catch(next);
  });


app.listen(8800, function () {
  console.log("Listening on port 8800");
});



