const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const body_parser = require('body-parser');
const jsonfile = '/src/file.json'

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true
});

app.get('/', function (request, response) {
    response.send('Hello, world!');
});

app.get('/cats', function (request, response) {
    response.send('Meow!');
});

app.get('/dogs', function (request, response) {
    response.send('Bork!');
});

app.get('/cats_and_dogs', function (request, response) {
    response.send('Living together');
});
app.get('/greet', function (request, response) {
    var name = request.query.name || 'world';
    response.send('Hello, ' + name + '!');
});

app.get('/greet/:name', function (request, response) {
    var name = request.params.name || 'world';
    var age = request.query.age || '0';
    year = (new Date()).getFullYear()-age;
    response.send('<h1>Hello, ' + name + '!</h1><br><p> You were born in ' + year + '.</p>');
});

app.get('/year', function (request, response) {
    var age = request.query.age || '0';
    year = (new Date()).getFullYear()-age;

    response.send('You were born in ' + year);
});

app.get('/success', function (request, response) {
    response.render('success.html');
});


app.post('/success', function (request, response, next) {
    var content = request.body
    // console.log(typeof(content));
    response.render('success.html', {content});
    // .catch(next);
});


app.listen(8000, function () {
    console.log('Listening on port 8000');
});