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

var tasks = [''];
var repeat = 0;

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

app.get("/", function(request, response) {
  response.send("Hello, world!");
});

app.get("/cats", function(request, response) {
  response.send("Meow!");
});

app.get("/dogs", function(request, response) {
  response.send("Bork!");
});

app.get("/cats_and_dogs", function(request, response) {
  response.send("Living together");
});
app.get("/greet", function(request, response) {
  var name = request.query.name || "world";
  response.send("Hello, " + name + "!");
});

//greet/Hector?age=35
app.get("/greet/:name", function(request, response) {
  var name = request.params.name || "world";
  var age = request.query.age || "0";
  year = new Date().getFullYear() - age;
  response.send(
    "<h1>Hello, " + name + "!</h1><br><p> You were born in " + year + ".</p>"
  );
});

app.get("/year", function(request, response) {
  var age = request.query.age || "0";
  year = new Date().getFullYear() - age;

  response.send("You were born in " + year);
});

app.get("/success", function(request, response) {
  response.render("success.html");
});

app.get("/fav_animals", function(request, response) {
  var animals = [
    { name: "cats", favorite: true },
    { name: "dogs", favorite: true },
    { name: "tree frogs", favorite: true },
    { name: "earth worms", favorite: false },
    { name: "guinea pigs", favorite: true }
  ];

  response.render("fav_animals.html", { animals });
});

// promise stuff

var urls = [
  "https://en.wikipedia.org/wiki/Futures_and_promises",
  "https://en.wikipedia.org/wiki/Continuation-passing_style",
  "https://en.wikipedia.org/wiki/JavaScript",
  "https://en.wikipedia.org/wiki/Node.js",
  "https://en.wikipedia.org/wiki/Google_Chrome"
];





//Todo APP

app.get("/todos", function(request, response) {
    db.any(`SELECT * FROM task`)
    .then(function(tasks){
        console.log(tasks)
        response.render("todos.html",{tasks});
    })
  
});

app.post("/todos", function(request, response) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == request.body.task) {
      console.log("Repeated task!");
      repeat = 1;
    } else {
        console.log(request.body.task)
      
    }
  }

  if (repeat == 0) {
    tasks.push(request.body.task);
    console.log(tasks);
  } else {
    repeat = 0;
  }

//   debugger;
  response.render("todos.html", { tasks });
});

app.listen(8000, function() {
  console.log("Listening on port 8000");
});
