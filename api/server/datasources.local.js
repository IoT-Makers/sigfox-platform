'use strict';

var mongodbUrl = process.env.MONGO_URL || process.env.MONGODB_URI;

if (mongodbUrl) {
  console.log('Using MongoDB with: ' + mongodbUrl);
  module.exports = {
    mongodb: {
      url: mongodbUrl,
      name: 'mongodb',
      connector: 'mongodb'
    }
  };
} else {
  console.error("Env MONGO_URL not set");
}
