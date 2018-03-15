import {Model} from '@mean-expert/model';

const json2csv = require('json2csv').parse;
const loopback = require('loopback');
const moment = require('moment');

/**
 * @module Message
 * @description
 * Write a useful Message Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    download: {
      accepts: [
        {arg: 'deviceId', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'type', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}}
      ],
      http: {
        path: '/download/:deviceId/:type',
        verb: 'get'
      },
      returns: {type: 'object', root: true}
    },
    putSigfox: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: { source: 'body' }}
      ],
      http: {
        path: '/sigfox/v2',
        verb: 'put'
      },
      returns: {type: 'Message', root: true}
    }
  }
})

class Message {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) { }

  putSigfox(req: any, data: any, next: Function): void {
    if (typeof data.deviceId  === 'undefined'
      || typeof data.time  === 'undefined'
      || typeof data.seqNumber === 'undefined') {
      next('Missing "deviceId", "time" and "seqNumber"', data);
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Create a new message object
    let message = new this.model;
    message = data;

    // Store the userId in the message
    message.userId = userId;

    // Set the createdAt time
    message.createdAt = new Date(message.time * 1000);

    // Create a new device object
    const device = new this.model.app.models.Device;
    device.id = message.deviceId;
    device.userId = userId;
    if (message.deviceNamePrefix)
      device.name = message.deviceNamePrefix + '_' + message.deviceId;
    if (message.parserId)
      device.parserId = message.parserId;
    if (message.categoryId)
      device.categoryId = message.categoryId;
    if (message.data_downlink)
      device.data_downlink = message.data_downlink;

    // Store the message duplicate flag and parserId
    const duplicate = message.duplicate;
    const parserId = message.parserId;

    // Sanitize message to be saved - get rid of useless information
    delete message.duplicate;
    delete message.deviceNamePrefix;
    delete message.parserId;
    delete message.categoryId;
    delete message.data_downlink;

    // Check if the device exists or create it
    this.model.app.models.Device.findOrCreate(
      {where: {id: message.deviceId}, include: ['Alerts', 'Parser']}, // find
      device, // create
      (err: any, deviceInstance: any, created: boolean) => { // callback
        if (err) {
          console.error('Error creating device.', err);
          next(err, data);
        } else {
          deviceInstance = deviceInstance.toJSON();
          if (created) console.log('Created new device.');
          else console.log('Found an existing device.');

          // If message is a duplicate
          if (duplicate) {
            this.model.findOne({
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
                  console.log('Found the corresponding message and storing reception in it.');
                  messageInstance.reception.push(data.reception[0]);
                  this.model.upsert(
                    messageInstance,
                    (err: any, messageInstance: any) => {
                      if (err) {
                        console.error(err);
                        next(err, messageInstance);
                      } else {
                        console.log('Updated message as: ', messageInstance);
                        next(null, messageInstance);
                      }
                    });

                } else {
                  // No corresponding message found
                  const err = 'Error - No corresponding message found, did you first receive a message containing duplicate = false?';
                  console.error(err);
                  next(err, data);
                }
              }
            });
          } // if(duplicate)

          // Parse message, create message, send result to backend with downlink payload or not if the data is not null and a parser is set
          else {
            if ((deviceInstance.Parser || parserId) && message.data) {
              // If the device is not linked to a parser
              if (!deviceInstance.Parser && parserId) {
                deviceInstance.parserId = parserId;
                // Save a parser in the device and parse the message
                console.log('Associating parser to device.');
                this.model.app.models.Device.upsert(
                  deviceInstance, (err: any, deviceInstance: any) => {
                    if (err) {
                      console.error(err);
                      next(err, data);
                    } else {
                      this.model.app.models.Device.findOne({
                        where: {id: deviceInstance.id},
                        include: ['Alerts', 'Parser']
                      }, (err: any, deviceInstance: any) => {
                        if (err) {
                          console.error(err);
                          next(err, data);
                        } else {
                          deviceInstance = deviceInstance.toJSON();
                          console.log('Updated device as: ', deviceInstance);

                          // Decode the payload
                          this.model.app.models.Parser.parsePayload(
                            Function('payload', deviceInstance.Parser.function),
                            message.data,
                            req,
                            function (err: any, data_parsed: any) {
                              if (err) {
                                next(err, null);
                              } else {
                                message.data_parsed = data_parsed;
                              }
                            });

                          // Trigger alerts (if any)
                          this.model.app.models.Alert.triggerByDevice(
                            message.data_parsed,
                            deviceInstance,
                            req,
                            function (err: any, res: any) {
                              if (err) {
                                next(err, null);
                              } else {
                                console.log(res);
                              }
                            });

                          // Create message
                          this.createMessageAndSendResponse(message, next);
                        }
                      });
                    }
                  });
              } else {
                console.warn('Found parser!');

                // Decode the payload
                this.model.app.models.Parser.parsePayload(
                  Function('payload', deviceInstance.Parser.function),
                  message.data,
                  req,
                  function (err: any, data_parsed: any) {
                    if (err) {
                      next(err, null);
                    } else {
                      message.data_parsed = data_parsed;
                    }
                  });

                // Trigger alerts (if any)
                this.model.app.models.Alert.triggerByDevice(
                  message.data_parsed,
                  deviceInstance,
                  req,
                  function (err: any, res: any) {
                    if (err) {
                      next(err, null);
                    } else {
                      console.log(res);
                    }
                  });

                // Create message
                this.createMessageAndSendResponse(message, next);
              }
            } else { // No parser & no data
              // Create message
              this.createMessageAndSendResponse(message, next);
            }
          }
        }
      });
  }

  createMessageAndSendResponse(message: any, next: Function) {
    // Models
    const thisMessage = this;
    const Message = this.model;
    const Device = this.model.app.models.Device;
    const Geoloc = this.model.app.models.Geoloc;

    // Ack from BIDIR callback
    if (message.ack) {
      let result;
      Device.findOne({where: {id: message.deviceId}}, function (err: any, device: any) {
        if (device.data_downlink) {
          message.data_downlink = device.data_downlink;
          result = {
            [message.deviceId]: {
              data_downlink: device.data_downlink
            }
          };
        } else {
          result = {
            [message.deviceId]: {
              noData: true
            }
          };
        }
        // Creating new message with its downlink data
        Message.create(
          message,
          (err: any, messageInstance: any) => {
            if (err) {
              console.error(err);
              next(err, messageInstance);
            } else {
              console.log('Created message as: ', messageInstance);
              // Check if there is Geoloc in payload and create Geoloc object
              Geoloc.createFromParsedPayload(
                messageInstance,
                function (err: any, res: any) {
                  if (err) {
                    next(err, null);
                  } else {
                    console.log(res);
                  }
                });
              // Calculate success rate and update device
              thisMessage.updateDeviceSuccessRate(messageInstance.deviceId);
              // Share message to organizations if any
              thisMessage.linkMessageToOrganization(messageInstance);
            }
          });
        // ack is true
        next(null, result);
      });
    } else {
      // ack is false
      // Creating new message with no downlink data
      Message.create(
        message,
        (err: any, messageInstance: any) => {
          if (err) {
            console.error(err);
            next(err, messageInstance);
          } else {
            console.log('Created message as: ', messageInstance);
            // Check if there is Geoloc in payload and create Geoloc object
            Geoloc.createFromParsedPayload(
              messageInstance,
              function (err: any, res: any) {
                if (err) {
                  next(err, null);
                } else {
                  console.log(res);
                }
              });
            // Calculate success rate and update device
            thisMessage.updateDeviceSuccessRate(messageInstance.deviceId);
            // Share message to organizations if any
            thisMessage.linkMessageToOrganization(messageInstance);

            next(null, messageInstance);
          }
        });
    }
  }

  updateDeviceSuccessRate(deviceId: string) {
    // Model
    const Device = this.model.app.models.Device;
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
          device.success_rate = (((device.Messages.length / attendedNbMessages) * 100)).toFixed(2);

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

  linkMessageToOrganization(message: any) {
    // Model
    const Device = this.model.app.models.Device;

    Device.findOne({where: {'id': message.deviceId}, include: 'Organizations'}, function(err: any, device: any) {
      //console.log(device);
      if (device.Organizations) {
        device.toJSON().Organizations.forEach(function(orga: any) {
          message.Organizations.add(orga.id, function (err: any, result: any) {
            //console.log("Linked message with organization", result);
          });
        });
      }
    });
  }

  download(deviceId: string, type: string, req: any, res: any, next: Function): void {
    if ((type !== 'csv'
        && type !== 'json')
      || typeof deviceId === 'undefined') {
      res.send('Missing "type" ("csv" or "json"), "deviceId"');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    const datetime = new Date();
    const today = moment().format('YYYY.MM.DD');
    const filename = today + '_' + deviceId + '_export.csv';
    res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
    res.set('Last-Modified', datetime + 'GMT');
    res.set('Content-Type', 'application/force-download');
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Type', 'application/download');
    res.set('Content-Disposition', 'attachment;filename=' + filename);
    res.set('Content-Transfer-Encoding', 'binary');

    this.model.find(
      {
        where: {
          and: [
            {userId: userId},
            {deviceId: deviceId}
          ]
        },
        include: ['Geolocs']
      }, function (err: any, messages: any) {
        if (err) {
          console.error(err);
          res.send(err);
        } else {
          const data: any = [];
          let csv: any = [];

          const options: any = {
            fields: []
          };

          messages.forEach((message: any) => {
            message = message.toJSON();

            const obj: any = {};
            if (options.fields.indexOf('seqNumber') === -1) {
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
            }
            obj.seqNumber = message.seqNumber;

            obj.createdAt = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss');
            obj.year = new Date(message.createdAt).getFullYear();
            obj.month = new Date(message.createdAt).getMonth() + 1;
            obj.day = new Date(message.createdAt).getDate();
            obj.hours = new Date(message.createdAt).getHours();
            obj.minutes = new Date(message.createdAt).getMinutes();
            obj.seconds = new Date(message.createdAt).getSeconds();

            obj.data = message.data;
            obj.ack = message.ack;
            obj.data_downlink = message.data_downlink;

            message.data_parsed.forEach((p: any) => {
              if (options.fields.indexOf(p.key) === -1) {
                options.fields.push(p.key);
              }
              obj[p.key] = p.value;
            });
            message.Geolocs.forEach((geoloc: any) => {
              if (options.fields.indexOf('lat_' + geoloc.type) === -1) {
                options.fields.push('lat_' + geoloc.type);
                options.fields.push('lng_' + geoloc.type);
                options.fields.push('precision_' + geoloc.type);
              }
              obj['lat_' + geoloc.type] = geoloc.location.lat;
              obj['lng_' + geoloc.type] = geoloc.location.lng;
              obj['precision_' + geoloc.type] = geoloc.precision;
            });
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
        }
      });
  }

// Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Message: Before Save');
    next();
  }
}

module.exports = Message;
