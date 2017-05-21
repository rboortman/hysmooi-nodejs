'use strict';

var express = require('express'),
    app     = express(),
    path    = require('path'),
    fs      = require('fs');
//

var contentPath = path.resolve(__dirname + '/build/'), port;
var env = process.env.NODE_ENV || 'development';
var db = JSON.parse(fs.readFileSync(__dirname + '/database.json', 'utf8'));

switch (env) {
  case 'development':
    port = 5000;
    break;

  case 'production':
    port = 3000;
    break;
}

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {res.status(200).end();} else {next();}
};

app.use(allowCrossDomain);
app.use(express.static(contentPath));

app.set('views', contentPath + '/pug');
app.set('view engine', 'pug');


String.prototype.capitalize = function() {
  var toReturn = [];
  this.split('_').forEach(function (word) {
    toReturn.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return toReturn.join(' ');
};

app.get('/en/:page?', function (request, response) {
  var toRender, toSend = {};

  if (fs.existsSync(contentPath + '/pug/en/' + request.params.page + '.pug')) {
    toSend.controller = request.params.page.capitalize();
    toSend.development = true;
    toRender = 'en/' + request.params.page;
  } else {
    toSend.controller = 'Home';
    toSend.development = true;
    toRender = 'en/home';
  }

  // response.send(request.params.page);
  response.render(toRender, toSend);
});

app.get('/:page?', function (request, response) {
  var toRender, toSend = {};

  if (fs.existsSync(contentPath + '/pug/' + request.params.page + '.pug')) {
    toSend.controller = request.params.page.capitalize();
    toSend.development = true;
    toRender = request.params.page;
  } else {
    toSend.controller = 'Home';
    toSend.development = true;
    toRender = 'home';
  }

  // response.send(request.params.page);
  response.render(toRender, toSend);
});

app.get('/en/projects/:id?', function (request, response) {
  var toSend = {
    controller: 'Projects',
    project: db[request.params.id] || db.camphy,
  };

  response.render('en/projects', toSend);
});

app.get('/projects/:id?', function (request, response) {
  var toSend = {
    controller: 'Projects',
    project: db[request.params.id] || db.camphy,
  };

  response.render('projects', toSend);
});

app.listen(port);
