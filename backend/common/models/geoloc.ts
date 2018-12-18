import {Model} from '@mean-expert/model';
import {RabbitPub} from '../../server/RabbitPub';

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
    afterDelete: {name: "after delete", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
  },
  remotes: {
    createFromParsedPayload: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/from-payload', verb: 'post'},
      accepts: [
        {arg: 'message', type: 'Message', required: true, description: 'The message object'}
      ],
    },
    postSigfox: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}
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

  private HERE = {
    app_id: process.env.HERE_APP_ID,
    app_code: process.env.HERE_APP_CODE
  };

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  private createFromParsedPayload(message: any, req: any): void {
    // Models
    const Geoloc = this.model;
    const Beacon = this.model.app.models.Beacon;

    if (typeof message === 'undefined') {
      return console.error('Missing "message"', message);
    } else if (typeof message.data_parsed === 'undefined') {
      return console.log('----------> Missing "data_parsed", not trying to decode Geoloc.');
    }

    let hasGpsLocation = false;
    let hasBeaconLocation = false;
    let hasWifiLocation = false;

    // Build the GPS Geoloc object
    const geoloc_gps = new Geoloc;
    geoloc_gps.location = new loopback.GeoPoint({lat: null, lng: null});
    geoloc_gps.createdAt = message.createdAt;
    geoloc_gps.userId = message.userId;
    geoloc_gps.messageId = message.id;
    geoloc_gps.deviceId = message.deviceId;

    // Build the Beacon Geoloc object
    const geoloc_beacon = new Geoloc;
    geoloc_beacon.location = new loopback.GeoPoint({lat: null, lng: null});
    geoloc_beacon.createdAt = message.createdAt;
    geoloc_beacon.userId = message.userId;
    geoloc_beacon.messageId = message.id;
    geoloc_beacon.deviceId = message.deviceId;

    // Build the WiFi Geoloc object
    const geoloc_wifi = new Geoloc;
    geoloc_wifi.location = new loopback.GeoPoint({lat: null, lng: null});
    geoloc_wifi.createdAt = message.createdAt;
    geoloc_wifi.userId = message.userId;
    geoloc_wifi.messageId = message.id;
    geoloc_wifi.deviceId = message.deviceId;
    geoloc_wifi.wifiAccessPoints = [];

    message.data_parsed.forEach((p: any) => {
      if (p.value !== null && typeof p.value !== 'undefined') {
        // Check if there is GPS geoloc in parsed data
        if (p.key === 'lat' && p.value >= -90 && p.value <= 90) {
          hasGpsLocation = true;
          geoloc_gps.location.lat = p.value;
        } else if (p.key === 'lng' && p.value >= -180 && p.value <= 180) {
          geoloc_gps.location.lng = p.value;
        }
        // Check if there is Beacon geoloc in parsed data
        else if (p.key === 'beaconId') {
          hasBeaconLocation = true;
          geoloc_beacon.beaconId = p.value.toString().toUpperCase();
        }
        // Check if there is accuracy in parsed data
        else if (p.key === 'accuracy' || p.key === 'precision') {
          geoloc_beacon.accuracy = p.value;
          geoloc_wifi.accuracy = p.value;
        }
        // Check if there is WiFi geoloc in parsed data
        else if (p.key.includes('wlan_')) {
          hasWifiLocation = true;
          if (p.unit && p.unit !== '') {
            geoloc_wifi.wifiAccessPoints.push({macAddress: p.value.toString(), signalStrength: Number(p.unit)});
          } else {
            geoloc_wifi.wifiAccessPoints.push({macAddress: p.value.toString()});
          }
        }
      }
    });

    if (hasGpsLocation) {
      geoloc_gps.type = 'gps';
      this.createGeoloc(geoloc_gps);
    }

    if (hasBeaconLocation) {
      geoloc_beacon.type = 'beacon';
      Beacon.findById(geoloc_beacon.beaconId, (err: any, beacon: any) => {
        if (err) console.error(err);
        else if (beacon) {
          geoloc_beacon.location.lat = beacon.location.lat;
          geoloc_beacon.location.lng = beacon.location.lng;
          geoloc_beacon.level = beacon.level;
          this.createGeoloc(geoloc_beacon);
        }
      });
    }

    if (hasWifiLocation) {
      geoloc_wifi.type = 'wifi';
      if (this.HERE.app_id && this.HERE.app_code && !process.env.GOOGLE_API_KEY) {
        this.getHereGeolocation(geoloc_wifi).then(value => {
          console.log('[WiFi Geolocation] - Device located successfully with Here.');
        }).catch(reason => {
          console.log('[WiFi Geolocation] - Could not locate device with Here.');
        });
      } else if ((!this.HERE.app_id || !this.HERE.app_code) && process.env.GOOGLE_API_KEY) {
        this.getGoogleGeolocation(geoloc_wifi).then(value => {
          console.log('[WiFi Geolocation] - Device located successfully with Google.');
        }).catch(reason => {
          console.log('[WiFi Geolocation] - Could not locate device with Google.');
        });
      } else if (this.HERE.app_id && this.HERE.app_code && process.env.GOOGLE_API_KEY) {
        this.getHereGeolocation(geoloc_wifi).then(value => {
          console.log('[WiFi Geolocation] - Device located successfully with Here.');
        }).catch(reason => {
          console.log('[WiFi Geolocation] - Could not locate device with Here => falling back on Google.');
          this.getGoogleGeolocation(geoloc_wifi).then(value => {
            console.log('[WiFi Geolocation] - Device located successfully with Google.');
          }).catch(reason => {
            console.log('[WiFi Geolocation] - Could not locate device with Google.');
          });
        });
      } else {
        console.error('[WiFi Geolocation] - Trying to position with WiFi but no service provider has been set - check your environment variables!');
      }
    }
  }

  getUbiscaleGeolocation(geoloc_gps: any, geoloc_sigfox: any, deviceId: any, ubiscaleData: any, time: any): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
      const credentials = new Buffer(process.env.UBISCALE_LOGIN + ':' + process.env.UBISCALE_PASSWORD).toString('base64');
      const json = {
        network: 'sigfox',
        device: deviceId,
        data: ubiscaleData,
        time: time,
        lat: geoloc_sigfox.location.lat,
        lng: geoloc_sigfox.location.lng
      };

      this.model.app.dataSources.ubiscale.locate(credentials, json).then((result: any) => {
        //console.error('---------------------------------------------------------------------\n', result);
        geoloc_gps.source = 'ubiscale';
        geoloc_gps.location.lat = result.lat;
        geoloc_gps.location.lng = result.lng;
        geoloc_gps.accuracy = result.accuracy;

        this.createGeoloc(geoloc_gps);
        resolve(true);
      }).catch((err: any) => {
        console.error(err);
        reject(false);
      });
    });
  }

  getHereGeolocation(geoloc_wifi: any): Promise<boolean> {
    const wlans: any = {
      wlan: []
    };
    geoloc_wifi.wifiAccessPoints.forEach((wifiAccessPoint: any) => {
      if (wifiAccessPoint.signalStrength) {
        wlans.wlan.push({mac: wifiAccessPoint.macAddress, powrx: wifiAccessPoint.signalStrength});
      } else {
        wlans.wlan.push({mac: wifiAccessPoint.macAddress});
      }
    });

    return new Promise((resolve: any, reject: any) => {
      this.model.app.dataSources.here.locate(this.HERE.app_id, this.HERE.app_code, wlans).then((result: any) => {
        //console.error('---------------------------------------------------------------------\n', result);
        geoloc_wifi.source = 'here';
        geoloc_wifi.location.lat = result.location.lat;
        geoloc_wifi.location.lng = result.location.lng;
        geoloc_wifi.accuracy = result.location.accuracy;

        this.createGeoloc(geoloc_wifi);
        resolve(true);
      }).catch((err: any) => {
        //console.error(err);
        reject(false);
      });
    });
  }

  getGoogleGeolocation(geoloc_wifi: any): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
      this.model.app.dataSources.google.locate(process.env.GOOGLE_API_KEY, {
        considerIp: false,
        wifiAccessPoints: geoloc_wifi.wifiAccessPoints
      }).then((result: any) => {
        //console.error('---------------------------------------------------------------------\n', result);
        geoloc_wifi.source = 'google';
        geoloc_wifi.location.lat = result.location.lat;
        geoloc_wifi.location.lng = result.location.lng;
        geoloc_wifi.accuracy = result.accuracy;

        this.createGeoloc(geoloc_wifi);
        resolve(true);
      }).catch((err: any) => {
        //console.error(err);
        reject(false);
      });
    });
  }

  postSigfox(req: any, data: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    const Message = this.model.app.models.Message;
    const Alert = this.model.app.models.Alert;

    if (typeof data.geoloc === 'undefined'
      || typeof data.geoloc.location === 'undefined'
      || typeof data.deviceId === 'undefined'
      || typeof data.time === 'undefined'
      || typeof data.seqNumber === 'undefined') {
      return next('Missing "geoloc", "deviceId", "time" and "seqNumber"', data);
    }

    // Force set uppercase for deviceId
    data.deviceId = data.deviceId.toUpperCase();

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Saving a message anyway
    const message = new Message;
    message.id = data.deviceId + data.time + data.seqNumber;
    message.userId = userId;
    message.deviceId = data.deviceId;
    message.time = data.time;
    message.seqNumber = data.seqNumber;
    message.createdAt = new Date(data.time * 1000);
    message.deviceAck = true;

    // Find the corresponding message in order to retrieve its message ID
    Message.findOrCreate(
      {
        where: {id: data.deviceId + data.time + data.seqNumber}
      },
      message,
      (err: any, messageInstance: any, created: boolean) => {
        if (err) return next(err, data);
        else if (messageInstance) {
          if (!created) console.log('Found the corresponding message.');
          else {
            /**
             * TODO: Check below - OOB frame device acknowledge ?
             */
            console.log('??? OOB for deviceId: ' + data.deviceId);
          }

          // Build the Geoloc object
          const geoloc = new Geoloc;
          geoloc.type = 'sigfox';
          geoloc.location = new loopback.GeoPoint(data.geoloc.location);
          geoloc.accuracy = data.geoloc.accuracy;
          geoloc.createdAt = messageInstance.createdAt;
          geoloc.userId = userId;
          geoloc.messageId = messageInstance.id;
          geoloc.deviceId = messageInstance.deviceId;

          if (messageInstance.data_parsed) {
            /**
             * Checking if there is Ubiscale positioning, we need the lat & lng of Sigfox in the body of the UbiCloud API call...
             */
              // Build the GPS Geoloc object
            const geoloc_gps = new Geoloc;
            geoloc_gps.location = new loopback.GeoPoint({lat: null, lng: null});
            geoloc_gps.createdAt = messageInstance.createdAt;
            geoloc_gps.userId = messageInstance.userId;
            geoloc_gps.messageId = messageInstance.id;
            geoloc_gps.deviceId = messageInstance.deviceId;

            messageInstance.data_parsed.forEach((p: any) => {
              if (p.value !== null && typeof p.value !== 'undefined') {
                // Check if there is Ubiscale geoloc in parsed data
                if (p.key === 'ubiscale') {
                  geoloc_gps.type = 'gps';
                  if (process.env.UBISCALE_LOGIN && process.env.UBISCALE_PASSWORD) {
                    this.getUbiscaleGeolocation(geoloc_gps, geoloc, messageInstance.deviceId, p.value, messageInstance.time).then(value => {
                      console.log('[Ubiscale Geolocation] - Device located successfully with Ubiscale.');
                    }).catch(reason => {
                      console.log('[Ubiscale Geolocation] - Could not locate device with Ubiscale.');
                    });
                  }
                }
              }
            });
          }

          // Trigger alerts (if any)
          Alert.triggerBySigfoxGeoloc(
            geoloc.location.lat,
            geoloc.location.lng,
            geoloc.deviceId,
            req,
            (err: any, res: any) => {
              if (err) console.error(err);
            });

          // Creating a new Geoloc
          Geoloc.findOrCreate(
            {
              where: {
                and: [
                  {type: geoloc.type},
                  {messageId: geoloc.messageId}
                ]
              }
            }, // find
            geoloc, // create
            (err: any, geolocInstance: any, created: boolean) => { // callback
              if (err) return next(err, geolocInstance);
              else if (created) {
                // console.log('Created geoloc as: ', geolocInstance);
                this.updateDeviceLocatedAt(geolocInstance.deviceId, geolocInstance.createdAt);
                return next(null, geolocInstance);
              } else return next(null, 'This geoloc for device (' + geoloc.deviceId + ') has already been created.');
            });
        }
      });
  }

  updateDeviceLocatedAt(deviceId: string, createdAt: Date) {
    // Models
    const Device = this.model.app.models.Device;

    Device.findById(deviceId, (err: any, deviceInstance: any) => {
      if (err) console.error(err);
      else if (deviceInstance) deviceInstance.updateAttribute('locatedAt', createdAt);
    });
  }

  createGeoloc(geoloc: any) {
    const Geoloc = this.model;
    Geoloc.create(
      geoloc,
      (err: any, geolocInstance: any) => {
        if (err) console.error(err);
        else {
          // console.log('Created geoloc as: ', geolocInstance);
          this.updateDeviceLocatedAt(geolocInstance.deviceId, geolocInstance.createdAt);
        }
      });
  }

  postAlexaDeviceLocation(req: any, body: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    console.log(body);
  }

  public afterDelete(ctx: any, next: Function): void {
    let geoloc = ctx.instance;
    if (geoloc) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "geoloc",
        content: geoloc,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }


  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let geoloc = ctx.instance;
    const payload = {
      event: "geoloc",
      content: geoloc,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Geoloc;
