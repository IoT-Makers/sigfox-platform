'use strict';
require('ts-node/register');
const boot         = require('loopback-boot');
const cookieParser = require('cookie-parser');
const app          = module.exports = require('loopback')();
const cluster      = require('cluster');
const numCPUs      = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

  app.use(cookieParser());
  app.start = function() {
    // Start the web server
    const server = app.listen(() => {
      app.emit('started', server);
      const baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
    return server;
  };

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, (err) => {
    if (err) throw err;

    // start the server if `$ node server.ts`
    if (require.main === module)
      app.start();
  });

  console.log(`Worker ${process.pid} started`);
}
