/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Beacon } from '../models';

export const BeaconActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Beacon'), {
  GET_USER: type('[Beacon] getUser'),
  GET_USER_SUCCESS: type('[Beacon] getUser success'),
  GET_USER_FAIL: type('[Beacon] getUser fail'),

});
export const BeaconActions =
Object.assign(BaseLoopbackActionsFactory<Beacon>(BeaconActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Beacon id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = BeaconActionTypes.GET_USER;
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
    public readonly type = BeaconActionTypes.GET_USER_SUCCESS;
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
    public readonly type = BeaconActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});