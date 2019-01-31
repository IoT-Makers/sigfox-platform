import {Model} from "@mean-expert/model";
import {RabbitPub} from '../../server/RabbitPub';
import {Script} from 'vm';

/**
 * @module Parser
 * @description
 * Write a useful Parser Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    access: {name: "access", type: "operation"},
    beforeSave: {name: "before save", type: "operation"},
    afterDelete: {name: "after delete", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
  },
  remotes: {
    parsePayload: {
      returns: {arg: "result", type: "array"},
      http: {path: "/parse-payload", verb: "post"},
      accepts: [
        {arg: "device", type: "Device", required: true, description: "The device to parse"},
        {arg: "message", type: "Message", required: true, description: "The current message"},
        {arg: "req", type: "object", http: {source: "req"}},
      ],
    },
    parseAllMessages: {
      accepts: [
        {arg: "id", type: "string", required: true, description: "Device Id"},
        {arg: "req", type: "object", http: {source: "req"}},
      ],
      http: {
        path: "/:id/parse-messages",
        verb: "put",
      },
      returns: {type: [], root: true},
    },
    parseAllDevices: {
      accepts: [
        {arg: "id", type: "string", required: true, description: "Parser Id"},
        {arg: "req", type: "object", http: {source: "req"}},
      ],
      http: {
        path: "/:id/parse-devices",
        verb: "put",
      },
      returns: {type: [], root: true},
    },
  },
})

class Parser {

  private compiledParsers: { [uid: string]: Script } = {};

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

  }

  public access(ctx: any, next: Function): void {
    // The below code hides the "hidden" parsers to other users
    if (ctx.options && ctx.options.authorizedRoles && ctx.options.authorizedRoles.admin) next();
    else if (ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {
      const notHidden = {hidden: {neq: true}};
      const userId = {userId: ctx.options.accessToken.userId};
      if (ctx.query.where) ctx.query.where = {or: [{and: [ctx.query.where, notHidden]}, userId]};
      // if (ctx.query.where && ctx.query.where.or) ctx.query.where.or = {or: [{and: [ctx.query.where, hidden]}, userId, ctx.query.where.or]};
      else ctx.query.where = {or: [notHidden, userId]};
      next();
    } else next();
  }

  public beforeSave(ctx: any, next: Function): void {
    if (ctx.instance) ctx.instance.createdAt = new Date();
    next();
  }

  public parsePayload(device: any, message: any, req: any, next: Function): void {
    const userId = req.accessToken.userId;
    const deviceId = device.id;
    const createdAt = message.createdAt;
    const parser = device.Parser;
    const payload = message.data;

    if (!userId) return next("Please login or use a valid access token.");
    else if (!deviceId) return next("The device must contain an ID.");
    else if (!createdAt) return next("The message must contain the createdAt date to be parsed.");
    else if (!parser) return next("The device must contain a Parser to be parsed.");
    else if (!payload || !payload.length) return next("The message must contain data to be parsed.");
    else if (payload.length > 24) return next("Sigfox payload cannot be more than 12 bytes.");

    // Here we will decode the Sigfox payload
    // @TODO: run it in another container because it can crash the app if something goes wrong...
    // @TODO: ADD A FIELD IN PARSER MODEL IF LAST PAYLOAD IS NECESSARY
    // Get latest message received by the device to inject it in the parser function variables
    const Message = this.model.app.models.Message;
    Message.findOne({
        order: 'createdAt DESC',
        where: {deviceId: deviceId, createdAt: {lt: createdAt}}
      },
      (err: any, messageInstance: any) => {
        if (err) console.error(err);
        // console.log(messageInstance);
        // Parse
        try {
          const parserScript = this.getCompiledParser(parser);
          const data_parsed = parserScript.runInNewContext({
            payload: payload,
            lastParsedPayload: messageInstance ? messageInstance.data_parsed : []
          }, {timeout: 5000});
          console.log("Parser | Success data parsed");
          next(null, data_parsed);
        } catch (err) {
          // console.log('Parser | Error parsing data');
          // If you give to requester details about parser function
          // next(err, null);
          // If you give to requester only a generic error
          console.error(err);
          next("Parser | Error parsing data", null);
        }
      });
  }

  public parseAllDevices(parserId: string, req: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Parser = this.model;
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;

    const userId = req.accessToken.userId;

    const response: any = {};

    if (!userId) {
      response.message = "Please login or use a valid access token.";
      next(null, response);
    }

    Parser.findById(parserId, {
      include: [{
        relation: "Devices",
        scope: {
          where: {userId: userId},
          limit: 100,
          order: "updatedAt DESC",
        },
      }],
    }, (err: any, parser: any) => {
      if (err) next(err, null);
      else if (parser) {

        parser = parser.toJSON();

        if (parser.Devices.length === 0) {
          response.message = "No devices associated to this parser.";
          next(null, response);
        } else {

          parser.Devices.forEach((device: any, deviceCount: number) => {
            Device.findById(device.id, {
              include: [
                {
                  relation: "Messages",
                  scope: {
                    order: 'createdAt ASC'
                  }
                },
                "Parser"]
            }, (err: any, deviceInstance: any) => {
              if (err) next(err, null);
              else if (deviceInstance) {
                deviceInstance = deviceInstance.toJSON();
                // console.log(device);
                if (!deviceInstance.Parser) {
                  response.message = "No parser associated to this device.";
                  next(null, response);
                } else {
                  if (deviceInstance.Messages) {
                    deviceInstance.Messages.forEach((message: any, msgCount: number) => {
                      if (message.data) {
                        Parser.parsePayload(deviceInstance, message, req, (err: any, data_parsed: any) => {
                          if (data_parsed) {
                            message.data_parsed = data_parsed;
                            Message.upsert(message, (err: any, messageUpdated: any) => {
                              if (!err && messageUpdated.data_parsed.length > 0) {
                                // Check if there is Geoloc in payload and create Geoloc object
                                Geoloc.createFromParsedPayload(
                                  messageUpdated,
                                  (err: any, res: any) => {
                                  });
                              }
                            });
                          }
                          if (deviceCount === parser.Devices.length - 1 && msgCount === deviceInstance.Messages.length - 1) {
                            // Send the response
                            console.log("Successfully parsed all messages.");
                            response.message = "Success";
                            next(null, response);
                          }
                        });
                      }
                    });
                  } else {
                    response.message = "This device has no messages.";
                    next(null, response);
                  }
                }
              } else {
                response.message = "No device found.";
                next(null, response);
              }
            });
          });
        }
      } else {
        response.message = "No parser found.";
        next(null, response);
      }
    });
  }

  public parseAllMessages(deviceId: string, req: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Parser = this.model;
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;

    const userId = req.accessToken.userId;

    const response: any = {};

    if (!userId) {
      response.message = "Please login or use a valid access token.";
      next(null, response);
    }

    Device.findById(deviceId, {
      include: [{
        relation: "Messages",
        scope: {
          order: 'createdAt ASC'
        }
      }, "Parser"]
    }, (err: any, device: any) => {
      if (err) next(err, null);
      else if (device) {

        device = device.toJSON();

        // If an user doesn't own a device he can parse all messages of the device by knowing the deviceId
        // Check own of device. Only the owner can parse the device's messages
        if (userId.toString() !== device.userId.toString()) {
          response.message = "Unauthorized access to this device.";
          return next(null, response.message);
        }

        // console.log(device);
        if (!device.Parser) {
          response.message = "No parser associated to this device.";
          next(null, response);
        } else {
          if (device.Messages) {
            device.Messages.forEach((message: any, msgCount: number) => {
              if (message.data) {
                Parser.parsePayload(device, message, req, (err: any, data_parsed: any) => {
                  if (data_parsed) {
                    message.data_parsed = data_parsed;
                    Message.upsert(message, (err: any, messageUpdated: any) => {
                      if (!err && messageUpdated.data_parsed.length > 0) {
                        // Check if there is Geoloc in payload and create Geoloc object
                        Geoloc.createFromParsedPayload(
                          messageUpdated,
                          (err: any, res: any) => {
                          });
                      }
                    });
                  }
                  if (msgCount === device.Messages.length - 1) {
                    // Send the response
                    console.log("Successfully parsed all messages.");
                    response.message = "Success";
                    next(null, response);
                  }
                });
              }
            });
          } else {
            response.message = "This device has no messages.";
            next(null, response);
          }
        }
      } else {
        response.message = "No device found.";
        next(null, response);
      }
    });
  }

  private getCompiledParser(parser: any): Script {
    const uid = parser.id + parser.updatedAt;
    if (!this.compiledParsers[uid]) {
      const fn = parser.function;
      const sc = new Script(`(function (payload, lastParsedPayload){${fn}})(payload, lastParsedPayload)`);
      // sc.createCachedData();
      this.compiledParsers[uid] = sc;
    }
    return this.compiledParsers[uid];
  }

  public afterDelete(ctx: any, next: Function): void {
    let parser = ctx.instance;
    if (parser) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "parser",
        content: parser,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }


  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let parser = ctx.instance;
    const payload = {
      event: "parser",
      content: parser,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload, parser.userId.toString());
    next();
  }
}

module.exports = Parser;
