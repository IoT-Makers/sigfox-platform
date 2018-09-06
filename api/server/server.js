'use strict';
require('ts-node/register');
var boot         = require('loopback-boot');
var cookieParser = require('cookie-parser');
var app          = module.exports = require('loopback')();
var cluster      = require('cluster');
var numCPUs      = require('os').cpus().length;

if (cluster.isMaster && process.env.CLUSTER === "true") {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {

  app.use(cookieParser());

  app.start = function() {
    // Start the web server
    var server = app.listen(function() {
      app.emit('started', server);
      let baseUrl = process.env.BASE_URL || app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
    return server;
  };

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, function(err) {
    if (err) throw err;

    // Start the server if `$ node server.js`
    if (require.main === module)
      app.start();
  });

  console.log(`Worker ${process.pid} started`);
}
