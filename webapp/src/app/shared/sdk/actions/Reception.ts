/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Reception } from '../models';

export const ReceptionActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Reception'), {
  GET_BASE_STATIONS_BY_DEVICE_ID: type('[Reception] getBaseStationsByDeviceId'),
  GET_BASE_STATIONS_BY_DEVICE_ID_SUCCESS: type('[Reception] getBaseStationsByDeviceId success'),
  GET_BASE_STATIONS_BY_DEVICE_ID_FAIL: type('[Reception] getBaseStationsByDeviceId fail'),

});
export const ReceptionActions =
Object.assign(BaseLoopbackActionsFactory<Reception>(ReceptionActionTypes), {

  /**
   * getBaseStationsByDeviceId Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - the userId and deviceId
   * @param {any} meta (optional).
   * 
   */
  getBaseStationsByDeviceId: class implements Action {
    public readonly type = ReceptionActionTypes.GET_BASE_STATIONS_BY_DEVICE_ID;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getBaseStationsByDeviceIdSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getBaseStationsByDeviceIdSuccess: class implements Action {
    public readonly type = ReceptionActionTypes.GET_BASE_STATIONS_BY_DEVICE_ID_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getBaseStationsByDeviceIdFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getBaseStationsByDeviceIdFail: class implements Action {
    public readonly type = ReceptionActionTypes.GET_BASE_STATIONS_BY_DEVICE_ID_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});