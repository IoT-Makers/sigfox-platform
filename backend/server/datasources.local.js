'use strict';

const mongodbUrl = process.env.MONGO_URL || process.env.MONGODB_URI;

if (mongodbUrl) {
  console.log('Using MongoDB with: ' + mongodbUrl);
  module.exports = {
    mongodb: {
      useNewUrlParser: true,
      url: mongodbUrl,
      name: 'mongodb',
      connector: 'mongodb',
      disableDefaultSort: true
    },
  };
} else console.error('Env MONGO_URL not set');
