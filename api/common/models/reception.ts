import {Model} from '@mean-expert/model';
import {decrypt} from './utils';

/**
 * @module reception
 * @description
 * Write a useful reception Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/

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
        path: '/base-stations-by-device-id',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }
  }
})

class Reception {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('reception: Before Save');
    next();
  }

  // Get all base stations reached by the latest message belonging to a device
  getBaseStationsByDeviceId(deviceId: string, messageTime: number, req: any, next: Function): void {
    // Models
    const Connector = this.model.app.models.Connector;

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    Connector.findOne(
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
          console.log(connector);
          if (connector) {
            const sigfoxApiLogin = connector.login;
            const sigfoxApiPassword = decrypt(connector.password);

            const credentials = Buffer.from(sigfoxApiLogin + ':' + sigfoxApiPassword).toString('base64');

            this.model.app.dataSources.sigfox.getMessages(credentials, deviceId, 1, messageTime + 1).then((result: any) => {
              next(null, result.data[0].rinfos);
            }).catch((err: any) => {
              next(err, null);
            });
          } else {
            next(err, 'Please refer your Sigfox API connector first');
          }
        }
      });
  }
}

module.exports = Reception;
