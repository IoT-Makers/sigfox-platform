'use strict';

const mongodbUrl = process.env.MONGO_URL;

if (mongodbUrl) {
  console.log('Using MongoDB with: ' + mongodbUrl);
  var mongodb = {
      useNewUrlParser: true,
      url: mongodbUrl,
      name: 'mongodb',
      connector: 'mongodb',
      disableDefaultSort: true
  };
} else console.error('Env MONGO_URL not set');

const minio_access = process.env.MINIO_ACCESS_KEY;
const minio_secret = process.env.MINIO_SECRET_KEY;

if (minio_access && minio_secret) {
  console.log('using minio as storage backend');
   var minio = {
      name: "minio",
      connector: "loopback-component-storage",
      provider: "amazon",
      key: minio_secret,
      keyId: minio_access,
      forcePathBucket: true,
      endpoint: 'minio.iotagency.sigfox.com',
      bucket: 'public',
      subfolder: process.env.MONGO_URL.split('/').pop(),
      acl: "public-read"
  };
} else console.error('Env minio_access or minio_secret not set');

module.exports = {
  mongodb,
  minio
};
