const express = require('express');
const app = express();
const path = require('path');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/../dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

// Start the app by listening on port
app.listen(process.env.PORT || 4200);

console.log('Started webapp on port: ', process.env.PORT || 4200);
