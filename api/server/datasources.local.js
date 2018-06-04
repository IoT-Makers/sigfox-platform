'use strict';

var mongodbUrl = process.env.MONGO_URL || process.env.MONGODB_URI;

if (mongodbUrl) {
  console.log('Data sources: Using MongoDB config', mongodbUrl);
  module.exports = {
    mongodb: {
      url: mongodbUrl,
      name: 'mongodb',
      connector: 'mongodb'
    }
  };
}
