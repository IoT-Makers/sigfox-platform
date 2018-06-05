'use strict';

var mongodbUrl = process.env.MONGO_URL || process.env.MONGODB_URI;

if (mongodbUrl) {
  console.log('Loading MongoDB with: ' + mongodbUrl);
  module.exports = {
    mongodb: {
      url: mongodbUrl,
      name: 'mongodb',
      connector: 'mongodb'
    }
  };
}
