/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AccessToken } from '../models';

export const AccessTokenActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AccessToken'), {
  GET_USER: type('[AccessToken] getUser'),
  GET_USER_SUCCESS: type('[AccessToken] getUser success'),
  GET_USER_FAIL: type('[AccessToken] getUser fail'),

});
export const AccessTokenActions =
Object.assign(BaseLoopbackActionsFactory<AccessToken>(AccessTokenActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id AccessToken id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = AccessTokenActionTypes.GET_USER;
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
    public readonly type = AccessTokenActionTypes.GET_USER_SUCCESS;
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
    public readonly type = AccessTokenActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});