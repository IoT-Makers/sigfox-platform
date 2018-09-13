/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Connector } from '../models';

export const ConnectorActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Connector'), {
  GET_USER: type('[Connector] getUser'),
  GET_USER_SUCCESS: type('[Connector] getUser success'),
  GET_USER_FAIL: type('[Connector] getUser fail'),

  CREATE_SIGFOX_BACKEND_CALLBACKS: type('[Connector] createSigfoxBackendCallbacks'),
  CREATE_SIGFOX_BACKEND_CALLBACKS_SUCCESS: type('[Connector] createSigfoxBackendCallbacks success'),
  CREATE_SIGFOX_BACKEND_CALLBACKS_FAIL: type('[Connector] createSigfoxBackendCallbacks fail'),

});
export const ConnectorActions =
Object.assign(BaseLoopbackActionsFactory<Connector>(ConnectorActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Connector id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = ConnectorActionTypes.GET_USER;
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
    public readonly type = ConnectorActionTypes.GET_USER_SUCCESS;
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
    public readonly type = ConnectorActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createSigfoxBackendCallbacks Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} req 
   * @param {string} devicetypeId 
   * @param {any} meta (optional).
   * 
   */
  createSigfoxBackendCallbacks: class implements Action {
    public readonly type = ConnectorActionTypes.CREATE_SIGFOX_BACKEND_CALLBACKS;
      public payload: {req: any, devicetypeId: any, customHeaders};

    constructor(req: any = {}, devicetypeId: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, devicetypeId, customHeaders};
    }
  },
  /**
   * createSigfoxBackendCallbacksSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createSigfoxBackendCallbacksSuccess: class implements Action {
    public readonly type = ConnectorActionTypes.CREATE_SIGFOX_BACKEND_CALLBACKS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createSigfoxBackendCallbacksFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createSigfoxBackendCallbacksFail: class implements Action {
    public readonly type = ConnectorActionTypes.CREATE_SIGFOX_BACKEND_CALLBACKS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});