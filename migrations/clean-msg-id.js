const MongoClient = require('mongodb').MongoClient;
const process = require('process');

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = 'testdb';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const colMsg = db.collection('Message');
  colMsg.updateMany({}, {$unset: {id: 1}}, (err, _) => {
    console.log(err);
  });
});
