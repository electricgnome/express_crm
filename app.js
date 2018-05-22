// converted to use sequelize instead of pgp
const express = require("express");
const nunjucks = require("nunjucks");
const body_parser = require("body-parser");
const jsonfile = "/src/file.json";
// const myscript = require('/main.js')
const Promise = require('bluebird');

let connection;

const db = require('./models'); //for use with sequelize

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.get("/", function (request, response) {
  response.redirect("/todos");
});

//Todo APP

app.get("/todos", function (request, response) {
  db.task.findAll()
    .then((tasks) => {

      response.render("todos.html", { tasks });
      // response.json({tasks: tasks})
    });

});

app.post("/todos", function (request, response, next) {
  var new_task = request.body.n_task;
  if (new_task != '') {
    db.task.create({ name: request.body.n_task, due: '2018-05-30T11:59:00', status: false })
      .then(task => {
        console.log(task.get('name'));
        response.redirect("/todos");
      })
      .catch(next);
  } else {
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



