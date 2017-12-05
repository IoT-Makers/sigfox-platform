/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Device } from '../models';

export const DeviceActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Device'), {
  GRAPH_DATA: type('[Device] graphData'),
  GRAPH_DATA_SUCCESS: type('[Device] graphData success'),
  GRAPH_DATA_FAIL: type('[Device] graphData fail'),

});
export const DeviceActions =
Object.assign(BaseLoopbackActionsFactory<Device>(DeviceActionTypes), {

  /**
   * graphData Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId Device ID
   * @param {string} dateBegin the starting date-time
   * @param {string} dateEnd the ending date-time
   * @param {any} meta (optional).
   * 
   */
  graphData: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd};
    }
  },
  /**
   * graphDataSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  graphDataSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * graphDataFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  graphDataFail: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});