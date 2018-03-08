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
}

module.exports = Parser;
