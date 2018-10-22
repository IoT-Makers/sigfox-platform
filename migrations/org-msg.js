const MongoClient = require('mongodb').MongoClient;
const process = require('process');

// Connection URL
const url = process.env.MONGO_URL;

// Database Name
const dbName = 'testdb';

// Create a new MongoClient
const client = new MongoClient(url);
let ctr = 0;
let ctrDone = 0;
let ctrCleaned = 0;
// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const colOrgMsg = db.collection('OrganizationMessage');
  const colMsg = db.collection('Message');
  colOrgMsg.find().forEach(function(orgMsg) {
    console.log(++ctr);
    colMsg.findOne({_id: orgMsg.messageId}, (err, msg) => {
      if (msg == null) {
        colOrgMsg.deleteOne({_id: orgMsg._id});
        console.log("Cleaned "+ ++ctrCleaned);
        return;
      }
      orgMsg.deviceId = msg.deviceId;
      orgMsg.createdAt = msg.createdAt;
      colOrgMsg.update({_id: orgMsg._id}, orgMsg);
      console.log("Done "+ ++ctrDone);
    });
  });
});

// console.log("Done "+ ctrDone);
// console.log("Cleaned "+ ctrCleaned);
// console.log(ctr);

// client.close();
