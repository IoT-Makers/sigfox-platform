import {Model} from "@mean-expert/model";

const loopback = require("loopback");
const Client = require("strong-pubsub");
const Adapter = require("strong-pubsub-mqtt");

/**
 * @module Geoloc
 * @description
 * Write a useful Geoloc Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: { },
  remotes: {
    createFromParsedPayload: {
      returns : { arg: "result", type: "array" },
      http    : { path: "/from-payload", verb: "post" },
      accepts: [
        {arg: "message", type: "Message", required: true, description: "The message object"},
      ],
    },
    postSigfox: {
      accepts: [
        {arg: "req", type: "object", http: {source: "req"}},
        {arg: "data", type: "object", required: true, http: { source: "body" }},
      ],
      http: {
        path: "/sigfox",
        verb: "post",
      },
      returns: {type: "Geoloc", root: true},
    },
  },
})

class Geoloc {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  public getHereGeolocation(geoloc_wifi: any): Promise<boolean> {
    const wlans: any = {
      wlan: [],
    };
    geoloc_wifi.wifiAccessPoints.forEach((wifiAccessPoint: any) => {
      if (wifiAccessPoint.signalStrength) {
        wlans.wlan.push({mac: wifiAccessPoint.macAddress, powrx: wifiAccessPoint.signalStrength});
      } else {
        wlans.wlan.push({mac: wifiAccessPoint.macAddress});
      }
    });

    return new Promise((resolve: any, reject: any) => {
      this.model.app.dataSources.here.locate(process.env.HERE_APP_ID, process.env.HERE_APP_CODE, wlans).then((result: any) => {
        // console.error('---------------------------------------------------------------------\n', result);
        geoloc_wifi.source = "here";
        geoloc_wifi.type = "wifi";
        geoloc_wifi.location.lat = result.location.lat;
        geoloc_wifi.location.lng = result.location.lng;
        geoloc_wifi.accuracy = result.location.accuracy;

        this.createGeoloc(geoloc_wifi);
        resolve(true);
      }).catch((err: any) => {
        // console.error(err);
        reject(false);
      });
    });
  }

  public getGoogleGeolocation(geoloc_wifi: any): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
      this.model.app.dataSources.google.locate(process.env.GOOGLE_API_KEY, {considerIp: false, wifiAccessPoints: geoloc_wifi.wifiAccessPoints}).then((result: any) => {
        // console.error('---------------------------------------------------------------------\n', result);
        geoloc_wifi.source = "google";
        geoloc_wifi.type = "wifi";
        geoloc_wifi.location.lat = result.location.lat;
        geoloc_wifi.location.lng = result.location.lng;
        geoloc_wifi.accuracy = result.accuracy;

        this.createGeoloc(geoloc_wifi);
        resolve(true);
      }).catch((err: any) => {
        // console.error(err);
        reject(false);
      });
    });
  }

  public postSigfox(req: any, data: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    const Message = this.model.app.models.Message;
    const Alert = this.model.app.models.Alert;

    // Auto set uppercase for deviceId
    data.deviceId = data.deviceId.toUpperCase();

    if (typeof data.geoloc === "undefined"
      || typeof data.geoloc.location === "undefined"
      || typeof data.deviceId === "undefined"
      || typeof data.time === "undefined"
      || typeof data.seqNumber === "undefined") {
      return next('Missing "geoloc", "deviceId", "time" and "seqNumber"', data);
    }
    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Find the corresponding message in order to retrieve its message ID
    Message.findOne({
      where: {
        and: [
          {userId},
          {deviceId: data.deviceId},
          {time: data.time},
          {seqNumber: data.seqNumber},
        ],
      },
    }, (err: any, messageInstance: any) => {
      if (err) {
        console.error(err);
        next(err, data);
      } else {
        if (messageInstance) {
          console.log("Found the corresponding message.");
          // Build the Geoloc object
          const geoloc = new Geoloc;
          geoloc.type = "sigfox";
          geoloc.location = new loopback.GeoPoint(data.geoloc.location);
          // TODO: below is retro-compatibility
          if (data.geoloc.accuracy) {
            geoloc.accuracy = data.geoloc.accuracy;
          } else {
            geoloc.accuracy = data.geoloc.precision;
          }
          geoloc.createdAt = messageInstance.createdAt;
          geoloc.userId = userId;
          geoloc.messageId = messageInstance.id;
          geoloc.deviceId = messageInstance.deviceId;

          // Trigger alerts (if any)
          Alert.triggerBySigfoxGeoloc(
            geoloc.location.lat,
            geoloc.location.lng,
            geoloc.deviceId,
            req,
            (err: any, res: any) => {
              if (err) {
                next(err, null);
              } else {
                // console.log(res);
              }
            });

          // Creating a new Geoloc
          Geoloc.findOrCreate(
            {where: {
                and: [
                  {location: geoloc.location},
                  {type: geoloc.type},
                  {createdAt: geoloc.createdAt},
                  {userId: geoloc.userId},
                  {messageId: geoloc.messageId},
                  {deviceId: geoloc.deviceId},
                ],
              },
            }, // find
            geoloc, // create
            (err: any, geolocInstance: any, created: boolean) => { // callback
              if (err) {
                console.error(err);
                next(err, geolocInstance);
              } else if (created) {
                console.log("Created geoloc as: ", geolocInstance);
                // Update device in order to trigger a real time upsert event
                this.updateDeviceLocatedAt(geolocInstance.deviceId);
                next(null, geolocInstance);
              } else {
                next(null, "This geoloc for device (" + geoloc.deviceId + ") has already been created.");
              }
            });
        } else {
          const err = "No corresponding message found, check if UPLINK or BIDIR callbacks have been set too (on the Sigfox Backend)!";
          /**
           * TODO: Check below - OOB frame device acknowledge ?
           */
            // Saving a message anyway
          const message = new Message;

          message.userId = userId;
          message.deviceId = data.deviceId;
          message.time = data.time;
          message.seqNumber = data.seqNumber;
          message.createdAt = new Date(data.time * 1000);
          message.deviceAck = true;

          Message.findOrCreate(
            {where: {
                and: [
                  {deviceId: message.deviceId},
                  {time: message.time},
                  {seqNumber: message.seqNumber},
                ],
              },
            }, // find
            message, // create
            (err: any, messageInstance: any, created: boolean) => { // callback
              if (err) {
                console.error(err);
                next(err, messageInstance);
              } else if (created) {
                console.log("Created message as: ", messageInstance);
                // Update device in order to trigger a real time upsert event
                this.updateDeviceLocatedAt(messageInstance.deviceId);
              } else {
                next(null, "This message for device (" + message.deviceId + ") has already been created.");
              }
            });
          next(err, null);
        }
      }
    });
  }

  public updateDeviceLocatedAt(deviceId: string) {
    // Models
    const Device = this.model.app.models.Device;

    Device.findOne({
      where: {
        id: deviceId,
      },
    }, (err: any, deviceInstance: any) => {
      if (err) {
        console.error(err);
      } else {
        if (deviceInstance) {
          deviceInstance.locatedAt = new Date();
          Device.upsert(deviceInstance, (err: any, deviceUpdated: any) => {
            if (!err) {
              console.log("Updated device locatedAt date");
            }
          });
        }
      }
    });
  }

  public createGeoloc(geoloc: any) {
    const Geoloc = this.model;
    Geoloc.create(
      geoloc,
      (err: any, geolocInstance: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Created geoloc as: ", geolocInstance);
          // Update device in order to trigger a real time upsert event
          this.updateDeviceLocatedAt(geolocInstance.deviceId);
        }
      });
  }

  public postAlexaDeviceLocation(req: any, body: any, next: Function): void {
    // Models
    const Geoloc = this.model;
    console.log(body);
  }

  public afterSave(ctx: any, next: Function): void {
    if (process.env.MQTT_HOST && process.env.MQTT_PORT) {
      const client = new Client({host: process.env.MQTT_HOST, port: process.env.MQTT_PORT}, Adapter);
      try {
        client.publish(ctx.instance.deviceId + "/geoloc", ctx.instance, {retain: true});
      } catch (e) {
        console.log(e);
      }
    }
    next();
  }

  private createFromParsedPayload(message: any, req: any): void {
    // Models
    const Geoloc = this.model;
    const Beacon = this.model.app.models.Beacon;

    if (typeof message === "undefined") {
      return console.error('Missing "message"', message);
    } else if (typeof message.data_parsed === "undefined") {
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
      if (p.value !== null && typeof p.value !== "undefined") {
        // Check if there is GPS geoloc in parsed data
        if (p.key === "lat" && p.value >= -90 && p.value <= 90) {
          hasGpsLocation = true;
          geoloc_gps.location.lat = p.value;
        } else if (p.key === "lng" && p.value >= -180 && p.value <= 180) {
          geoloc_gps.location.lng = p.value;
        } else if (p.key === "beaconId") {
          hasBeaconLocation = true;
          geoloc_beacon.id = p.value.toString().toUpperCase();
        } else if (p.key === "accuracy" || p.key === "precision") {
          geoloc_beacon.accuracy = p.value;
          geoloc_wifi.accuracy = p.value;
        } else if (p.key.includes("wlan_")) {
          hasWifiLocation = true;
          if (p.unit && p.unit !== "") {
            geoloc_wifi.wifiAccessPoints.push({macAddress: p.value.toString(), signalStrength: Number(p.unit)});
          } else {
            geoloc_wifi.wifiAccessPoints.push({macAddress: p.value.toString()});
          }
        }
      }
    });

    if (hasGpsLocation) {
      geoloc_gps.type = "gps";
      this.createGeoloc(geoloc_gps);
    }

    if (hasBeaconLocation) {
      geoloc_beacon.type = "beacon";
      Beacon.findOne({where: {id: geoloc_beacon.id}}, (err: any, beacon: any) => {
        if (err) {
          console.error(err);
        } else if (beacon) {
          geoloc_beacon.id = null;
          geoloc_beacon.location.lat = beacon.location.lat;
          geoloc_beacon.location.lng = beacon.location.lng;
          geoloc_beacon.level = beacon.level;
          this.createGeoloc(geoloc_beacon);
        }
      });
    }

    if (hasWifiLocation) {
      if (process.env.HERE_APP_ID && process.env.HERE_APP_CODE && !process.env.GOOGLE_API_KEY) {
        this.getHereGeolocation(geoloc_wifi).then((value) => {
          console.log("[WiFi Geolocation] - Device located successfully with Here.");
        }).catch((reason) => {
          console.log("[WiFi Geolocation] - Could not locate device with Here.");
        });
      } else if ((!process.env.HERE_APP_ID || !process.env.HERE_APP_CODE) && process.env.GOOGLE_API_KEY) {
        this.getGoogleGeolocation(geoloc_wifi).then((value) => {
          console.log("[WiFi Geolocation] - Device located successfully with Google.");
        }).catch((reason) => {
          console.log("[WiFi Geolocation] - Could not locate device with Google.");
        });
      } else if (process.env.HERE_APP_ID && process.env.HERE_APP_CODE && process.env.GOOGLE_API_KEY) {
        this.getHereGeolocation(geoloc_wifi).then((value) => {
          console.log("[WiFi Geolocation] - Device located successfully with Here.");
        }).catch((reason) => {
          console.log("[WiFi Geolocation] - Could not locate device with Here => falling back on Google.");
          this.getGoogleGeolocation(geoloc_wifi).then((value) => {
            console.log("[WiFi Geolocation] - Device located successfully with Google.");
          }).catch((reason) => {
            console.log("[WiFi Geolocation] - Could not locate device with Google.");
          });
        });
      } else {
        console.error("[WiFi Geolocation] - Trying to position with WiFi but no service provider has been set - check your environment variables!");
      }
    }
  }
}

module.exports = Geoloc;
