/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Alert } from '../models';

export const AlertActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Alert'), {
  GET_DEVICE: type('[Alert] getDevice'),
  GET_DEVICE_SUCCESS: type('[Alert] getDevice success'),
  GET_DEVICE_FAIL: type('[Alert] getDevice fail'),

  GET_USER: type('[Alert] getUser'),
  GET_USER_SUCCESS: type('[Alert] getUser success'),
  GET_USER_FAIL: type('[Alert] getUser fail'),

  GET_ORGANIZATION: type('[Alert] getOrganization'),
  GET_ORGANIZATION_SUCCESS: type('[Alert] getOrganization success'),
  GET_ORGANIZATION_FAIL: type('[Alert] getOrganization fail'),

  GET_CONNECTOR: type('[Alert] getConnector'),
  GET_CONNECTOR_SUCCESS: type('[Alert] getConnector success'),
  GET_CONNECTOR_FAIL: type('[Alert] getConnector fail'),

  TRIGGER_BY_DEVICE: type('[Alert] triggerByDevice'),
  TRIGGER_BY_DEVICE_SUCCESS: type('[Alert] triggerByDevice success'),
  TRIGGER_BY_DEVICE_FAIL: type('[Alert] triggerByDevice fail'),

  TRIGGER_BY_SIGFOX_GEOLOC: type('[Alert] triggerBySigfoxGeoloc'),
  TRIGGER_BY_SIGFOX_GEOLOC_SUCCESS: type('[Alert] triggerBySigfoxGeoloc success'),
  TRIGGER_BY_SIGFOX_GEOLOC_FAIL: type('[Alert] triggerBySigfoxGeoloc fail'),

  TEST: type('[Alert] test'),
  TEST_SUCCESS: type('[Alert] test success'),
  TEST_FAIL: type('[Alert] test fail'),

});
export const AlertActions =
Object.assign(BaseLoopbackActionsFactory<Alert>(AlertActionTypes), {

  /**
   * getDevice Action.
   * Fetches belongsTo relation Device.
   *
   * @param {any} id Alert id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDevice: class implements Action {
    public readonly type = AlertActionTypes.GET_DEVICE;
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
    public readonly type = AlertActionTypes.GET_DEVICE_SUCCESS;
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
    public readonly type = AlertActionTypes.GET_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Alert id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = AlertActionTypes.GET_USER;
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
    public readonly type = AlertActionTypes.GET_USER_SUCCESS;
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
    public readonly type = AlertActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganization Action.
   * Fetches belongsTo relation Organization.
   *
   * @param {any} id Alert id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getOrganization: class implements Action {
    public readonly type = AlertActionTypes.GET_ORGANIZATION;
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
    public readonly type = AlertActionTypes.GET_ORGANIZATION_SUCCESS;
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
    public readonly type = AlertActionTypes.GET_ORGANIZATION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getConnector Action.
   * Fetches belongsTo relation Connector.
   *
   * @param {any} id Alert id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getConnector: class implements Action {
    public readonly type = AlertActionTypes.GET_CONNECTOR;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getConnectorSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getConnectorSuccess: class implements Action {
    public readonly type = AlertActionTypes.GET_CONNECTOR_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getConnectorFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getConnectorFail: class implements Action {
    public readonly type = AlertActionTypes.GET_CONNECTOR_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * triggerByDevice Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `data_parsed` – `{any}` - The parsed data
   *
   *  - `device` – `{object}` - The device object
   *
   *  - `req` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  triggerByDevice: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_DEVICE;
      public payload: {data_parsed: any, device: any, req: any, customHeaders};

    constructor(data_parsed: any, device: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {data_parsed, device, req, customHeaders};
    }
  },
  /**
   * triggerByDeviceSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  triggerByDeviceSuccess: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_DEVICE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * triggerByDeviceFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  triggerByDeviceFail: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * triggerBySigfoxGeoloc Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `lat` – `{number}` - The lat of the device
   *
   *  - `lng` – `{number}` - The lng of the device
   *
   *  - `deviceId` – `{string}` - The device ID
   *
   *  - `req` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  triggerBySigfoxGeoloc: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_SIGFOX_GEOLOC;
      public payload: {lat: any, lng: any, deviceId: any, req: any, customHeaders};

    constructor(lat: any, lng: any, deviceId: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {lat, lng, deviceId, req, customHeaders};
    }
  },
  /**
   * triggerBySigfoxGeolocSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  triggerBySigfoxGeolocSuccess: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_SIGFOX_GEOLOC_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * triggerBySigfoxGeolocFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  triggerBySigfoxGeolocFail: class implements Action {
    public readonly type = AlertActionTypes.TRIGGER_BY_SIGFOX_GEOLOC_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * test Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `alertId` – `{string}` - The alert ID
   *
   *  - `req` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  test: class implements Action {
    public readonly type = AlertActionTypes.TEST;
      public payload: {alertId: any, req: any, customHeaders};

    constructor(alertId: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {alertId, req, customHeaders};
    }
  },
  /**
   * testSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  testSuccess: class implements Action {
    public readonly type = AlertActionTypes.TEST_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * testFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  testFail: class implements Action {
    public readonly type = AlertActionTypes.TEST_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});