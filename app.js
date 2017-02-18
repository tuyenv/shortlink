'use strict';
const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');
const path = require('path');
const view = require('consolidate');
const app = new Router();

// level database
const level = require('level');
const dbpath = path.resolve('./db');
const db = level.(dbpath);

// middleware 1
app.use((req, res, next) => {
  res.render = function render(filename, params) {
    var file = path.resolve(__dirname + '/views', filename);
    view.mustache(file, params || {}, function(err, html) {
      if (err) { return next(err); }
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    })
  }

  next();
});

// middleware 2
app.use((req, res, next) => {
  res.json = function json(obj) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
  }

  next();
});

// router
app.get('/', (req, res) => {
  res.render('home.html', {
    name: 'Auth Name'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact.html');
});

app.get('/user', (req, res) => {
  res.json({
    username: 'admin',
    age: 30
  })
});

// configuration env port
const server = http.createServer();
server.on('request', (req, res) => {
  app(req, res, finalhandler(req, res));
});
server.listen(process.env.PORT || 3000);
