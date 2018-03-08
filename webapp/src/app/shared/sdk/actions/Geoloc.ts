/* tslint:disable */
import {Action} from '@ngrx/store';
import {type} from '../util';
import {BaseLoopbackActionsFactory, BaseLoopbackActionTypesFactory} from './base';
import {Geoloc} from '../models';

export const GeolocActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Geoloc'), {
  CREATE_SIGFOX: type('[Geoloc] createSigfox'),
  CREATE_SIGFOX_SUCCESS: type('[Geoloc] createSigfox success'),
  CREATE_SIGFOX_FAIL: type('[Geoloc] createSigfox fail'),

});
export const GeolocActions =
Object.assign(BaseLoopbackActionsFactory<Geoloc>(GeolocActionTypes), {

  /**
   * createSigfox Action.
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
  createSigfox: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_SIGFOX;
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
    }
  },
  /**
   * createSigfoxSuccess Action.
   *
   * @param {any} id
   * @param {object} data
   * @param {any} meta (optional).
   *
   */
  createSigfoxSuccess: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_SIGFOX_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createSigfoxFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   *
   */
  createSigfoxFail: class implements Action {
    public readonly type = GeolocActionTypes.CREATE_SIGFOX_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});
