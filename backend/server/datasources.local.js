'use strict';

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
  console.log('Using MongoDB with: ' + MONGO_URL);
  var mongodb = {
    useNewUrlParser: true,
    url: MONGO_URL,
    name: 'mongodb',
    connector: 'mongodb',
    disableDefaultSort: true
  };
} else console.error('Env MONGO_URL not set');

const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;

if (MINIO_ACCESS_KEY && MINIO_SECRET_KEY) {
  console.log('Using minio as storage backend');
  var minio = {
    name: "minio",
    connector: "loopback-component-storage",
    provider: "amazon",
    key: MINIO_SECRET_KEY,
    keyId: MINIO_ACCESS_KEY,
    forcePathBucket: true,
    endpoint: 'minio.iotagency.sigfox.com',
    bucket: 'public',
    subfolder: MONGO_URL.split('/').pop(),
    acl: "public-read"
  };
} else console.error('Env MINIO_ACCESS_KEY or MINIO_SECRET_KEY not set');

module.exports = {
  mongodb,
  minio
};
