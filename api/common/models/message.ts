import { Model } from '@mean-expert/model';
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
    beforeSave: { name: 'before save', type: 'operation' }
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
  constructor(public model: any) {}

  beforeSave(ctx: any, next: Function): void {
    //obtain the model data of ctx
    let data = JSON.parse(JSON.stringify(ctx.instance));

    //console.log("Context: ", ctx);
    console.log("Message data", data);

    if(!data.deviceId || !data.userId){
      next();
    }else{
      let device = {
        id: data.deviceId,
        userId: data.userId,
        last_known_location: data.GPS || data.geoloc_sigfox
      };

      //access another model inside the method
      this.model.app.models.Device.findOrCreate(
        { where:{id: data.deviceId} }, //find
        device, //create
        (err: any, instance: any, created: boolean) => { //callback
          if (err) {
            console.error('error creating device', err);
          }else if (created){
            console.log('created device', instance);
            next();
          }else {
            console.log('found device', instance);

            this.model.app.models.Device.upsert(
              device,
              (err: any, deviceInstance: any) => {
                if(err){
                  console.log(err)
                }else{
                  console.log(deviceInstance);
                  if(!data.parsed_data){
                    if(deviceInstance.ParserId){
                      this.model.app.models.Parser.findById(
                        deviceInstance.ParserId,
                        (err:any, parserInstance:any) =>{
                          if(err){
                            console.log(err);
                          } else {
                            //console.log("Parser:", parserInstance);

                            // Here we will decode the Sigfox payload
                            // @Todo: run it in another container because it can crash the app if something goes wrong...

                            let fn = Function("payload", parserInstance.function);
                            ctx.instance.parsed_data = fn(data.data);
                            console.log(ctx.instance);
                          }
                        })
                    }
                    next();
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
      if(device && device.dl_payload){
        results = {
          [data.deviceId]:{
            downlinkData: device.dl_payload
          }
        }
      } else {
        results = {
          [data.deviceId]:{
            noData: true
          }
        }
      }
      cb(null, results);
    });
  }
}

module.exports = Message;
