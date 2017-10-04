import { Model } from '@mean-expert/model';
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
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Message {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  beforeSave(ctx: any, next: Function): void {
    //obtain the model data of ctx
    let data = JSON.parse(JSON.stringify(ctx.instance));

    console.log(data);

    // if(!data.deviceId||!data.userId){
    //   return
    // }

    let device = {
      id: data.deviceId,
      userId: data.userId
    };

    //access another model inside the method
    this.model.app.models.Device.findOrCreate(
      { where:{id: data.deviceId} }, //find
      device, //create
      (err: any, instance: any, created: boolean) => { //Callback
        if (err) {
          console.error('error creating device', err);
        }else if (created){
          console.log('created device', instance.id);
        }else {
          console.log('found device', instance.id);

          this.model.app.models.Device.upsert(
            instance,
            (err: any, response: any) => {
              if(err){
                console.log(err)
              }else{
                console.log(response);
              }

            })
        }
      }
    );

    next();
  }


  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Message;
