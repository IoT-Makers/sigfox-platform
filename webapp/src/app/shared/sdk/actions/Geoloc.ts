/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Geoloc } from '../models';

export const GeolocActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Geoloc'), {
  GET_GEOLOCS_BY_DEVICE_ID: type('[Geoloc] getGeolocsByDeviceId'),
  GET_GEOLOCS_BY_DEVICE_ID_SUCCESS: type('[Geoloc] getGeolocsByDeviceId success'),
  GET_GEOLOCS_BY_DEVICE_ID_FAIL: type('[Geoloc] getGeolocsByDeviceId fail'),

});
export const GeolocActions =
Object.assign(BaseLoopbackActionsFactory<Geoloc>(GeolocActionTypes), {

  /**
   * getGeolocsByDeviceId Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId the device ID to track
   * @param {string} dateBegin the starting date-time
   * @param {string} dateEnd the ending date-time
   * @param {any} meta (optional).
   * 
   */
  getGeolocsByDeviceId: class implements Action {
    public readonly type = GeolocActionTypes.GET_GEOLOCS_BY_DEVICE_ID;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd};
    }
  },
  /**
   * getGeolocsByDeviceIdSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getGeolocsByDeviceIdSuccess: class implements Action {
    public readonly type = GeolocActionTypes.GET_GEOLOCS_BY_DEVICE_ID_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getGeolocsByDeviceIdFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getGeolocsByDeviceIdFail: class implements Action {
    public readonly type = GeolocActionTypes.GET_GEOLOCS_BY_DEVICE_ID_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});