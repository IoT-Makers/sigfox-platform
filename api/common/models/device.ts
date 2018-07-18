import {Model} from '@mean-expert/model';
import * as _ from 'lodash';
import {decrypt} from './utils';

const moment = require('moment');
const loopback = require('loopback');
const json2csv = require('json2csv').parse;


/**
 * @module Device
 * @description
 * Write a useful Device Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'},
    beforeDelete: { name: 'before delete', type: 'operation' },
    afterRemoteLinkOrganizations: {name: 'prototype.__link__Organizations', type: 'afterRemote'},
    afterRemoteUnlinkOrganizations: {name: 'prototype.__unlink__Organizations', type: 'afterRemote'}
  },
  remotes: {
    download: {
      accepts: [
        {arg: 'id', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'type', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}}
      ],
      http: {
        path: '/download/:id/:type',
        verb: 'get'
      },
      returns: {type: 'object', root: true}
    },
    timeSeries: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'Device Id'},
        {
          arg: 'dateBegin',
          type: 'string',
          default: moment().subtract(1, 'hours'),
          description: 'The starting date-time'
        },
        {arg: 'dateEnd', type: 'string', default: moment(), description: 'The ending date-time'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      returns: {arg: 'result', type: 'array'},
      http: {path: '/time-series', verb: 'get'}
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
    }
  }
})

class Device {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    if (ctx.data && ctx.data.id) {
      console.log('Device: Before Save: ' + ctx.data.id);
      ctx.data.id = ctx.data.id.toUpperCase();
    } else if (ctx.instance && ctx.instance.id) {
      console.log('Device: Before Save: ' + ctx.instance.id);
      ctx.instance.id = ctx.instance.id.toUpperCase();
    }
    next();
  }


  afterRemoteLinkOrganizations(ctx: any, data: any, next: Function): void {
    const Message = this.model.app.models.Message;
    const Organization = this.model.app.models.Organization;

    //console.log(Organization.prototype.__link__Messages);
    //console.log(ctx);
    Message.find({where: {deviceId: data.deviceId}, fields: {'id': true}}, (err: any, messages: any) => {
      if (!err) {
        //console.log(messages);
        Organization.findById(data.organizationId, (err: any, orga: any) => {
          if (!err) {
            console.log(orga);
            messages.forEach((message: any) => {
              orga.Messages.add(message.id, (err: any, result: any) => {
                console.log(result);
              });
            });
          } else {
            next(err);
          }
        });
      } else {
        next(err);
      }

    });
    next();
    //console.log(ctx);
  }

  afterRemoteUnlinkOrganizations(ctx: any, data: any, next: Function): void {
    const Message = this.model.app.models.Message;
    const Organization = this.model.app.models.Organization;

    //console.log(Organization.prototype.__link__Messages);
    Message.find({where: {deviceId: ctx.instance.id}, fields: {id: true}}, (err: any, messages: any) => {
      if (!err) {
        //console.log(messages);
        Organization.findById(ctx.args.fk, (err: any, orga: any) => {
          //console.log(orga);
          if (!err) {
            messages.forEach((message: any) => {
              /**
               * TODO: check if its not better to use: orga.Messages.remove(message, function...)
               */
              orga.Messages.remove(message.id, (err: any, result: any) => {
                //console.log(result);
              });
            });
          } else {
            next(err);
          }
        });
      } else {
        next(err);
      }
    });
    next();
    //console.log(ctx);
  }

  timeSeries(deviceId: string, dateBegin: string, dateEnd: string, req: any, next: Function): void {
    // Obtain the userId with the access token of ctx
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
    // Models
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;
    const Connector = this.model.app.models.Connector;

    const userId = req.accessToken.userId;

    if (!limit) {
      limit = 100;
    }

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


            // let messages: any[] = [];
            let message: any;
            let reception: any[] = [];

            const credentials = new Buffer(sigfoxApiLogin + ':' + sigfoxApiPassword).toString('base64');

            this.model.app.dataSources.sigfox.getMessages(
              credentials,
              deviceId,
              (limit < 100) ? limit : 100,
              before ? before : new Date()
            ).then((result: any) => {
              // console.log("Length: ", result.data.length);
              // console.log("Next: ", result.paging.next);
              result.data.forEach((messageInstance: any, msgCounter: number) => {
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

                message = {
                  userId: userId,
                  deviceId: messageInstance.device,
                  time: messageInstance.time,
                  seqNumber: messageInstance.seqNumber,
                  data: messageInstance.data,
                  reception: reception,
                  createdAt: new Date(messageInstance.time * 1000),
                  updatedAt: new Date(messageInstance.time * 1000),
                };
                Message.findOrCreate(
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
                        console.log('Found an existing message.');
                      }

                      if (messageInstance.computedLocation) {
                        // Build the Geoloc object
                        const geoloc = new Geoloc;
                        geoloc.type = 'sigfox';
                        geoloc.location = new loopback.GeoPoint({lat: messageInstance.computedLocation.lat, lng: messageInstance.computedLocation.lng});
                        geoloc.accuracy = messageInstance.computedLocation.radius;
                        geoloc.createdAt = messagePostProcess.createdAt;
                        geoloc.userId = messagePostProcess.userId;
                        geoloc.messageId = messagePostProcess.id;
                        geoloc.deviceId = messagePostProcess.deviceId;
                        // Find or create a new Geoloc
                        Geoloc.findOrCreate(
                          {
                            where: {
                              and: [
                                {type: geoloc.type},
                                {location: geoloc.location},
                                {createdAt: geoloc.createdAt},
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
                              } else {
                                console.log('Skipped geoloc creation.');
                              }
                            }
                          });
                      }
                    }
                  });

                // Done
                if (msgCounter === result.data.length - 1) {
                  this.updateDeviceSuccessRate(messageInstance.device);
                  next(null, result);
                }
              });
            }).catch((err: any) => {
              if (err.statusCode === '403') {
                next(err, 'Your Sigfox API credentials are not allowed to do so.');
              } else {
                next(err, null);
              }
            });

          } else {
            next(err, 'Please refer your Sigfox API connector first.');
          }
        }
      });
  }

  updateDeviceSuccessRate(deviceId: string) {
    // Model
    const Device = this.model;
    Device.findOne(
      {
        where: {id: deviceId},
        limit: 1,
        include: [{
          relation: 'Messages',
          scope: {
            order: 'createdAt DESC',
            limit: 100
          }
        }]
      },
      function (err: any, device: any) {
        if (err) {
          console.error(err);
        } else {
          device = device.toJSON();
          let attendedNbMessages: number;
          attendedNbMessages = device.Messages[0].seqNumber - device.Messages[device.Messages.length - 1].seqNumber + 1;
          if (device.Messages[device.Messages.length - 1].seqNumber > device.Messages[0].seqNumber) {
            attendedNbMessages += 4095;
          }
          device.successRate = (((device.Messages.length / attendedNbMessages) * 100)).toFixed(2);

          Device.upsert(
            device,
            function (err: any, deviceUpdated: any) {
              if (err) {
                console.error(err);
              } else {
                console.log('Updated device as: ' + deviceUpdated);
              }
            });
        }
      });
  }

  download(deviceId: string, type: string, req: any, res: any, next: Function): void {
    // Model
    const Message = this.model.app.models.Message;

    if ((type !== 'csv'
      && type !== 'json')
      || typeof deviceId === 'undefined') {
      res.send('Missing "type" ("csv" or "json"), "deviceId"');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    const today = moment().format('YYYY.MM.DD');
    const filename = today + '_' + deviceId + '_export.csv';
    res.setTimeout(600000);
    res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
    res.set('Content-Type', 'application/force-download');
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Type', 'application/download');
    res.set('Content-Disposition', 'attachment;filename=' + filename);
    res.set('Content-Transfer-Encoding', 'binary');

    Message.find(
      {
        where: {
          and: [
            //{userId: userId},
            {deviceId: deviceId}
          ]
        },
        include: ['Geolocs'],
        order: 'createdAt DESC'
      }, function (err: any, messages: any) {
        if (err) {
          console.error(err);
          res.send(err);
        } else if (messages) {
          const data: any = [];
          let csv: any = [];
          const options: any = {
            fields: []
          };
          options.fields.push('seqNumber');
          options.fields.push('createdAt');
          options.fields.push('year');
          options.fields.push('month');
          options.fields.push('day');
          options.fields.push('hours');
          options.fields.push('minutes');
          options.fields.push('seconds');
          options.fields.push('data');
          options.fields.push('ack');
          options.fields.push('data_downlink');

          messages.forEach((message: any) => {
            message = message.toJSON();
            const obj: any = {};
            const date = new Date(message.createdAt);

            obj.seqNumber = message.seqNumber;
            obj.createdAt = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss');
            obj.year = date.getFullYear();
            obj.month = date.getMonth() + 1;
            obj.day = date.getDate();
            obj.hours = date.getHours();
            obj.minutes = date.getMinutes();
            obj.seconds = date.getSeconds();
            obj.data = message.data;
            obj.ack = message.ack;
            obj.data_downlink = message.data_downlink;

            if (message.data_parsed) {
              message.data_parsed.forEach((p: any) => {
                if (options.fields.indexOf(p.key) === -1) {
                  options.fields.push(p.key);
                }
                obj[p.key] = p.value;
              });
            }
            if (message.Geolocs) {
              message.Geolocs.forEach((geoloc: any) => {
                if (options.fields.indexOf('lat_' + geoloc.type) === -1) {
                  options.fields.push('lat_' + geoloc.type);
                  options.fields.push('lng_' + geoloc.type);
                  options.fields.push('accuracy_' + geoloc.type);
                }
                obj['lat_' + geoloc.type] = geoloc.location.lat;
                obj['lng_' + geoloc.type] = geoloc.location.lng;
                obj['accuracy_' + geoloc.type] = geoloc.accuracy;
              });
            }
            data.push(obj);
          });
          if (data.length > 0) {
            try {
              csv = json2csv(data, options);
              console.log('Done CSV processing.');
            } catch (err) {
              console.error(err);
            }
          }
          //res.status(200).send({data: csv});
          res.send(csv);
          //next();
        } else {
          next(null, 'Error occured - not allowed');
        }
      });
  }

  // Before delete device, remove category organizaton links
  beforeDelete(ctx: any, next: Function): void {
    // Models
    const Device = this.model;
    const Geoloc = this.model.app.models.Geoloc;
    const Message = this.model.app.models.Message;
    const Alert = this.model.app.models.Alert;

    const deviceId = ctx.where.id;

    if (deviceId) {
      Device.findOne({where: {id: deviceId}, include: 'Organizations'}, (err: any, device: any) => {
        // console.log(category);
        if (err) {
          next(err, null);
        } else {
          if (device && device.Organizations) {
            device.toJSON().Organizations.forEach((orga: any) => {
              device.Organizations.remove(orga.id, (err: any, result: any) => {
                if (!err) {
                  console.log('Unlinked device from organization (' + orga.name + ')');
                }
              });
            });
          }
          console.log('Unlinked device from organization');
        }
      });

      Message.destroyAll({deviceId: deviceId}, (error: any, result: any) => { if (!error) console.log('Deleted all messages for device: ' + deviceId); });
      Geoloc.destroyAll({deviceId: deviceId}, (error: any, result: any) => { if (!error) console.log('Deleted all geolocs for device: ' + deviceId); });
      Alert.destroyAll({deviceId: deviceId}, (error: any, result: any) => { if (!error) console.log('Deleted all alerts for device: ' + deviceId); });
    }

    next();
  }
}

module.exports = Device;
