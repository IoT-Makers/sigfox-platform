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
    next();
  }

  parsePayload(fn: Function, payload: string, req: any, next: Function): void {
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
      data_parsed = fn(payload);
    }
    next(null, data_parsed);
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

    Parser.findById(parserId, {include: ['Devices']}, function (err: any, parser: any) {
      if (err) {
        next(err, null);
      } else if (parser) {

<<<<<<< HEAD
=======;
        // If an user doesn't own a device or messages (or parser), he can parse
        // all messages of the device related to a parser by knowing his parserId
        // Check own of parser. Only the owner can use the parser
        if(userId.toString() != parser.userId.toString()){
          response.message = 'User doesn\'t have access to this parser.';
          return next(null, response.message);
        }

>>>>>>> origin/master;
        parser = parser.toJSON();

        if (parser.userId) {
          // If an user doesn't own a device or messages (or parser), he can parse
          // all messages of the device related to a parser by knowing his parserId
          // Check own of parser. Only the owner can use the parser
          if (userId.toString() !== parser.userId.toString()) {
            response.message = 'Unauthorized access to this parser.';
            return next(null, response.message);
          }
        }

        // console.log(parser);
        if (!parser.Devices) {
          response.message = 'No devices associated to this parser.';
          next(null, response);
        } else {

          parser.Devices.forEach((device: any, deviceCount: number) => {
            Device.findById(device.id, {include: ['Messages', 'Parser']}, function (err: any, deviceInstance: any) {
              if (err) {
                next(err, null);
              } else if (deviceInstance) {
                deviceInstance = deviceInstance.toJSON();
                // console.log(device);
                if (!deviceInstance.Parser) {
                  response.message = 'No parser associated to this device.';
                  next(null, response);
                } else {
                  const fn = Function('payload', deviceInstance.Parser.function);
                  if (deviceInstance.Messages) {
                    deviceInstance.Messages.forEach((message: any, msgCount: number) => {
                      if (message.data) {
                        Parser.parsePayload(fn, message.data, req, function (err: any, data_parsed: any) {
                          if (err) {
                            next(err, null);
                          } else {
                            if (data_parsed) {
                              message.data_parsed = data_parsed;
                              Message.upsert(message, function (err: any, messageUpdated: any) {
                                if (!err) {
                                  // Check if there is Geoloc in payload and create Geoloc object
                                  Geoloc.createFromParsedPayload(
                                    messageUpdated,
                                    function (err: any, res: any) {
                                      if (err) {
                                        next(err, null);
                                      } else {
                                        //console.log(res);
                                      }
                                    });
                                } else {
                                  response.message = 'An error occured while adding geoloc.';
                                  next(null, response);
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

    Device.findById(deviceId, {include: ['Messages', 'Parser']}, function (err: any, device: any) {
      if (err) {
        next(err, null);
      } else if (device) {

<<<<<<< HEAD
=======;
        // If an user doesn't own a device he can parse all messages of the device by knowing the deviceId
        // Check own of device. Only the owner can parse the device's messages
        if(userId.toString() != device.userId.toString()){
          response.message = 'User doesn\'t have access to this device.';
          return next(null, response.message);
        }

>>>>>>> origin/master;
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
          const fn = Function('payload', device.Parser.function);
          if (device.Messages) {
            device.Messages.forEach((message: any, msgCount: number) => {
              if (message.data) {
                Parser.parsePayload(fn, message.data, req, function (err: any, data_parsed: any) {
                  if (err) {
                    next(err, null);
                  } else {
                    if (data_parsed) {
                      message.data_parsed = data_parsed;
                      Message.upsert(message, function (err: any, messageUpdated: any) {
                        if (!err) {
                          // Check if there is Geoloc in payload and create Geoloc object
                          Geoloc.createFromParsedPayload(
                            messageUpdated,
                            function (err: any, res: any) {
                              if (err) {
                                next(err, null);
                              } else {
                                console.log(res);
                              }
                            });
                        } else {
                          response.message = 'An error occured while adding geoloc.';
                          next(null, response);
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
