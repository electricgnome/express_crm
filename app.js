const express = require("express");
const nunjucks = require("nunjucks");
const body_parser = require("body-parser");
const jsonfile = "/src/file.json";

const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});

const dbConfig = require('./db-config');
const db = pgp(dbConfig);
let connection;
const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.get("/", function (request, response) {
  response.redirect("/todo");
});

//Todo APP

app.get("/todos", function (request, response) {
  db.any(`SELECT * FROM task WHERE done = FALSE `)
    .then(function (tasks) {
      // console.log(tasks)
      response.render("todos.html", { tasks });
    });

});

app.post("/todos", function (request, response) {
  var new_task = request.body.task;
  if (new_task != '') {
    db.none(`INSERT INTO task(description, done) VALUES($1, $2)`, [request.body.task, false])
      .then(() => {
        console.log("Success!")
      })
      .catch(error => {
        console.log('ERROR:', error);
      })
  }
  console.log(request.body.task);


  response.redirect("/todos");
});



app.post("/todos/:done", function (request, response) {
  var tasks =0;
  console.log("len: "+request.body.task.length)
  if (request.body.task.length = 1){
    tasks = [request.body.task];
  }else if (request.body.task.length >1){
    tasks = request.body.task;
  }
  console.log(tasks);
  for (let i = 0; i < tasks.length ; i++) {
    db.tx(t => {
      return t.batch([
        t.none('UPDATE task SET done = $1 WHERE id= $2', [true, tasks[i]])
      ]);
      
    })
      .then(data => {
        console.log("this: "+tasks[i]);
        console.log("Success!")
      })
      .catch(error => {
        console.log('ERROR:', error);
      })
  }
  response.redirect("/todos");
});

app.listen(8000, function () {
  console.log("Listening on port 8000");
});
