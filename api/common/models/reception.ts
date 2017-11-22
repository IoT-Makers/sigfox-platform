import { Model } from '@mean-expert/model';
/**
 * @module reception
 * @description
 * Write a useful reception Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/

let request = require('request');

@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    getBaseStationsByDeviceId: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'the device ID'}
      ],
      http: {
        path: '/base-stations',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }
  }
})

class reception {
  private sigfoxBackendBaseApiUrl: string = 'https://backend.sigfox.com/api/';
  private backendApiLogin: string = "";
  private backendApiPassword: string = "";

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
  getBaseStationsByDeviceId(deviceId: string, next: Function): void {
    let options = {
      url: this.sigfoxBackendBaseApiUrl + 'devices/' + deviceId + '/messages?limit=1',
      headers: {
        'Authorization': 'Basic ' + new Buffer(this.backendApiLogin + ':' + this.backendApiPassword).toString('base64'),
        'Content-Type': 'application/json'
      }
    };

    function callback(error: any, response: any, body: any) {
      if (!error && response.statusCode == 200) {
        let res = JSON.parse(body);
        console.log(res.data[0].rinfos);
      }
    }

    request(options, callback);
  }
}

module.exports = reception;
