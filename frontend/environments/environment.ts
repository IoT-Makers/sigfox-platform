// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import * as process from 'process'

export const environment = {
  production: false,
  apiUrl : '//127.0.0.1:3000',
  apiVersion : 'api',
  PRIMUS_URL: process.env.PRIMUS_URL || 'http://localhost:2333'
};
