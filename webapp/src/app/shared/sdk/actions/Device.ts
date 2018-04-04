/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Device } from '../models';

export const DeviceActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Device'), {
  DOWNLOAD: type('[Device] download'),
  DOWNLOAD_SUCCESS: type('[Device] download success'),
  DOWNLOAD_FAIL: type('[Device] download fail'),

  TIME_SERIES: type('[Device] timeSeries'),
  TIME_SERIES_SUCCESS: type('[Device] timeSeries success'),
  TIME_SERIES_FAIL: type('[Device] timeSeries fail'),

  DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS: type('[Device] deleteDeviceMessagesAlertsGeolocs'),
  DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS_SUCCESS: type('[Device] deleteDeviceMessagesAlertsGeolocs success'),
  DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS_FAIL: type('[Device] deleteDeviceMessagesAlertsGeolocs fail'),

  GET_MESSAGES_FROM_SIGFOX_BACKEND: type('[Device] getMessagesFromSigfoxBackend'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_SUCCESS: type('[Device] getMessagesFromSigfoxBackend success'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_FAIL: type('[Device] getMessagesFromSigfoxBackend fail'),

});
export const DeviceActions =
Object.assign(BaseLoopbackActionsFactory<Device>(DeviceActionTypes), {

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} id 
   * @param {string} type 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = DeviceActionTypes.DOWNLOAD;
      public payload: {id: any, type: any, req: any, res: any};

    constructor(id: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, type, req, res};
    }
  },
  /**
   * downloadSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  downloadSuccess: class implements Action {
    public readonly type = DeviceActionTypes.DOWNLOAD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * downloadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  downloadFail: class implements Action {
    public readonly type = DeviceActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * timeSeries Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId Device Id
   * @param {string} dateBegin The starting date-time
   * @param {string} dateEnd The ending date-time
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  timeSeries: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any, req: any};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd, req};
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
   * deleteDeviceMessagesAlertsGeolocs Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId 
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceMessagesAlertsGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS;
      public payload: {deviceId: any, req: any};

    constructor(deviceId: any, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, req};
    }
  },
  /**
   * deleteDeviceMessagesAlertsGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceMessagesAlertsGeolocsSuccess: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * deleteDeviceMessagesAlertsGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteDeviceMessagesAlertsGeolocsFail: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS_FAIL;

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