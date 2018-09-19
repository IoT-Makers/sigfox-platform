import {Model} from '@mean-expert/model';
import {decrypt, encrypt} from './utils';

const request = require('request');

/**
 * @module Connector
 * @description
 * Write a useful Connector Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    createSigfoxBackendCallbacks: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'devicetypeId', type: 'string', required: true}
      ],
      http: {
        path: '/create-sigfox-backend-callbacks',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }
  }
})

class Connector {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Connector: Before Save');
    ctx.instance.createdAt = new Date();
    const type = ctx.instance.type;
    const login = ctx.instance.login;
    const password = ctx.instance.password;
    // Encrypt the password to be stored
    if (password) {
      const encryptedPassword = encrypt(password);
      ctx.instance.password = encryptedPassword;
    }

    if (type === 'sigfox-api') {
      this.testConnection(type, login, password, next);
    } else {
      next();
    }
  }

  createSigfoxBackendCallbacks(req: any, devicetypeId: string, next: Function) {
    // Models
    const User = this.model.app.models.user;

    if (!process.env.BASE_URL) {
      return next('Please refer the environment variable `BASE_URL` first.');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    User.findById(
      userId,
      {},
      (err: any, userInstance: any) => {
        if (err) {
          console.error(err);
          next(err, userInstance);
        } else if (userInstance) {

          const devAccessTokens = userInstance.devAccessTokens;

          if (!devAccessTokens || devAccessTokens.length === 0) {
            return next(err, 'Please create a developer access token first.');
          }

          this.model.findOne(
            {
              where: {
                userId: userId,
                type: 'sigfox-api'
              }
            },
            (err: any, connector: any) => {
              if (err) {
                console.log(err);
                next(err, null);
              } else {
                if (connector) {
                  const sigfoxApiLogin = connector.login;
                  const sigfoxApiPassword = decrypt(connector.password);

                  const credentials = Buffer.from(sigfoxApiLogin + ':' + sigfoxApiPassword).toString('base64');

                  const options = { method: 'POST',
                    url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks/new',
                    headers:
                      { 'cache-control': 'no-cache',
                        authorization: 'Basic ' + credentials,
                        'content-type': 'application/json' },
                    body:
                      [ { channel: 'URL',
                        callbackType: 0,
                        callbackSubtype: 3,
                        url: process.env.BASE_URL + '/api/Messages/sigfox',
                        httpMethod: 'PUT',
                        enabled: true,
                        sendDuplicate: true,
                        sendSni: false,
                        bodyTemplate: '{\n\t"deviceId": "{device}",\n\t"time": {time},\n\t"seqNumber": {seqNumber},\n\t"data": "{data}",\n\t"reception": [{ "id": "{station}", "RSSI": {rssi}, "SNR": {snr} }],\n\t"duplicate": {duplicate},\n\t"ack": {ack}\n}',
                        headers: { Authorization: devAccessTokens[0].id },
                        contentType: 'application/json' },
                        { channel: 'URL',
                          callbackType: 1,
                          callbackSubtype: 1,
                          url: process.env.BASE_URL + '/api/Geolocs/sigfox',
                          httpMethod: 'POST',
                          enabled: true,
                          sendDuplicate: false,
                          sendSni: false,
                          bodyTemplate: '{\n\t"deviceId": "{device}",\n\t"time": {time},\n\t"seqNumber": {seqNumber},\n\t"geoloc": {\n\t\t"location": {\n\t\t\t"lat": {lat},\n\t\t\t"lng": {lng}\n\t\t},\n\t\t"accuracy": {radius} \n\t}\n}',
                          headers: { Authorization: devAccessTokens[0].id },
                          contentType: 'application/json' } ],
                    json: true };

                  request(options, (error: any, response: any, body: any) => {
                    if (error) throw next(error, null);
                    next(null, response);
                    //console.log(body);
                  });


                  /*const body = [
                    {
                      channel: 'URL',
                      callbackType: 0,
                      callbackSubtype: 3,
                      url: 'https://app.iotagency.sigfox.com/api/Messages/sigfox',
                      httpMethod: 'PUT',
                      enabled: true,
                      sendDuplicate: true,
                      sendSni: false,
                      bodyTemplate: '{\n\t"deviceId": "{device}",\n\t"time": {time},\n\t"seqNumber": {seqNumber},\n\t"geoloc": {\n\t\t"location": {\n\t\t\t"lat": {lat},\n\t\t\t"lng": {lng}\n\t\t},\n\t\t"accuracy": {radius} \n\t}\n}',
                      //bodyTemplate: JSON.stringify({deviceId: '{device}', time: {'time'}, seqNumber: {seqNumber}, data: '{data}', reception: [{ id: '{station}', RSSI: {rssi}, SNR: {snr} }], duplicate: {duplicate}, ack: {ack} }),
                      //bodyTemplate: '{\n\t\"deviceId\": \"{device}\",\n\t\"time\": {time},\n\t\"seqNumber\": {seqNumber},\n\t\"data\": \"{data}\",\n\t\"reception\": [{ \"id\": \"{station}\", \"RSSI\": {rssi}, \"SNR\": {snr} }],\n\t\"duplicate\": {duplicate},\n\t\"ack\": {ack}\n}',
                      headers: {
                        Authorization: devAccessTokens[0].id
                      },
                      contentType: 'application/json'
                    }/!*,
                    {
                      channel: 'URL',
                      callbackType: 1,
                      callbackSubtype: 1,
                      url: process.env.BASE_URL + '/api/Geolocs/sigfox',
                      httpMethod: 'POST',
                      enabled: true,
                      sendDuplicate: false,
                      sendSni: false,
                      bodyTemplate: '\n\t\"deviceId\": \"{device}\",\n\t\"time\": {time}, \"seqNumber\": {seqNumber},\n\t\"geoloc\": {\n\t\t\"location\": {\n\t\t\t\"lat\": {lat},\n\t\t\t\"lng\": {lng}\n\t\t},\n\t\t\"accuracy\": {radius} \n\t}\n',
                      headers: {
                        Authorization: devAccessTokens[0].id
                      },
                      contentType: 'application/json'
                    }*!/
                  ];

                  this.model.app.dataSources.sigfox.createCallbacks(credentials, devicetypeId, body).then((result: any) => {
                    next(null, 'Success');
                  }).catch((err: any) => {
                    next(err, null);
                  });*/
                } else {
                  next(err, 'Please refer your Sigfox API connector first');
                }
              }
            });
        }
      });
  }

  // Test connector connection
  testConnection(type: string, login: string, password: string, next: Function): void {
    if (type === 'sigfox-api') {
      const credentials = new Buffer(login + ':' + password).toString('base64');

      this.model.app.dataSources.sigfox.testConnection(credentials).then((result: any) => {
        next(null, result);
      }).catch((err: any) => {
        next(err, null);
      });
    } else {
      next(null, 'Not implemented yet.');
    }
  }
}

module.exports = Connector;
