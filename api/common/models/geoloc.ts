import { Model } from '@mean-expert/model';

let moment = require('moment');

/**
 * @module Geoloc
 * @description
 * Write a useful Geoloc Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    getGeolocsByDeviceId: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'the device ID to track'},
        {arg: 'dateBegin', type: 'string', default: moment().subtract(1, 'hours'), description: 'the starting date-time'},
        {arg: 'dateEnd', type: 'string', default: moment(), description: 'the ending date-time'}
      ],
      http: {
        path: '/tracking',
        verb: 'get'
      },
      returns: {type: ["Message"], root: true}
    }
  }
})

class Geoloc {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Geoloc: Before Save');
    next();
  }

  // Get all geoloc messages belonging to a device (by id and/or date)
  getGeolocsByDeviceId(deviceId: string, dateBegin: string, dateEnd: string, next: Function): void {

    let messages:any;

    // Get messages of device ID where geoloc is defined and filtered by date
    this.model.app.models.Device.findById(
      deviceId,
      {
        include: [
          {
            relation: 'Messages',
            scope: {
              fields: ['geoloc', 'createdAt'],
              where: {
                and: [
                  {createdAt: {gte: dateBegin}},
                  {createdAt: {lte: dateEnd}},
                  {geoloc: {neq: null}}
                ]}
            }
          }]
      },
      (err: any, device: any) => {
        if (err || !device){
          console.error("Error searching tracking for device " + deviceId, err);
        } else {
          device = device.toJSON();
          messages =  device.Messages;
          //console.log("device:", device);
          //console.log("messages", messages);

        }
        next(err, messages);
      });
  }
}

module.exports = Geoloc;
