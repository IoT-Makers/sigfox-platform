import {Model} from '@mean-expert/model';

const loopback = require('loopback');

/**
 * @module Message
 * @description
 * Write a useful Message Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeDelete: { name: 'before delete', type: 'operation' }
  },
  remotes: {
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
    },
    putSigfoxAcknowledge: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: { source: 'body' }}
      ],
      http: {
        path: '/sigfox/acknowledge',
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
    // Models
    const Message = this.model;
    const Alert = this.model.app.models.Alert;

    if (typeof data.deviceId  === 'undefined'
      || typeof data.time  === 'undefined'
      || typeof data.seqNumber === 'undefined') {
      next('Missing "deviceId", "time" and "seqNumber"', data);
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Create a new message object
    let message = new Message;
    message = data;

    // Store the userId in the message
    message.userId = userId;

    // Set the createdAt time
    message.createdAt = new Date(message.time * 1000);

    // Create a new device object
    const device = new Message.app.models.Device;
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
    Message.app.models.Device.findOrCreate(
      {where: {id: message.deviceId}, include: ['Alerts', 'Parser']}, // find
      device, // create
      (err: any, deviceInstance: any, created: boolean) => { // callback
        if (err) {
          console.error('Error creating device.', err);
          next(err, data);
        } else {
          deviceInstance = deviceInstance.toJSON();
          if (created) {
            //console.log('Created new device.');
          }
          else{
            //console.log('Found an existing device.');
          }

          // If message is a duplicate
          if (duplicate) {
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
                  //console.log('Found the corresponding message and storing reception in it.');
                  if (!messageInstance.reception) {
                    messageInstance.reception = [];
                  }
                  messageInstance.reception.push(data.reception[0]);
                  Message.upsert(
                    messageInstance,
                    (err: any, messageInstance: any) => {
                      if (err) {
                        console.error(err);
                        next(err, messageInstance);
                      } else {
                        //console.log('Updated message as: ', messageInstance);
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
                //console.log('Associating parser to device.');
                this.model.app.models.Device.upsert(
                  deviceInstance, (err: any, deviceInstance: any) => {
                    if (err) {
                      console.error(err);
                      next(err, data);
                    } else {
                      Message.app.models.Device.findOne({
                        where: {id: deviceInstance.id},
                        include: ['Alerts', 'Parser']
                      }, (err: any, deviceInstance: any) => {
                        if (err) {
                          console.error(err);
                          next(err, data);
                        } else {
                          deviceInstance = deviceInstance.toJSON();
                          //console.log('Updated device as: ', deviceInstance);

                          // Decode the payload
                          Message.app.models.Parser.parsePayload(
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
                          Alert.triggerByDevice(
                            message.data_parsed,
                            deviceInstance,
                            req,
                            function (err: any, res: any) {
                              if (err) {
                                next(err, null);
                              } else {
                                //console.log(res);
                              }
                            });

                          // Create message
                          this.createMessageAndSendResponse(message, next);
                        }
                      });
                    }
                  });
              } else {
                //console.log('Found parser!');

                // Decode the payload
                Message.app.models.Parser.parsePayload(
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
                Message.app.models.Alert.triggerByDevice(
                  message.data_parsed,
                  deviceInstance,
                  req,
                  function (err: any, res: any) {
                    if (err) {
                      next(err, null);
                    } else {
                      //console.log(res);
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
              downlinkData: device.data_downlink
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
              //console.log('Created message as: ', messageInstance);
              // Check if there is Geoloc in payload and create Geoloc object
              Geoloc.createFromParsedPayload(
                messageInstance,
                function (err: any, res: any) {
                  if (err) {
                    next(err, null);
                  } else {
                    //console.log(res);
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
            //console.log('Created message as: ', messageInstance);
            // Check if there is Geoloc in payload and create Geoloc object
            Geoloc.createFromParsedPayload(
              messageInstance,
              function (err: any, res: any) {
                if (err) {
                  next(err, null);
                } else {
                  //console.log(res);
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
          device.successRate = (((device.Messages.length / attendedNbMessages) * 100)).toFixed(2);

          Device.upsert(
            device,
            function (err: any, deviceUpdated: any) {
              if (err) {
                console.error(err);
              } else {
                //console.log('Updated device as: ' + deviceUpdated);
              }
            });
        }
      });
  }

  linkMessageToOrganization(message: any) {
    // Model
    const Device = this.model.app.models.Device;

    Device.findOne({where: {id: message.deviceId}, include: 'Organizations'}, (err: any, device: any) => {
      //console.log(device);
      if (device.Organizations) {
        device.toJSON().Organizations.forEach((orga: any) => {
          message.Organizations.add(orga.id, (err: any, result: any) => {
            //console.log("Linked message with organization", result);
          });
        });
      }
    });
  }

  putSigfoxAcknowledge(req: any, data: any, next: Function): void {
    // Models
    const Message = this.model;

    if (typeof data.deviceId  === 'undefined'
      || typeof data.time  === 'undefined'
      || typeof data.downlinkAck === 'undefined') {
      next('Missing "deviceId", "time" and "downlinkAck"', data);
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Find the message containing the ack request
    Message.findOne({
      where: {
        and: [
          {deviceId: data.deviceId},
          {time: data.time},
          {ack: true}
        ]
      }
    }, (err: any, messageInstance: any) => {
      if (err) {
        console.error(err);
        next(err, data);
      } else {
        if (messageInstance) {
          console.log('Found the corresponding message and downlinkAck in it.');
          messageInstance.downlinkAck = data.downlinkAck;
          Message.upsert(
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
          const err = 'Error - No corresponding message found, did you first receive a message containing ack = true?';
          console.error(err);
          next(err, data);
        }
      }
    });
  }

  // Before delete message, remove category organizaton links
  beforeDelete(ctx: any, next: Function): void {
    // Models
    const Message = this.model;

    Message.findOne({where: {id: ctx.where.id}, include: 'Organizations'}, (err: any, message: any) => {
      // console.log(category);
      if (!err) {
        if (message.Organizations) {
          message.toJSON().Organizations.forEach((orga: any) => {
            message.Organizations.remove(orga.id, (err: any, result: any) => {
              if (!err) {
                console.log('Unlinked device from organization (' + orga.name + ')');
              }
            });
          });
        }
        next(null, 'Unlinked device from organization');
      } else {
        next(err);
      }
    });
  }
}

module.exports = Message;
