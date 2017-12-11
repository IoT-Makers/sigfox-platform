import { Model } from '@mean-expert/model';
/**
 * @module reception
 * @description
 * Write a useful reception Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/

const request = require('request');

@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    getBaseStationsByDeviceId: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'the deviceId'},
        {arg: 'time', type: 'number', required: true, description: 'the message time'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/base-stations',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }
  }
})

class Reception {
  private sigfoxBackendBaseApiUrl = 'https://backend.sigfox.com/api/';

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('reception: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }

  // Get all base stations reached by the latest message belonging to a device
  getBaseStationsByDeviceId(deviceId: string, messageTime: number, req: any, next: Function): void {
    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;

    this.model.app.models.user.findById(
      userId,
      {},
      (err: any, userInstance: any) => {
        if (err) {
          console.error(err);
          next(err, userInstance);
        } else {
          const sigfoxBackendApiLogin = userInstance.sigfoxBackendApiLogin;
          const sigfoxBackendApiPassword = userInstance.sigfoxBackendApiPassword;

          const options = {
            url: this.sigfoxBackendBaseApiUrl + 'devices/' + deviceId + '/messages?limit=1&before=' + messageTime + 1,
            headers: {
              'Authorization': 'Basic ' + new Buffer(sigfoxBackendApiLogin + ':' + sigfoxBackendApiPassword).toString('base64')
            }
          };

          // @TODO there seems to be an error when retrieving the base station list... Sometimes not the good ones
          request(options, function (error: any, response: any, body: any) {
            let res: any = [];
            if (!error && response.statusCode === 200) {
              body = JSON.parse(body);
              res = body.data[0].rinfos;
            } else {
              console.error(options.url + ' ' + response.statusCode);
            }
            next(null, res);
          });
        }
      });
  }
}

module.exports = Reception;
