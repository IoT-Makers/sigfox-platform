import { Model } from '@mean-expert/model';
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
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    },
    parsePayload: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/:id/payload', verb: 'get' },
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Parser Id'},
        {arg: 'payload', type: 'string', required: true, description: 'Sigfox payload (12 bytes max)'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
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

  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }

  parsePayload(parserId: string, payload:string,req: any, next: Function): void {
    let result:any;

    const userId = req.accessToken.userId;
    if(!userId){
      next(null, 'Please login or use a valid access token');
    }

    //console.log(payload.length);

    if(payload.length > 24){
      next(null, 'Sigfox payload cannot be more than 12 bytes');
    }

      this.model.app.models.Parser.findById(
        parserId,
        (err: any, parserInstance: any) => {
          if (err) {
            console.log(err);
            next(err, null);
          } else if (parserInstance) {
            // Here we will decode the Sigfox payload and search for geoloc to be extracted and store in the Message
            // @TODO: run it in another container because it can crash the app if something goes wrong...
            const fn = Function('payload', parserInstance.function);

            const data_parsed = fn(payload);
            //console.log(data_parsed);
            // result.data_parsed = data_parsed;

            next(null, data_parsed);
          }
        });

  }
}

module.exports = Parser;
