'use strict';
const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');
const path = require('path');
const view = require('consolidate');
const shortid = require('shortid');

const app = new Router();
const qs = require('querystring');

// level database
const level = require('level');
const dbpath = path.resolve('./db');
const db = level(dbpath);

// use middleware
require('./mid')(app);

// router
app.get('/', (req, res) => {
  res.render('home.html', {
    name: 'Auth Name'
  });
});

app.post('/', (req, res) => {
  if (! req.body.url) {
    return res.render('home.html', {
      msg: 'url missing'
    });
  }

  let id = shortid.generate();
  db.put(id, req.body.url, (err) => {
    if (err) {
      return res.render('home.html', {
        msg: err.toString()
      });
    }

    let url = `http://${process.env.HOST}/` + id;
    res.render('home.html', {
      msg: `Your url ${url}`
    });
  });
});

app.get('/:id', (req, res) => {
  db.get(req.params.id, (err, url) => {
    res.setHeader('Content-Type', 'text/html');
    if (err) {
      res.statusCode = 404;
      res.end('404 not found');
    }

    res.statusCode = 301;
    res.setHeader('Location', url);
    res.end();
  });
});

// configuration env port
const server = http.createServer();
server.on('request', (req, res) => {
  app(req, res, finalhandler(req, res));
});
server.listen(process.env.PORT || 3000);
module.exports = server;
