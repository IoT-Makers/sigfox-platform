import {Model} from '@mean-expert/model';
import {RabbitPub} from '../../server/RabbitPub';

const loopback = require('loopback');
const circleToPolygon = require('circle-to-polygon');
var GreinerHormann = require('greiner-hormann');

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
    },
    postDataAdvanced: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}
      ],
      http: {
        path: '/sigfox/advanced',
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
  constructor(public model: any) {
  }

  postSigfox(req: any, data: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    const Message = this.model.app.models.Message;

    var ubistate: boolean = false;


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

    // Find the corresponding message or create one
    Message.findOrCreate(
      {
        where: {id: message.id}
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
          geoloc.id = messageInstance.id + 'sigfox';
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
            geoloc_gps.id = messageInstance.id + 'gps';
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
                  //ubistate=true;

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

          // Creating a new Geoloc
        
            Geoloc.create(
              geoloc,
              (err: any, geolocInstance: any, created: boolean) => { // callback
                console.log('created in geoloc create',created);
                if (err) return next(err, geolocInstance);
                else return next(null, geolocInstance);
              });
         
          
        }
      });
  }

  postDataAdvanced(req: any, data: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    const Message = this.model.app.models.Message;
    var ubistate: boolean = false;

    if (typeof data.deviceId === 'undefined'
      || typeof data.time === 'undefined'
      || typeof data.seqNumber === 'undefined'
      || typeof data.computedLocation === 'undefined') {
      return next('Missing "deviceId", "time", "seqNumber" and "computedLocation"', data);
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

    // Find the corresponding message or create one
    Message.findOrCreate(
      {
        where: {id: message.id}
      },
      message,
      (err: any, messageInstance: any, created: boolean) => {
        if (err) return next(err, data);
        else if (messageInstance) {
          if (!created) console.log('[geoloc.ts - postDataAdvanced] - Found the corresponding message.');
          else console.log('[geoloc.ts - postDataAdvanced] - Created new message.' + data.deviceId);
          if (data.computedLocation.status === 1 || data.computedLocation.status === 2) {
            // Build the Geoloc object
            const geoloc = new Geoloc;
            switch (data.computedLocation.source) {
              case 1:
                geoloc.type = 'gps';
                break;
              case 2:
                geoloc.type = 'sigfox';
                break;
              case 5:
                geoloc.type = 'wifi';
                geoloc.source = 'sigfox';
                break;
              case 6:
                geoloc.type = 'wifi';
                break;
              default:
                geoloc.type = 'unknown';
            }
            
            geoloc.id = message.id + geoloc.type;
            geoloc.location = new loopback.GeoPoint({lat: data.computedLocation.lat, lng: data.computedLocation.lng});
            geoloc.accuracy = data.computedLocation.radius;
            geoloc.createdAt = new Date(data.time * 1000);
            geoloc.userId = userId;
            geoloc.messageId = message.id;
            geoloc.deviceId = data.deviceId;

            if (messageInstance.data_parsed) {
              /**
               * Checking if there is Ubiscale positioning, we need the lat & lng of Sigfox in the body of the UbiCloud API call...
               */
                // Build the GPS Geoloc object
              const geoloc_gps = new Geoloc;
              geoloc_gps.id = messageInstance.id + 'gps';
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
                      ubistate = true;
                      return next(null,messageInstance);
                    }
                  }
                }
              });
            }

           
            // Creating a new Geoloc
            if (!ubistate){
              Geoloc.create(
                geoloc,
                (err: any, geolocInstance: any) => { // callback
                  if (err) return next("The Geoloc already exists, please check your parser does not force platform Geoloc decoding.", geolocInstance);
                  else return next(null, geolocInstance);
                });
            } 
          } else next(null, 'No position or invalid payload');
        }
      });
  }

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
    geoloc_gps.id = message.id + 'gps';
    geoloc_gps.type = 'gps';
    geoloc_gps.location = new loopback.GeoPoint({lat: null, lng: null});
    geoloc_gps.createdAt = message.createdAt;
    geoloc_gps.userId = message.userId;
    geoloc_gps.messageId = message.id;
    geoloc_gps.deviceId = message.deviceId;

    // Build the Beacon Geoloc object
    const geoloc_beacon = new Geoloc;
    geoloc_beacon.id = message.id + 'beacon';
    geoloc_beacon.type = 'beacon';
    geoloc_beacon.location = new loopback.GeoPoint({lat: null, lng: null});
    geoloc_beacon.createdAt = message.createdAt;
    geoloc_beacon.userId = message.userId;
    geoloc_beacon.messageId = message.id;
    geoloc_beacon.deviceId = message.deviceId;

    // Build the WiFi Geoloc object
    const geoloc_wifi = new Geoloc;
    geoloc_wifi.id = message.id + 'wifi';
    geoloc_wifi.type = 'wifi';
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
        else if (p.key.startsWith('wlan_')) {
          hasWifiLocation = true;
          if (p.unit && p.unit !== '') geoloc_wifi.wifiAccessPoints.push({
            macAddress: p.value.toString(),
            signalStrength: Number(p.unit)
          });
          else geoloc_wifi.wifiAccessPoints.push({macAddress: p.value.toString()});
        }
      }
    });

    if (hasGpsLocation) {
      console.log('has Gps locationnnnn');
      this.createGeoloc(geoloc_gps);
    }
    if (hasBeaconLocation) {
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
      console.log('Get UBISCALE geolocation');
      this.model.app.dataSources.ubiscale.locate(credentials, json).then((result: any) => {
        //console.error('---------------------------------------------------------------------\n', result);
        geoloc_gps.source = 'ubiscale';
        geoloc_gps.location.lat = result.lat;
        geoloc_gps.location.lng = result.lng;
        geoloc_gps.accuracy = result.accuracy;
        console.log('On à un retour du post json');
        
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
      if (wifiAccessPoint.signalStrength) wlans.wlan.push({
        mac: wifiAccessPoint.macAddress,
        powrx: wifiAccessPoint.signalStrength
      });
      else wlans.wlan.push({mac: wifiAccessPoint.macAddress});
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

  updateDeviceLocatedAt(geoloc: any, cb: Function) {
    // Models
    const Device = this.model.app.models.Device;
    const deviceId = geoloc.deviceId;
    const createdAt = geoloc.createdAt;
    Device.findById(deviceId, (err: any, deviceInstance: any) => {
      if (err) console.error(err);
      else if (deviceInstance) {
        deviceInstance.updateAttribute('locatedAt', createdAt);
        cb(deviceInstance);
        this.checkForAlert(geoloc, deviceInstance);
      }
    });
  }

  createGeoloc(geoloc: any) {
    const Geoloc = this.model;
    Geoloc.upsert(
      geoloc,
      (err: any, geolocInstance: any) => {
        if (err) console.error(err);
        else {
          console.log('Created geoloc as: ', geolocInstance);
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
    if (ctx.isNewInstance) {
      this.updateDeviceLocatedAt(geoloc, (device: any) => {
        const payload = {
          event: "geoloc",
          device: device,
          content: geoloc,
          action: "CREATE"
        };
        RabbitPub.getInstance().pub(payload, device.userId, null);
      });
    }
    next();
  }

  private checkForAlert(currentGeoloc: any, device: any): void {
    const Alert = this.model.app.models.Alert;
    Alert.find({where: {and: [{deviceId: device.id}, {active: true}, {key: "geoloc"}]}}, (err: any, alerts: any) => {
      if (!err && alerts.length > 0) {
        const Geoloc = this.model.app.models.Geoloc;
        Geoloc.find({
          where: {and: [{deviceId: device.id}, {id: {neq: currentGeoloc.id}}]},
          limit: 1,
          order: "createdAt DESC"
        }, (err: any, lastGeoloc: any) => {
          if (!lastGeoloc || !lastGeoloc[0]) return;
          alerts.forEach((alert: any, index: any) => {
            const currentLoc = currentGeoloc.location;
            const lastLoc = lastGeoloc[0].location;
            const currentGeoPoint = new loopback.GeoPoint({lat: Number(currentLoc.lat), lng: Number(currentLoc.lng)});
            const lastGeoPoint = new loopback.GeoPoint({lat: Number(lastLoc.lat), lng: Number(lastLoc.lng)});
            alert.geofence.forEach((alertGeofence: any) => {
              let precision = currentGeoloc.precision || currentGeoloc.accuracy;
              const currentInZone = this.isDeviceInZone(currentGeoPoint, precision, alertGeofence);
              precision = lastLoc.precision || lastLoc.accuracy || 0;
              const lastInZone = this.isDeviceInZone(lastGeoPoint, precision, alertGeofence);
              if (alertGeofence.directions.includes("enter")) {
                if (currentInZone && !lastInZone) {
                  this.sendAlert(alert, 'device enters the zone', device, currentGeoloc);
                }
              }
              if (alertGeofence.directions.includes("exit")) {
                if (!currentInZone && lastInZone) {
                  this.sendAlert(alert, 'device exits the zone', device, currentGeoloc);
                }
              }
            });
          });
        });
      }
    });
  }

  private sendAlert(alert: any, message: string, device: any, location: any) {
    if (alert.message) {
      message = alert.message;
    }
    const Alert = this.model.app.models.Alert;
    Alert.triggerAlert(alert, device, `{"text": "${message}"}`, location);
  }

  // wrapper
  public isDeviceInZone(marker: any, precision: number, geofence: any): boolean {
    if (geofence.radius)
      return this.isDeviceInsideCircle(marker, precision, geofence);
    else
      return this.isDeviceInsidePolygon(marker, precision, geofence);
  }

  private isDeviceInsidePolygon(marker: any, precision: number, polygon: any): boolean {
    if (precision) {
      const geolocPoly = this.circle2Polygon(marker, precision);
      const geolocPolyV = geolocPoly.coordinates[0].map((x: any) => {
        return {x: x[0], y: x[1]}
      });
      let polygonV = polygon.location.map((x: any) => {
        return {x: x.lng, y: x.lat}
      });
      polygonV.push(polygonV[0]); // make closed polygon
      const intersection = GreinerHormann.intersection(geolocPolyV, polygonV);
      if (!intersection || intersection.length === 0) {
        return false;
      } else {
        const r = precision;
        const areaGeoloc = Math.PI * r * r;
        const areaIntersection = this.polygonArea(intersection);
        return areaIntersection / areaGeoloc >= 0.5;
      }
    } else {
      const x = marker.lat, y = marker.lng;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lat, yi = polygon[i].lng;
        const xj = polygon[j].lat, yj = polygon[j].lng;
        const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
          inside = !inside;
        }
      }
      return inside;
    }
  }

  private isDeviceInsideCircle(marker: any, precision: number, alertGeofence: any): boolean {
    const location_geofence = new loopback.GeoPoint(alertGeofence.location[0]);
    if (precision) {
      const d = marker.distanceTo(location_geofence, {type: "meters"});
      const R = alertGeofence.radius, r = precision;
      if (d <= R) {
        if (r + d < R)
          return true; // 100% in
        const areaGeoloc = Math.PI * r * r;
        const areaIntersection = 0.5 * Math.sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
        return areaIntersection / areaGeoloc >= 0.5;
      } else {
        return false;
      }
    } else {
      const distanceToGeofence = marker.distanceTo(location_geofence, {type: "meters"});
      return distanceToGeofence <= alertGeofence.radius;
    }
  }

  private polygonArea(vertices: any) {
    let total = 0;
    for (let i = 0, l = vertices.length; i < l; i++) {
      let addX = vertices[i].x;
      let addY = vertices[i === vertices.length - 1 ? 0 : i + 1].y;
      let subX = vertices[i === vertices.length - 1 ? 0 : i + 1].x;
      let subY = vertices[i].y;
      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }
    return Math.abs(total);
  }

  private circle2Polygon(center: any, r: number) {
    const coordinates = [center.lng, center.lat]; //[lon, lat]
    const numberOfEdges = 16;                     //optional that defaults to 32
    return circleToPolygon(coordinates, r, numberOfEdges);
  }
}

module.exports = Geoloc;
