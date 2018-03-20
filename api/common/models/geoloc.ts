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
    createFromParsedPayload: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/from-payload', verb: 'post' },
      accepts: [
        {arg: 'message', type: 'Message', required: true, description: 'The message object'}
      ],
    },
    postSigfox: {
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
  constructor(public model: any) {
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Geoloc: Before Save');
    next();
  }

  private createFromParsedPayload(message: any, req: any): void {
    // Models
    const Geoloc = this.model;

    if (typeof message === 'undefined'
      || typeof message.data_parsed === 'undefined') {
      return console.error('Missing "message"', message);
    }

    let hasLocation = false;

    // Build the Geoloc object
    const geoloc = new Geoloc;
    geoloc.type = 'gps';
    geoloc.location = new loopback.GeoPoint({lat: 0, lng: 0});
    geoloc.createdAt = message.createdAt;
    geoloc.userId = message.userId;
    geoloc.messageId = message.id;
    geoloc.deviceId = message.deviceId;

    message.data_parsed.forEach((p: any) => {
      // Check if there is geoloc in parsed data
      if (p.key === 'lat' && p.value >= -90 && p.value <= 90) {
        hasLocation = true;
        geoloc.location.lat = p.value;
      } else if (p.key === 'lng' && p.value >= -180 && p.value <= 180) {
        geoloc.location.lng = p.value;
      }
    });

    if (hasLocation) {
      // Find or create a new Geoloc
      Geoloc.findOrCreate(
        {
          where: {
            and: [
              {type: geoloc.type},
              {location: geoloc.location},
              {createdAt: geoloc.createdAt},
              {userId: geoloc.userId},
              {messageId: geoloc.messageId},
              {deviceId: geoloc.deviceId}
            ]
          }
        },
        geoloc,
        (err: any, geolocInstance: any, created: boolean) => {
          if (err) {
            console.error(err);
          } else {
            if (created) {
              console.log('Created geoloc as: ', geolocInstance);
              // Update device in order to trigger a real time upsert event
              this.updateDeviceLastLocation(geolocInstance.deviceId);
            } else {
              console.log('Skipped geoloc creation.');
            }
          }
        });
    }
  }

  postSigfox(req: any, data: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    const Message = this.model.app.models.Message;

    if (typeof data.geoloc === 'undefined'
      || typeof data.deviceId === 'undefined'
      || typeof data.time === 'undefined'
      || typeof data.seqNumber === 'undefined') {
      next('Missing "geoloc", "deviceId", "time" and "seqNumber"', data);
    }
    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Find the corresponding message in order to retrieve its message ID
    Message.findOne({
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
          Geoloc.create(
            geoloc,
            (err: any, geolocInstance: any) => {
              if (err) {
                console.error(err);
                next(err, geolocInstance);
              } else {
                console.log('Created geoloc as: ', geolocInstance);
                // Update device in order to trigger a real time upsert event
                this.updateDeviceLastLocation(geolocInstance.deviceId);
                next(null, geolocInstance);
              }
            });
        } else {
          const err = 'No corresponding message found, check if UPLINK or BIDIR callbacks have been set too (on the Sigfox Backend)!';
          /**
           * TODO: Check below - maybe create an acknowledge service connector
           */
            // Saving a message anyway
          const message = new Message;
          message.userId = userId;
          message.deviceId = data.deviceId;
          message.time = data.time;
          message.seqNumber = data.seqNumber;
          message.createdAt = new Date(data.time * 1000);
          message.downlinkAck = true;
          Message.create(
            message,
            (err: any, messageInstance: any) => {
              if (err) {
                console.error(err);
                next(err, messageInstance);
              } else {
                console.log('Created message as: ', messageInstance);
                // Update device in order to trigger a real time upsert event
                this.updateDeviceLastLocation(messageInstance.deviceId);
              }
            });
          next(err, null);
        }
      }
    });
  }

  updateDeviceLastLocation(deviceId: string) {
    // Models
    const Device = this.model.app.models.Device;

    Device.findOne({
      where: {
        id: deviceId
      }
    }, (err: any, deviceInstance: any) => {
      if (err) {
        console.error(err);
      } else {
        if (deviceInstance) {
          deviceInstance.lastLocatedAt = new Date();
          Device.upsert(deviceInstance, (err: any, deviceUpdated: any) => {
            if (!err) {
              console.log('Updated device lastLocatedAt date');
            }
          });
        }
      }
    });
  }
}

module.exports = Geoloc;
