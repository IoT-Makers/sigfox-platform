'use strict';

var mongodbURI = process.env.MONGO_URL || process.env.MONGODB_URI;

if (mongodbURI) {
  console.log('Data sources: Using MongoDB config', mongodbURI);
  module.exports = {
    'mongodb': {
      'url': mongodbURI,
      'name': 'mongodb',
      'connector': 'mongodb'
    }
  };
}
