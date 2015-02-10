'use strict';

var express = require('express'),
    app     = express(),
    path    = require('path'),
    fs      = require('fs');
//

var contentPath = path.resolve(__dirname + '/build/'), port;
var env = process.env.NODE_ENV || 'development';

switch (env) {
   case 'development':
      port = 5000;
      break;
      
   case 'production':
      port = 5000;
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

app.set('views', contentPath + '/jade');
app.set('view engine', 'jade');



app.get('/:page?', function (request, response) {
   var toRender, toSend = {};
   
   if (fs.existsSync(contentPath + '/jade/' + request.params.page + '.jade')) {
      toSend.controller = request.params.page;
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

app.listen(port);
