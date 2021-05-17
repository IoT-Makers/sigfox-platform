const fs = require('fs');

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
  console.log('Using MongoDB with: ' + MONGO_URL);
  var mongodb = {
    useNewUrlParser: true,
    url: MONGO_URL,
    name: 'mongodb',
    connector: 'mongodb',
    disableDefaultSort: true,
  };
} else console.error('Env MONGO_URL not set');

let minioAccess = null;
let minioSecret = null;

try {
  // docker secret
  minioAccess = fs
    .readFileSync('/run/secrets/minio_access_key', 'utf8')
    .trim();
  minioSecret = fs
    .readFileSync('/run/secrets/minio_aecret_key', 'utf8')
    .trim();
} catch (e) {
  // for local dev
  minioAccess = process.env.MINIO_ACCESS_KEY;
  minioSecret = process.env.MINIO_SECRET_KEY;
}

if (!(minioAccess && minioSecret))
  console.warn('Env minio_access_key or minio_secret_key not set');

const subdomain = process.env.MONGO_URL.split('/').pop();
const baseUrl = process.env.BASE_URL;

let minio = {
  name: 'minio',
  connector: 'loopback-component-storage',
  provider: 'amazon',
  key: minioSecret || '',
  keyId: minioAccess || '',
  forcePathBucket: true,
  endpoint: baseUrl.replace(subdomain, 'minio'),
  bucket: 'public',
  subfolder: subdomain,
  acl: 'public-read',
};

module.exports = {
  mongodb,
  minio,
};
