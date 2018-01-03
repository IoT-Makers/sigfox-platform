/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Device } from '../models';

export const DeviceActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Device'), {
  TIME_SERIES: type('[Device] timeSeries'),
  TIME_SERIES_SUCCESS: type('[Device] timeSeries success'),
  TIME_SERIES_FAIL: type('[Device] timeSeries fail'),

  DELETE_DEVICE_AND_MESSAGES: type('[Device] deleteDeviceAndMessages'),
  DELETE_DEVICE_AND_MESSAGES_SUCCESS: type('[Device] deleteDeviceAndMessages success'),
  DELETE_DEVICE_AND_MESSAGES_FAIL: type('[Device] deleteDeviceAndMessages fail'),

  GET_MESSAGES_FROM_SIGFOX_BACKEND: type('[Device] getMessagesFromSigfoxBackend'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_SUCCESS: type('[Device] getMessagesFromSigfoxBackend success'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_FAIL: type('[Device] getMessagesFromSigfoxBackend fail'),

});
export const DeviceActions =
Object.assign(BaseLoopbackActionsFactory<Device>(DeviceActionTypes), {

  /**
   * timeSeries Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId the deviceId
   * @param {string} dateBegin the starting date-time
   * @param {string} dateEnd the ending date-time
   * @param {any} meta (optional).
   * 
   */
  timeSeries: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd};
    }
  },
  /**
   * timeSeriesSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  timeSeriesSuccess: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * timeSeriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  timeSeriesFail: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDeviceAndMessages Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId 
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceAndMessages: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_AND_MESSAGES;
      public payload: {deviceId: any, req: any};

    constructor(deviceId: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, req};
    }
  },
  /**
   * deleteDeviceAndMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceAndMessagesSuccess: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_AND_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * deleteDeviceAndMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceAndMessagesFail: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_AND_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessagesFromSigfoxBackend Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} id Device Id
   * @param {number} limit Limit retrieved messages (max 100)
   * @param {number} before Before
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackend: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND;
      public payload: {id: any, limit: any, before: any, req: any};

    constructor(id: any, limit: any = {}, before: any = {}, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, limit, before, req};
    }
  },
  /**
   * getMessagesFromSigfoxBackendSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackendSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessagesFromSigfoxBackendFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackendFail: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});