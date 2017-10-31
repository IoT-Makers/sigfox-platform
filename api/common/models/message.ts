import {Model} from '@mean-expert/model';
import {Device} from "../../../webapp/src/app/shared/sdk/models/Device";
/**
 * @module Message
 * @description
 * Write a useful Message Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeRemoteCreate: {name: 'create', type: 'beforeRemote'},
    beforeRemoteUpsert: {name: 'upsert', type: 'beforeRemote'}
  },
  remotes: {
    postDownlink: {
      accepts: {
        arg: 'data',
        type: 'Message',
        http: {
          source: 'body'
        }
      },
      http: {
        path: '/downlink',
        verb: 'post'
      },
      returns: {
        arg: 'deviceId',
        type: 'Object',
        root: true
      }
    }
  }
})

class Message {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  beforeRemoteCreate(ctx: any, messageInstance:any, next: Function): void {

    //obtain the model data of ctx
    let data = ctx.args.data;

    //console.log("Context: ", ctx);
    console.log("Message data", data);

    if (!data.deviceId || !data.userId) {
      next();
    } else {
      let device = {
        id: data.deviceId,
        userId: data.userId,
        last_known_location: data.GPS || data.geoloc_sigfox
      };

      //access another model inside the method
      this.model.app.models.Device.findOrCreate(
        {where: {id: data.deviceId}}, //find
        device, //create
        (err: any, instance: any, created: boolean) => { //callback
          if (err) {
            console.error('error creating device', err);
          } else if (created) {
            console.log('created device', instance);
            next();
          } else {
            console.log('found device', instance);

            this.model.app.models.Device.upsert(
              device,
              (err: any, deviceInstance: any) => {
                if (err) {
                  console.log(err)
                } else {
                  console.log(deviceInstance);
                  if (!data.parsed_data) {
                    if (deviceInstance.ParserId) {
                      this.model.app.models.Parser.findById(
                        deviceInstance.ParserId,
                        (err: any, parserInstance: any) => {
                          if (err) {
                            console.log(err);
                          } else {
                            //console.log("Parser:", parserInstance);

                            // Here we will decode the Sigfox payload
                            // @Todo: run it in another container because it can crash the app if something goes wrong...

                            let fn = Function("payload", parserInstance.function);
                            ctx.args.data.parsed_data = fn(data.data);
                            next();
                          }
                        })
                    }
                  }
                }
              })
          }
        }
      );
    }

  }

  // Remote method
  postDownlink(data: any, cb: any) {
    this.model.app.models.Device.findOne({where: {id: data.deviceId}}, function (err: any, device: Device) {
      let results;
      if (device && device.dl_payload) {
        results = {
          [data.deviceId]: {
            downlinkData: device.dl_payload
          }
        }
      } else {
        results = {
          [data.deviceId]: {
            noData: true
          }
        }
      }
      cb(null, results);
    });
  }


  // Before remote upsert @Todo to fix upsert geoloc
  beforeRemoteUpsert(ctx: any, messageInstance: any, next: any) {
    console.log("device remote upsert");

    console.log("messageInstance;: ", messageInstance);

    let data = ctx.args.data;
    let geoloc_sigfox = data.geoloc_sigfox;

    console.log(data);

    // Here we will update the message with the Sigfox Geoloc
    this.model.findOne({
        where: {
          and: [
            {deviceId: data.deviceId},
            {time: data.time},
            {seqNumber: data.seqNumber}
          ]
        }
      },
      (err: any, message: any) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(message);
          message.geoloc_sigfox = geoloc_sigfox;
          ctx.args.data = message;
          console.log("Before saving message: ",ctx.args.data);
          next();
        }
      })
  }
}

module.exports = Message;
