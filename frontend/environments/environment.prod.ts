import * as process from 'process'

export const environment = {
  production: true,
  envName: 'prod',
  apiUrl: '',
  apiVersion: 'api',
  PRIMUS_URL: process.env.PRIMUS_URL
};
