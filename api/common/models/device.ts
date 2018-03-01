import {Model} from '@mean-expert/model';
import * as _ from 'lodash';

const moment = require('moment');
const request = require('request');

/**
 * @module Device
 * @description
 * Write a useful Device Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'}/*,
    access: {name: 'access', type: 'operation'}*/
  },
  remotes: {
    timeSeries: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'the deviceId'},
        {
          arg: 'dateBegin',
          type: 'string',
          default: moment().subtract(1, 'hours'),
          description: 'the starting date-time'
        },
        {arg: 'dateEnd', type: 'string', default: moment(), description: 'the ending date-time'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      returns: {arg: 'result', type: 'array'},
      http: {path: '/time-series', verb: 'get'}
    },
    deleteDeviceMessagesAlerts: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/Messages',
        verb: 'delete'
      },
      returns: {root: true}
    },
    getMessagesFromSigfoxBackend: {
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Device Id'},
        {arg: 'limit', type: 'number', required: false, description: 'Limit retrieved messages (max 100)'},
        {arg: 'before', type: 'number', description: 'Before'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/:id/messages-from-sigfox-backend',
        verb: 'get'
      },
      returns: {type: [], root: true}
    },
    parseAllMessages: {
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Device Id'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/:id/parse-messages',
        verb: 'put'
      },
      returns: {type: [], root: true}
    }
  }
})

class Device {

  private sigfoxBackendBaseApiUrl = 'https://backend.sigfox.com/api/';

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  deleteDeviceMessagesAlerts(deviceId: string, req: any, next: Function): void {
    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;
    // Find device
    this.model.findOne(
      {
        where: {
          and: [
            {id: deviceId},
            {userId: userId}
          ]
        }
      }, (err: any, deviceInstance: any) => {
        if (err || !deviceInstance) {
          console.error('Device not found for suppression.');
          next(err, 'Device not found for suppression.');
        } else if (deviceInstance) {
          console.log('Deleting device ' + deviceId + ' and all its corresponding messages.');

          // Delete messages
          this.model.app.models.Message.destroyAll({deviceId: deviceId}, (err: any, result: any) => {
            if (!err) {
              // Delete alerts
              this.model.app.models.Alert.destroyAll({deviceId: deviceId}, (err: any, result: any) => {
                if (!err) {
                  // Delete device
                  this.model.destroyById(deviceId, (error: any, result: any) => {
                    next(null, result);
                  });
                } else {
                  next(err, 'Error for alerts suppression with device ID ' + deviceId);
                }
              });
            } else {
              next(err, 'Error for messages suppression with device ID ' + deviceId);
            }
          });
        }
      });
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Device: Before Save');
    next();
  }


  timeSeries(deviceId: string, dateBegin: string, dateEnd: string, req: any, next: Function): void {
    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;

    const result: any = {
      xAxis: [],
      yAxis: []
    };

    let messages: any;

    const arrayOfObject: Array<any> = [];

    this.model.app.models.Device.findById(
      deviceId,
      {
        include: [
          {
            relation: 'Messages',
            scope: {
              // fields: ['data_parsed'],
              where: {
                and: [
                  {userId: userId},
                  {createdAt: {gte: dateBegin}},
                  {createdAt: {lte: dateEnd}},
                  {data_parsed: {neq: null}}
                ]
              },
              order: 'createdAt ASC'
            }
          }]
      },
      (err: any, device: any) => {
        if (err || !device) {
          console.log(err);
        } else {
          // console.log("device:", device);
          device = device.toJSON();

          messages = device.Messages;
          // console.log("messages", messages.length);

          messages.forEach((message: any, messageIndex: number) => {
            if (message.data_parsed) {
              result.xAxis.push(message.createdAt);
              message.data_parsed.forEach((data: any, dataIndex: number) => {
                data.timestamp = message.createdAt;
                arrayOfObject.push(data);

                // console.log(data.key);
              });
            }
          });

          result.yAxis = _.groupBy(arrayOfObject, 'key');
          // groupByKey = _.groupBy(arrayOfObject, "key");
          // console.log(groupByKey);

          // for (var key in groupByKey) {
          //   let obj: any;
          //   obj = {
          //     label: "",
          //     data: []
          //   };
          //   let info: any;
          //   info = {
          //     property: "",
          //     type: "",
          //     unit: ""
          //   };
          //   // check also if property is not inherited from prototype
          //   if (groupByKey.hasOwnProperty(key)) {
          //     obj.label = key;
          //     info.property = key;
          //     groupByKey[key].forEach((item: any) => {
          //       obj.data.push(item.value);
          //       info.type = item.type;
          //       info.unit = item.unit;
          //     });
          //
          //     result.yAxis.push(obj);
          //     result.info.push(info);
          //   }
          // }


          // result.yAxis = _.groupBy(result.yAxis, "key");


        }
        next(err, result);
      });
  }

