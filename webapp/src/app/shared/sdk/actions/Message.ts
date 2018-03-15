/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  DOWNLOAD: type('[Message] download'),
  DOWNLOAD_SUCCESS: type('[Message] download success'),
  DOWNLOAD_FAIL: type('[Message] download fail'),

  PUT_SIGFOX: type('[Message] putSigfox'),
  PUT_SIGFOX_SUCCESS: type('[Message] putSigfox success'),
  PUT_SIGFOX_FAIL: type('[Message] putSigfox fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId 
   * @param {string} type 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = MessageActionTypes.DOWNLOAD;
      public payload: {deviceId: any, type: any, req: any, res: any};

    constructor(deviceId: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, type, req, res};
    }
  },
  /**
   * downloadSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  downloadSuccess: class implements Action {
    public readonly type = MessageActionTypes.DOWNLOAD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * downloadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  downloadFail: class implements Action {
    public readonly type = MessageActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * putSigfox Action.
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
  putSigfox: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX;
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
    }
  },
  /**
   * putSigfoxSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  putSigfoxSuccess: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * putSigfoxFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  putSigfoxFail: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});