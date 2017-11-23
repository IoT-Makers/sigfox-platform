/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  GET_DEVICE: type('[Message] getDevice'),
  GET_DEVICE_SUCCESS: type('[Message] getDevice success'),
  GET_DEVICE_FAIL: type('[Message] getDevice fail'),

  GET_USER: type('[Message] getUser'),
  GET_USER_SUCCESS: type('[Message] getUser success'),
  GET_USER_FAIL: type('[Message] getUser fail'),

  GET_ORGANIZATION: type('[Message] getOrganization'),
  GET_ORGANIZATION_SUCCESS: type('[Message] getOrganization success'),
  GET_ORGANIZATION_FAIL: type('[Message] getOrganization fail'),

  PUT_MESSAGE: type('[Message] putMessage'),
  PUT_MESSAGE_SUCCESS: type('[Message] putMessage success'),
  PUT_MESSAGE_FAIL: type('[Message] putMessage fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * getDevice Action.
   * Fetches belongsTo relation Device.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDevice: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getDeviceSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getDeviceSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getDeviceFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getDeviceFail: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = MessageActionTypes.GET_USER;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getUserSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getUserSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_USER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getUserFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getUserFail: class implements Action {
    public readonly type = MessageActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganization Action.
   * Fetches belongsTo relation Organization.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getOrganization: class implements Action {
    public readonly type = MessageActionTypes.GET_ORGANIZATION;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getOrganizationSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getOrganizationSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_ORGANIZATION_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getOrganizationFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getOrganizationFail: class implements Action {
    public readonly type = MessageActionTypes.GET_ORGANIZATION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

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