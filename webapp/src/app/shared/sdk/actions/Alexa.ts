/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Alexa } from '../models';

export const AlexaActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Alexa'), {
  POST_INTENTS: type('[Alexa] postIntents'),
  POST_INTENTS_SUCCESS: type('[Alexa] postIntents success'),
  POST_INTENTS_FAIL: type('[Alexa] postIntents fail'),

});
export const AlexaActions =
Object.assign(BaseLoopbackActionsFactory<Alexa>(AlexaActionTypes), {

  /**
   * postIntents Action.
   * Give Amazon Alexa a device position response
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `body` – `{object}` - Alexa request
   * @param {any} meta (optional).
   * 
   */
  postIntents: class implements Action {
    public readonly type = AlexaActionTypes.POST_INTENTS;
      public payload: {req: any, body: any, customHeaders};

    constructor(req: any = {}, body: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, body, customHeaders};
    }
  },
  /**
   * postIntentsSuccess Action.
   * 
   * @param {any} id 
   * The response Alexa will say
   * @param {any} meta (optional).
   * 
   */
  postIntentsSuccess: class implements Action {
    public readonly type = AlexaActionTypes.POST_INTENTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * postIntentsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  postIntentsFail: class implements Action {
    public readonly type = AlexaActionTypes.POST_INTENTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});