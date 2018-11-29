'use strict';
const fs = require('fs');

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

let minio_access;
let minio_secret;

try {
  // docker secret
  minio_access = fs.readFileSync('/run/secrets/minio_access_key', 'utf8').trim();
  minio_secret = fs.readFileSync('/run/secrets/minio_secret_key', 'utf8').trim();
} catch (e) {
  // for local dev
  minio_access = process.env.MINIO_ACCESS_KEY;
  minio_secret = process.env.MINIO_SECRET_KEY;
}


if (!(minio_access && minio_secret)) console.warn('Env minio_access or minio_secret not set');

const subdomain = process.env.MONGO_URL.split('/').pop();
const baseUrl = process.env.BASE_URL;

let minio = {
  name: "minio",
  connector: "loopback-component-storage",
  provider: "amazon",
  key: minio_secret || '',
  keyId: minio_access || '',
  forcePathBucket: true,
  endpoint: baseUrl.replace(subdomain, 'minio'),
  bucket: 'public',
  subfolder: subdomain,
  acl: "public-read"
};


module.exports = {
  mongodb,
  minio
};
