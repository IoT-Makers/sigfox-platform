import {Model} from '@mean-expert/model';
import {Device} from "../../../webapp/src/app/shared/sdk/models/Device";
import {Geoloc} from "../../../webapp/src/app/shared/sdk/models/Geoloc";

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
    afterRemoteCreate: {name: 'create', type: 'afterRemote'},
    beforeRemoteUpsert: {name: 'replaceOrCreate', type: 'beforeRemote'}
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Message {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Before POST - CALLBACK UPLINK or BIDIR
  beforeRemoteCreate(ctx: any, messageInstance:any, next: Function): void {
    console.warn("beforeRemoteCreate - CALLBACK UPLINK or BIDIR");

    // Obtain the userId with the access_token of ctx
    let userId = ctx.args.options.accessToken.userId;
    //console.log("ctx.args.options.accessToken.userId", userId);

    // Obtain the model data of ctx
    let data = ctx.args.data;
    //console.log("ctx.args.data", data);

    if (!data.deviceId && !data.data && !userId) {
      next();
    } else {
      let device = {
        id: data.deviceId,
        userId: userId
      };

      // Access another model inside the method
      this.model.app.models.Device.findOrCreate(
        {where: {id: data.deviceId}}, //find
        device, //create
        (err: any, deviceInstance: any, created: boolean) => { //callback
          if (err) {
            console.error("Error creating device", err);
          } else if (created && !ctx.args.data.parserId) {
            console.log("Created new device and not trying to parse data");
            next();
          } else {
            console.log("Found device");

            if (deviceInstance.ParserId || ctx.args.data.parserId) {
              this.model.app.models.Parser.findById(
                deviceInstance.ParserId || ctx.args.data.parserId,
                (err: any, parserInstance: any) => {
                  if (err) {
                    console.log(err);
                  } else if(parserInstance){
                    //console.log("Parser:", parserInstance);

                    // Here we will decode thea Sigfox payload & search for geoloc to be extracted and store in the Message
                    // @TODO: run it in another container because it can crash the app if something goes wrong...

                    let geoloc = new Geoloc();
                    let fn = Function("payload", parserInstance.function);
                    let parsed_data = fn(data.data);
                    ctx.args.data.parsed_data = parsed_data;
                    // Check if the parsed data contains a "geoloc" key and store it in the message property to be stored
                    parsed_data.forEach((o: any) => {
                      if(o.key === "geoloc"){
                        geoloc.type = o.value;
                        if(!ctx.args.data.geoloc)
                          ctx.args.data.geoloc = [];
                        console.warn("There is geoloc in the parsed data!");
                      }
                      else if(o.key === "lat"){
                        geoloc.lat = o.value;
                      }
                      else if(o.key === "lng")
                        geoloc.lng = o.value;
                      else if(o.key === "precision")
                        geoloc.precision = o.value;
                    });

                    // If there is geoloc in the frame, store it in the Message
                    if(geoloc.type !== ''){
                      ctx.args.data.geoloc.push({
                        "type": geoloc.type,
                        "lat": geoloc.lat,
                        "lng": geoloc.lng,
                        "precision": geoloc.precision
                      });
                    }
                    //console.log(ctx.args.data);
                  }

                  // Update the device location geoloc array
                  let device = {
                    id: data.deviceId,
                    userId: userId,
                    location: ctx.args.data.geoloc
                  };
                  this.model.app.models.Device.upsert(
                    device,
                    (err: any, deviceInstance: any) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("Updated device as: ", deviceInstance);
                      }
                      next();
                    });

                })
            } else {
              // No parser associated to device
              next();
            }
          }
        });
    }
  }

  // After POST - CALLBACK UPLINK or BIDIR
  afterRemoteCreate(ctx: any, messageInstance:any, next: Function): void {
    console.warn("afterRemoteCreate - CALLBACK UPLINK or BIDIR");
    let data = ctx.args.data;
    // If CALLBACK BIDIR - check if flag of ack is true
    if(data.ack) {
      this.model.app.models.Device.findOne({where: {id: data.deviceId}}, function (err: any, device: Device) {
        if (device.dl_payload) {
          ctx.result = {
            [data.deviceId]: {
              downlinkData: device.dl_payload
            }
          }
        } else {
          ctx.result = {
            [data.deviceId]: {
              noData: true
            }
          }
        }
        // ack is true
        console.log("Created new message for BIDIR");
        next();
      });
    } else {
      // ack is false
      console.log("Created new message for UPLINK");
      next();
    }
  }

  // Before PUT - CALLBACK GEOLOC SIGFOX
  beforeRemoteUpsert(ctx: any, messageInstance: any, next: any) {
    console.warn("beforeRemoteUpsert - CALLBACK GEOLOC SIGFOX");

    // Resolve geoloc as an array (this permits posting without "[]" in geoloc object
    //ctx.args.data.geoloc = [ctx.args.data.geoloc];

    // Obtain the userId with the access_token of ctx
    let userId = ctx.args.options.accessToken.userId;

    let data = ctx.args.data;
    let geoloc_sigfox = data.geoloc[0];

    let device = {
      id: data.deviceId,
      userId: userId,
      location: [geoloc_sigfox]
    };

    // Access another model inside the method
    this.model.app.models.Device.findOrCreate(
      {where: {id: data.deviceId}}, //find
      device, //create
      (err: any, deviceInstance: Device, created: boolean) => { //callback
        if (err) {
          console.error("Error creating device", err);
        } else if (created) {
          console.log("Created new device");
        } else {
          console.log("Found device");

          // Now checking where geoloc sigfox is in the location array so it can be updated
          let entryGeoloc_sigfox = false;
          if(!deviceInstance.location)
            deviceInstance.location = [];
          deviceInstance.location.forEach((geoloc: Geoloc, index) => {
            if(geoloc.type === "geoloc_sigfox"){
              deviceInstance.location[index] = geoloc_sigfox; // Replace geoloc_sigfox with new one
              entryGeoloc_sigfox = true;
            }
          });
          if(!entryGeoloc_sigfox)
            deviceInstance.location.push(geoloc_sigfox);

          this.model.app.models.Device.upsert(
            deviceInstance,
            (err: any, deviceInstance: any) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Updated device with latest geoloc_sigfox");
              }
            });
        }
      });

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
          if(message){
            console.log("Found the corresponding message and storing geoloc_sigfox in it");
            if(!message.geoloc)
              message.geoloc = [];
            message.geoloc.push(geoloc_sigfox);
            ctx.args.data = message;
          } else {
            // No corresponding message found
          }
          next();
        }
      });
  }



  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Message;
