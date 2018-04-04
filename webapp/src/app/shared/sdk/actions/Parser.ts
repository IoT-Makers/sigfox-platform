/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Parser } from '../models';

export const ParserActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Parser'), {
  PARSE_ALL_MESSAGES: type('[Parser] parseAllMessages'),
  PARSE_ALL_MESSAGES_SUCCESS: type('[Parser] parseAllMessages success'),
  PARSE_ALL_MESSAGES_FAIL: type('[Parser] parseAllMessages fail'),

  PARSE_ALL_DEVICES: type('[Parser] parseAllDevices'),
  PARSE_ALL_DEVICES_SUCCESS: type('[Parser] parseAllDevices success'),
  PARSE_ALL_DEVICES_FAIL: type('[Parser] parseAllDevices fail'),

});
export const ParserActions =
Object.assign(BaseLoopbackActionsFactory<Parser>(ParserActionTypes), {

  /**
   * parseAllMessages Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `id` – `{string}` - Device Id
   *
   *  - `req` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  parseAllMessages: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_MESSAGES;
      public payload: {id: any, req: any};

    constructor(id: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, req};
    }
  },
  /**
   * parseAllMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  parseAllMessagesSuccess: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * parseAllMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  parseAllMessagesFail: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * parseAllDevices Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `id` – `{string}` - Parser Id
   *
   *  - `req` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  parseAllDevices: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_DEVICES;
      public payload: {id: any, req: any};

    constructor(id: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, req};
    }
  },
  /**
   * parseAllDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  parseAllDevicesSuccess: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * parseAllDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  parseAllDevicesFail: class implements Action {
    public readonly type = ParserActionTypes.PARSE_ALL_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});