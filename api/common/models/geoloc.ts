import {Model} from '@mean-expert/model';

const loopback = require('loopback');

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
    createFromPayload: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/from-payload', verb: 'post' },
      accepts: [
        {arg: 'message', type: 'Message', required: true, description: 'The message object'}
      ],
    },
    createSigfox: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: { source: 'body' }}
      ],
      http: {
        path: '/sigfox',
        verb: 'post'
      },
      returns: {type: 'Geoloc', root: true}
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

  private createFromPayload(message: any, req: any): void {
    if (typeof message === 'undefined'
      || typeof message.data_parsed === 'undefined') {
      return console.error('Missing "message"', message);
    }

    // Build the Geoloc object
    const geoloc = new this.model.app.models.Geoloc;
    geoloc.type = 'GPS';
    geoloc.location = new loopback.GeoPoint({lat: 0, lng: 0});
    geoloc.createdAt = message.createdAt;
    geoloc.userId = message.userId;
    geoloc.messageId = message.id;
    geoloc.deviceId = message.deviceId;

    message.data_parsed.forEach((p: any) => {
      // Check if there is geoloc in parsed data
      if (p.key === 'lat') {
        geoloc.location.lat = p.value;
      } else if (p.key === 'lng') {
        geoloc.location.lng = p.value;
      }
    });

    // Creating a new Geoloc
    this.model.app.models.Geoloc.create(
      geoloc,
      (err: any, geolocInstance: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Created geoloc as: ', geolocInstance);
        }
      });
  }

  createSigfox(req: any, data: any, next: Function): void {
    if (typeof data.geoloc === 'undefined'
      || typeof data.deviceId  === 'undefined'
      || typeof data.time  === 'undefined'
      || typeof data.seqNumber === 'undefined') {
      next('Missing "geoloc", "deviceId", "time" and "seqNumber"', data);
    }
    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;

    // Find the corresponding message in order to retrieve its message ID
    this.model.app.models.Message.findOne({
      where: {
        and: [
          {deviceId: data.deviceId},
          {time: data.time},
          {seqNumber: data.seqNumber}
        ]
      }
    }, (err: any, messageInstance: any) => {
      if (err) {
        console.error(err);
        next(err, data);
      } else {
        if (messageInstance) {
          console.log('Found the corresponding message.');
          // Build the Geoloc object
          const geoloc = new this.model.app.models.Geoloc;
          geoloc.type = 'sigfox';
          geoloc.location = new loopback.GeoPoint(data.geoloc.location);
          geoloc.precision = data.geoloc.precision;
          geoloc.createdAt = messageInstance.createdAt;
          geoloc.userId = userId;
          geoloc.messageId = messageInstance.id;
          geoloc.deviceId = messageInstance.deviceId;

          // Creating a new Geoloc
          this.model.app.models.Geoloc.create(
            geoloc,
            (err: any, geolocInstance: any) => {
              if (err) {
                console.error(err);
                next(err, geolocInstance);
              } else {
                console.log('Created geoloc as: ', geolocInstance);
                next(null, geolocInstance);
              }
            });
        } else {
          const err = 'No corresponding message found, check if UPLINK or BIDIR callbacks have been set too (on the Sigfox Backend)!';
          next(err, null);
        }
      }
    });
  }
}

module.exports = Geoloc;
