import {writeFile} from 'fs';
import {argv} from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

const targetPath = `./environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  envName: environment,
  apiUrl: "${process.env.API_URL}",
  apiVersion: "${process.env.API_VERSION}",
  primusUrl: "${process.env.PRIMUS_URL}"
};
`;
writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) return console.log(err);
    console.log(`Output generated at ${targetPath}`);
});
