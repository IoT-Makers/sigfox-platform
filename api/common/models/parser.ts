import {Model} from '@mean-expert/model';

/**
 * @module Parser
 * @description
 * Write a useful Parser Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    parsePayload: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/parse-payload', verb: 'post' },
      accepts: [
        {arg: 'fn', type: 'string', required: true, description: 'Parser function'},
        {arg: 'payload', type: 'string', required: true, description: 'Sigfox payload (12 bytes max)'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
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
    },
    parseAllDevices: {
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Parser Id'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/:id/parse-devices',
        verb: 'put'
      },
      returns: {type: [], root: true}
    }
  }
})

class Parser {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
    }
    next();
  }

  parsePayload(fn: string, payload: string, req: any, next: Function): void {
    const userId = req.accessToken.userId;
    if (!userId) {
      next(null, 'Please login or use a valid access token.');
    }
    if (payload.length > 24) {
      next(null, 'Sigfox payload cannot be more than 12 bytes.');
    }

    // Here we will decode the Sigfox payload and search for geoloc to be extracted and store in the Message
    // @TODO: run it in another container because it can crash the app if something goes wrong...
    let data_parsed: any = null;
    if (payload !== '') {
      try {
        const func = Function('payload', fn);
        data_parsed = func(payload);
        console.log('Parser | Success data parsed');
        next(null, data_parsed);
      } catch (err) {
        //console.log('Parser | Error parsing data');
        // If you give to requester details about parser function
        //next(err, null);
        // If you give to requester only a generic error
        console.error(err);
        next('Parser | Error parsing data', null);
      }
    }
  }

  parseAllDevices(parserId: string, req: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Parser = this.model;
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;


    const userId = req.accessToken.userId;

    const response: any = {};

    if (!userId) {
      response.message = 'Please login or use a valid access token.';
      next(null, response);
    }

    Parser.findById(parserId, {
      include: [{
        relation: 'Devices',
        scope: {
          where: {userId: userId},
          limit: 100,
          order: 'updatedAt DESC'
        }
      }]
    }, (err: any, parser: any) => {
      if (err) {
        next(err, null);
      } else if (parser) {

        parser = parser.toJSON();

        if (parser.Devices.length === 0) {
          response.message = 'No devices associated to this parser.';
          next(null, response);
        } else {

          parser.Devices.forEach((device: any, deviceCount: number) => {
            Device.findById(device.id, {include: ['Messages', 'Parser']}, (err: any, deviceInstance: any) => {
              if (err) {
                next(err, null);
              } else if (deviceInstance) {
                deviceInstance = deviceInstance.toJSON();
                // console.log(device);
                if (!deviceInstance.Parser) {
                  response.message = 'No parser associated to this device.';
                  next(null, response);
                } else {
                  const fn = deviceInstance.Parser.function;
                  if (deviceInstance.Messages) {
                    deviceInstance.Messages.forEach((message: any, msgCount: number) => {
                      if (message.data) {
                        Parser.parsePayload(fn, message.data, req, (err: any, data_parsed: any) => {
                          if (err) {
                            next(err, null);
                          } else {
                            if (data_parsed) {
                              message.data_parsed = data_parsed;
                              Message.upsert(message, (err: any, messageUpdated: any) => {
                                if (err) {
                                  next(err, response);
                                } else {
                                  // Check if there is Geoloc in payload and create Geoloc object
                                  Geoloc.createFromParsedPayload(
                                    messageUpdated,
                                    (err: any, res: any) => {
                                      if (err) {
                                        next(err, null);
                                      } else {
                                        //console.log(res);
                                      }
                                    });
                                }
                              });
                            }
                          }
                        });
                      }
                      if (deviceCount === parser.Devices.length - 1 && msgCount === deviceInstance.Messages.length - 1) {
                        // Send the response
                        console.log('Successfully parsed all messages.');
                        response.message = 'Success';
                        next(null, response);
                      }
                    });
                  } else {
                    response.message = 'This device has no messages.';
                    next(null, response);
                  }
                }
              } else {
                response.message = 'No device found.';
                next(null, response);
              }
            });
          });
        }
      } else {
        response.message = 'No parser found.';
        next(null, response);
      }
    });
  }

  parseAllMessages(deviceId: string, req: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Parser = this.model;
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;

    const userId = req.accessToken.userId;

    const response: any = {};

    if (!userId) {
      response.message = 'Please login or use a valid access token.';
      next(null, response);
    }

    Device.findById(deviceId, {include: ['Messages', 'Parser']}, (err: any, device: any) => {
      if (err) {
        next(err, null);
      } else if (device) {

        device = device.toJSON();

        // If an user doesn't own a device he can parse all messages of the device by knowing the deviceId
        // Check own of device. Only the owner can parse the device's messages
        if (userId.toString() !== device.userId.toString()) {
          response.message = 'Unauthorized access to this device.';
          return next(null, response.message);
        }

        // console.log(device);
        if (!device.Parser) {
          response.message = 'No parser associated to this device.';
          next(null, response);
        } else {
          const fn = device.Parser.function;
          if (device.Messages) {
            /**
             * Destroy all geolocs different than Sigfox
             */
            Geoloc.destroyAll({deviceId: deviceId, type: {neq: 'sigfox'}}, (error: any, result: any) => { if (!error) console.log('Deleted all geolocs for device, except for Sigfox type: ' + deviceId); });
            device.Messages.forEach((message: any, msgCount: number) => {
              if (message.data) {
                Parser.parsePayload(fn, message.data, req, (err: any, data_parsed: any) => {
                  if (err) {
                    next(err, null);
                  } else {
                    if (data_parsed) {
                      message.data_parsed = data_parsed;
                      Message.upsert(message, (err: any, messageUpdated: any) => {
                        if (err) {
                          next(err, response);
                        } else {
                          // Check if there is Geoloc in payload and create Geoloc object
                          Geoloc.createFromParsedPayload(
                            messageUpdated,
                            (err: any, res: any) => {
                              if (err) {
                                next(err, null);
                              } else {
                                //console.log(res);
                              }
                            });
                        }
                        if (msgCount === device.Messages.length - 1) {
                          // Send the response
                          console.log('Successfully parsed all messages.');
                          response.message = 'Success';
                          next(null, response);
                        }
                      });
                    }
                  }
                });
              }
            });
          } else {
            response.message = 'This device has no messages.';
            next(null, response);
          }
        }
      } else {
        response.message = 'No device found.';
        next(null, response);
      }
    });
  }
}

module.exports = Parser;
