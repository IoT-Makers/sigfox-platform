/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Geoloc } from '../models';

export const GeolocActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Geoloc'), {
  POST_SIGFOX: type('[Geoloc] postSigfox'),
  POST_SIGFOX_SUCCESS: type('[Geoloc] postSigfox success'),
  POST_SIGFOX_FAIL: type('[Geoloc] postSigfox fail'),

});
export const GeolocActions =
Object.assign(BaseLoopbackActionsFactory<Geoloc>(GeolocActionTypes), {

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
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
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