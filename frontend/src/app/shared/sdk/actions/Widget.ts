/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Widget } from '../models';

export const WidgetActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Widget'), {
  GET_USER: type('[Widget] getUser'),
  GET_USER_SUCCESS: type('[Widget] getUser success'),
  GET_USER_FAIL: type('[Widget] getUser fail'),

  GET_DASHBOARD: type('[Widget] getDashboard'),
  GET_DASHBOARD_SUCCESS: type('[Widget] getDashboard success'),
  GET_DASHBOARD_FAIL: type('[Widget] getDashboard fail'),

});
export const WidgetActions =
Object.assign(BaseLoopbackActionsFactory<Widget>(WidgetActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Widget id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = WidgetActionTypes.GET_USER;
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
    public readonly type = WidgetActionTypes.GET_USER_SUCCESS;
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
    public readonly type = WidgetActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDashboard Action.
   * Fetches belongsTo relation Dashboard.
   *
   * @param {any} id Widget id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDashboard: class implements Action {
    public readonly type = WidgetActionTypes.GET_DASHBOARD;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getDashboardSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getDashboardSuccess: class implements Action {
    public readonly type = WidgetActionTypes.GET_DASHBOARD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getDashboardFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getDashboardFail: class implements Action {
    public readonly type = WidgetActionTypes.GET_DASHBOARD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});