  getMessagesFromSigfoxBackend(deviceId: string, limit: number, before: number, req: any, next: Function): void {
    const userId = req.accessToken.userId;

    if (!limit) {
      limit = 100;
    }

    this.model.app.models.Connector.findOne(
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
            const sigfoxApiPassword = connector.password;


            // let messages: any[] = [];
            let message: any;
            let reception: any[] = [];
            let geoloc: any[] = [];

            const credentials = new Buffer(sigfoxApiLogin + ':' + sigfoxApiPassword).toString('base64');

            this.model.app.dataSources.sigfox.getMessages(
              credentials,
              deviceId,
              (limit < 100) ? limit : 100,
              before ? before : new Date()
            ).then((result: any) => {
              // console.log("Length: ", result.data.length);
              // console.log("Next: ", result.paging.next);
              result.data.forEach((messageInstance: any) => {

                reception = [];
                messageInstance.rinfos.forEach((o: any) => {
                  const rinfo: any = {
                    id: o.tap,
                    lat: o.lat,
                    lng: o.lng,
                    RSSI: o.rssi,
                    SNR: o.snr
                  };
                  reception.push(rinfo);
                });
                if (messageInstance.computedLocation) {
                  geoloc = [{
                    type: 'sigfox',
                    lat: messageInstance.computedLocation.lat,
                    lng: messageInstance.computedLocation.lng,
                    precision: messageInstance.computedLocation.radius,
                    createdAt: new Date(messageInstance.time * 1000)
                  }];
                }

                message = {
                  userId: userId,
                  deviceId: messageInstance.device,
                  time: messageInstance.time,
                  seqNumber: messageInstance.seqNumber,
                  data: messageInstance.data,
                  reception: reception,
                  geoloc: geoloc,
                  createdAt: new Date(messageInstance.time * 1000),
                  updatedAt: new Date(messageInstance.time * 1000),
                };
                this.model.app.models.Message.findOrCreate(
                  {
                    where: {
                      and: [
                        {deviceId: message.deviceId},
                        {time: message.time},
                        {seqNumber: message.seqNumber}
                      ]
                    }
                  },
                  message,
                  (err: any, messagePostProcess: any, created: boolean) => { // callback
                    if (err) {
                      console.log(err);
                      // next(err, err);
                    } else {
                      if (created) {
                        console.log('Created new message.');
                      } else {
                        console.log('Found an existing message: ');
                      }
                    }
                  });

                message = {};

              });

              next(null, result);
            }).catch((err: any) => {
              if (err.statusCode === '403')
                next(err, 'Your Sigfox API credentials are not allowed to do so.');
              else
                next(err, null);
            });

          } else {
            next(err, 'Please refer your Sigfox API connector first.');
          }
        }
      });
  }

  parseAllMessages(deviceId: string, req: any, next: Function): void {
    const userId = req.accessToken.userId;

    const Device = this.model.app.models.Device;
    const Parser = this.model.app.models.Parser;
    const Message = this.model.app.models.Message;

    const response: any = {};

    if (!userId) {
      response.message = 'Please login or use a valid access token.';
      next(null, response);
    }

    Device.findById(deviceId, {include: 'Messages'}, function (err: any, device: any) {

      if (err) {
        next(err, null);
      } else {
        device = device.toJSON();
        // console.log(device);
        if (!device.ParserId && !device.parserId) {
          response.message = 'No parser associated to this device.';
          next(null, response);
        } else {
          // console.log(device.Messages);
          Parser.findById(
            device.parserId,
            (err: any, parserInstance: any) => {
              if (err) {
                console.log(err);
                next(err, null);
              } else if (parserInstance) {
                const fn = Function('payload', parserInstance.function);

                if (device.Messages) {
                  device.Messages.forEach((message: any, msgCount: number) => {
                    if (message.data) {
                      Parser.parsePayload(fn, message.data, req, function (err: any, data_parsed: any) {
                        if (err) {
                          next(err, null);
                        } else {
                          // console.log(data_parsed);
                          const geoloc: any = {};
                          if (data_parsed) {

                            message.data_parsed = data_parsed;
                            message.data_parsed.forEach((o: any) => {
                              // Check if there is geoloc in parsed data
                              if (o.key === 'geoloc')
                                geoloc.type = o.value;
                              else if (o.key === 'lat')
                                geoloc.lat = o.value;
                              else if (o.key === 'lng')
                                geoloc.lng = o.value;
                              else if (o.key === 'precision')
                                geoloc.precision = o.value;
                            });
                            if (geoloc.type) {
                              let addGeoloc = true;
                              if (!message.geoloc) message.geoloc = [];
                              else {
                                message.geoloc.forEach((geo: any) => {
                                  if (geo.type === geoloc.type) addGeoloc = false;
                                });

                                if (addGeoloc) message.geoloc.push(geoloc);
                              }

                            }
                            Message.upsert(message, function (err: any, messageUpdated: any) {
                              // console.log(messageUpdated);
                            });
                          }
                        }
                      });
                    }
                    // Send the result when all messages have been processed and store last data_parsed in device
                    if (msgCount === device.Messages.length) {
                      // Update the device
                      device.data_parsed = device.Messages[0].data_parsed;
                      Device.upsert(device, function (err: any, deviceUpdated: any) {
                        // console.log(deviceUpdated);
                      });
                      // Send the response
                      response.message = 'Success';
                      next(null, response);
                    }
                  });
                } else {
                  response.message = 'This device has no messages.';
                  next(null, response);
                }
              } else {
                response.message = 'This device has no parser.';
                next(null, response);
              }
            });
        }
      }
    });
  }
}

module.exports = Device;
