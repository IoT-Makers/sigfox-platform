import {Model} from "@mean-expert/model";
import {decrypt, encrypt} from "./utils";
import {RabbitPub} from '../../server/RabbitPub';

const request = require("request");

/**
 * @module Connector
 * @description
 * Write a useful Connector Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    afterDelete: {name: "after delete", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
  },
  remotes: {
    createSigfoxBackendCallbacks: {
      accepts: [
        {arg: "req", type: "object", http: {source: "req"}},
        {arg: "devicetypeId", type: "string", required: true},
      ],
      http: {
        path: "/create-sigfox-backend-callbacks",
        verb: "get",
      },
      returns: {type: [], root: true},
    }
  },
})

class Connector {

  private primusClient: any;

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log("Connector: Before Save");

    if (ctx.instance) { // Create
      ctx.instance.createdAt = new Date();
      const type = ctx.instance.type;
      const login = ctx.instance.login;
      const password = ctx.instance.password;
      // Encrypt the password to be stored
      if (password) ctx.instance.password = encrypt(password);
      if (type === "sigfox-api") return this.testConnection(type, login, password, next);
      next();
    } else if (ctx.data) { // Update
      const type = ctx.data.type;
      const login = ctx.data.login;
      const password = ctx.data.password;
      // Encrypt the password to be stored
      if (password) ctx.data.password = encrypt(password);
      if (type === "sigfox-api") return this.testConnection(type, login, password, next);
      next();
    } else next();
  }

  public createSigfoxBackendCallbacks(req: any, devicetypeId: string, next: Function) {
    // Models
    const User = this.model.app.models.user;
    if (!process.env.BASE_URL) return next('Please refer the environment variable `BASE_URL` first.');

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    User.findById(
      userId,
      {},
      (err: any, userInstance: any) => {
        if (err) {
          console.error(err);
          next(err, userInstance);
        } else if (userInstance) {

          const devAccessTokens = userInstance.devAccessTokens;

          if (!devAccessTokens || devAccessTokens.length === 0) {
            return next(err, "Please create a developer access token first.");
          }

          this.model.findOne(
            {
              where: {
                userId,
                type: "sigfox-api",
              },
            },
            (err: any, connector: any) => {
              if (err) {
                console.log(err);
                next(err, null);
              } else {
                if (connector) {
                  const sigfoxApiLogin = connector.login;
                  const sigfoxApiPassword = decrypt(connector.password);

                  const credentials = Buffer.from(sigfoxApiLogin + ":" + sigfoxApiPassword).toString("base64");

                  const messageUrl = process.env.API_URL + '/api/Messages/sigfox';
                  const geolocUrl = process.env.API_URL + '/api/Geolocs/sigfox';

                  const options = {
                    method: "POST",
                    url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks/new',
                    headers:
                      {
                        "cache-control": "no-cache",
                        "authorization": "Basic " + credentials,
                        "content-type": "application/json"
                      },
                    body:
                      [{
                        channel: "URL",
                        callbackType: 0,
                        callbackSubtype: 3,
                        url: messageUrl,
                        httpMethod: "POST",
                        enabled: true,
                        sendDuplicate: true,
                        sendSni: true,
                        bodyTemplate: '{\n\t"deviceId": "{device}",\n\t"time": {time},\n\t"seqNumber": {seqNumber},\n\t"data": "{data}",\n\t"reception": [{ "id": "{station}", "RSSI": {rssi}, "SNR": {snr} }],\n\t"duplicate": {duplicate},\n\t"ack": {ack}\n}',
                        headers: {Authorization: devAccessTokens[0].id},
                        contentType: "application/json"
                      },
                        {
                          channel: "URL",
                          callbackType: 1,
                          callbackSubtype: 1,
                          url: geolocUrl,
                          httpMethod: "POST",
                          enabled: true,
                          sendDuplicate: false,
                          sendSni: true,
                          bodyTemplate: '{\n\t"deviceId": "{device}",\n\t"time": {time},\n\t"seqNumber": {seqNumber},\n\t"geoloc": {\n\t\t"location": {\n\t\t\t"lat": {lat},\n\t\t\t"lng": {lng}\n\t\t},\n\t\t"accuracy": {radius} \n\t}\n}',
                          headers: {Authorization: devAccessTokens[0].id},
                          contentType: "application/json"
                        }],
                    json: true
                  };

                  request(options, (error: any, response: any, body: any) => {
                    if (error) {
                      throw next(error, null);
                    }
                    next(null, response);
                    // console.log(body);
                  });

                } else {
                  next(err, "Please refer your Sigfox API connector first");
                }
              }
            });
        }
      });
  }

  // Test connector connection
  public testConnection(type: string, login: string, password: string, next: Function): void {
    if (type === "sigfox-api") {
      const credentials = new Buffer(login + ":" + password).toString("base64");

      this.model.app.dataSources.sigfox.testConnection(credentials).then((result: any) => {
        next(null, result);
      }).catch((err: any) => {
        next(err, null);
      });
    } else next(null, "Not implemented yet.");
  }


  public afterDelete(ctx: any, next: Function): void {
    let connector = ctx.instance;
    if (connector) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "connector",
        content: connector,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }

  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let connector = ctx.instance;
    const payload = {
      event: "connector",
      content: connector,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Connector;
