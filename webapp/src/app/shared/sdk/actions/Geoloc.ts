/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Geoloc } from '../models';

export const GeolocActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Geoloc'), {
  GET_DEVICE: type('[Geoloc] getDevice'),
  GET_DEVICE_SUCCESS: type('[Geoloc] getDevice success'),
  GET_DEVICE_FAIL: type('[Geoloc] getDevice fail'),

  GET_MESSAGE: type('[Geoloc] getMessage'),
  GET_MESSAGE_SUCCESS: type('[Geoloc] getMessage success'),
  GET_MESSAGE_FAIL: type('[Geoloc] getMessage fail'),

  GET_USER: type('[Geoloc] getUser'),
  GET_USER_SUCCESS: type('[Geoloc] getUser success'),
  GET_USER_FAIL: type('[Geoloc] getUser fail'),

  GET_ORGANIZATION: type('[Geoloc] getOrganization'),
  GET_ORGANIZATION_SUCCESS: type('[Geoloc] getOrganization success'),
  GET_ORGANIZATION_FAIL: type('[Geoloc] getOrganization fail'),

  CREATE_FROM_PARSED_PAYLOAD: type('[Geoloc] createFromParsedPayload'),
  CREATE_FROM_PARSED_PAYLOAD_SUCCESS: type('[Geoloc] createFromParsedPayload success'),
  CREATE_FROM_PARSED_PAYLOAD_FAIL: type('[Geoloc] createFromParsedPayload fail'),

  POST_SIGFOX: type('[Geoloc] postSigfox'),
  POST_SIGFOX_SUCCESS: type('[Geoloc] postSigfox success'),
  POST_SIGFOX_FAIL: type('[Geoloc] postSigfox fail'),

});
export const GeolocActions =
Object.assign(BaseLoopbackActionsFactory<Geoloc>(GeolocActionTypes), {

  /**
   * getDevice Action.
   * Fetches belongsTo relation Device.
   *
   * @param {any} id Geoloc id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDevice: class implements Action {
    public readonly type = GeolocActionTypes.GET_DEVICE;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
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
    public readonly type = GeolocActionTypes.GET_DEVICE_SUCCESS;
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
    public readonly type = GeolocActionTypes.GET_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessage Action.
   * Fetches belongsTo relation Message.
   *
   * @param {any} id Geoloc id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getMessage: class implements Action {
    public readonly type = GeolocActionTypes.GET_MESSAGE;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getMessageSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getMessageSuccess: class implements Action {
    public readonly type = GeolocActionTypes.GET_MESSAGE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessageFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessageFail: class implements Action {
    public readonly type = GeolocActionTypes.GET_MESSAGE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Geoloc id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = GeolocActionTypes.GET_USER;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
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
    public readonly type = GeolocActionTypes.GET_USER_SUCCESS;
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
    public readonly type = GeolocActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganization Action.
   * Fetches belongsTo relation Organization.
   *
   * @param {any} id Geoloc id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getOrganization: class implements Action {
    public readonly type = GeolocActionTypes.GET_ORGANIZATION;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
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
    public readonly type = GeolocActionTypes.GET_ORGANIZATION_SUCCESS;
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
    public readonly type = GeolocActionTypes.GET_ORGANIZATION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createFromParsedPayload Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `message` – `{Message}` - The message object
   * @param {any} meta (optional).
   * 
   */
  createFromParsedPayload: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_FROM_PARSED_PAYLOAD;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * createFromParsedPayloadSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  createFromParsedPayloadSuccess: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_FROM_PARSED_PAYLOAD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createFromParsedPayloadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createFromParsedPayloadFail: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_FROM_PARSED_PAYLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * postSigfox Action.
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
  postSigfox: class implements Action {
    public readonly type = GeolocActionTypes.POST_SIGFOX;
      public payload: {req: any, data: any, customHeaders};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data, customHeaders};
    }
  },
  /**
   * postSigfoxSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  postSigfoxSuccess: class implements Action {
    public readonly type = GeolocActionTypes.POST_SIGFOX_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * postSigfoxFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  postSigfoxFail: class implements Action {
    public readonly type = GeolocActionTypes.POST_SIGFOX_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});