import {writeFile} from 'fs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const environment = process.env.BUILD_ENV || 'dev';
const isProd = environment === 'prod';

const targetPath = `./environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  apiUrl: "${process.env.API_URL}",
  apiVersion: "${process.env.API_VERSION}",
  primusUrl: "${process.env.PRIMUS_URL}"
};
`;
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) return console.log(err);
    console.log(`Output generated at ${targetPath}`);
});
