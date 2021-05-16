require('dotenv').config();

require('ts-node/register');
var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');

var app = module.exports = loopback();
app.use(cookieParser());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    let baseUrl = process.env.BASE_URL || app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // don't use autoupdate or automigrate in a multi-container environment
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

