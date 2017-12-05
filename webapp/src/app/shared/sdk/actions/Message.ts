/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  PUT_MESSAGE: type('[Message] putMessage'),
  PUT_MESSAGE_SUCCESS: type('[Message] putMessage success'),
  PUT_MESSAGE_FAIL: type('[Message] putMessage fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * putMessage Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `data` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  putMessage: class implements Action {
    public readonly type = MessageActionTypes.PUT_MESSAGE;
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
    }
  },
  /**
   * putMessageSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  putMessageSuccess: class implements Action {
    public readonly type = MessageActionTypes.PUT_MESSAGE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * putMessageFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  putMessageFail: class implements Action {
    public readonly type = MessageActionTypes.PUT_MESSAGE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});