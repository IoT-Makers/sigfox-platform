/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AlertHistory } from '../models';

export const AlertHistoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AlertHistory'), {
  GET_DEVICE: type('[AlertHistory] getDevice'),
  GET_DEVICE_SUCCESS: type('[AlertHistory] getDevice success'),
  GET_DEVICE_FAIL: type('[AlertHistory] getDevice fail'),

  GET_USER: type('[AlertHistory] getUser'),
  GET_USER_SUCCESS: type('[AlertHistory] getUser success'),
  GET_USER_FAIL: type('[AlertHistory] getUser fail'),

  GET_ORGANIZATION: type('[AlertHistory] getOrganization'),
  GET_ORGANIZATION_SUCCESS: type('[AlertHistory] getOrganization success'),
  GET_ORGANIZATION_FAIL: type('[AlertHistory] getOrganization fail'),

  GET_CONNECTOR: type('[AlertHistory] getConnector'),
  GET_CONNECTOR_SUCCESS: type('[AlertHistory] getConnector success'),
  GET_CONNECTOR_FAIL: type('[AlertHistory] getConnector fail'),

});
export const AlertHistoryActions =
Object.assign(BaseLoopbackActionsFactory<AlertHistory>(AlertHistoryActionTypes), {

  /**
   * getDevice Action.
   * Fetches belongsTo relation Device.
   *
   * @param {any} id AlertHistory id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDevice: class implements Action {
    public readonly type = AlertHistoryActionTypes.GET_DEVICE;
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
    public readonly type = AlertHistoryActionTypes.GET_DEVICE_SUCCESS;
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
    public readonly type = AlertHistoryActionTypes.GET_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id AlertHistory id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = AlertHistoryActionTypes.GET_USER;
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
    public readonly type = AlertHistoryActionTypes.GET_USER_SUCCESS;
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
    public readonly type = AlertHistoryActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganization Action.
   * Fetches belongsTo relation Organization.
   *
   * @param {any} id AlertHistory id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getOrganization: class implements Action {
    public readonly type = AlertHistoryActionTypes.GET_ORGANIZATION;
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
    public readonly type = AlertHistoryActionTypes.GET_ORGANIZATION_SUCCESS;
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
    public readonly type = AlertHistoryActionTypes.GET_ORGANIZATION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getConnector Action.
   * Fetches belongsTo relation Connector.
   *
   * @param {any} id AlertHistory id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getConnector: class implements Action {
    public readonly type = AlertHistoryActionTypes.GET_CONNECTOR;
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
    public readonly type = AlertHistoryActionTypes.GET_CONNECTOR_SUCCESS;
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
    public readonly type = AlertHistoryActionTypes.GET_CONNECTOR_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});