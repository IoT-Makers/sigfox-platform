/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AppSetting } from '../models';

export const AppSettingActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AppSetting'), {
  GET_VERSION: type('[AppSetting] getVersion'),
  GET_VERSION_SUCCESS: type('[AppSetting] getVersion success'),
  GET_VERSION_FAIL: type('[AppSetting] getVersion fail'),

});
export const AppSettingActions =
Object.assign(BaseLoopbackActionsFactory<AppSetting>(AppSettingActionTypes), {

  /**
   * getVersion Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {any} meta (optional).
   * 
   */
  getVersion: class implements Action {
    public readonly type = AppSettingActionTypes.GET_VERSION;
      
    constructor(public meta?: any) {}
  },
  /**
   * getVersionSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getVersionSuccess: class implements Action {
    public readonly type = AppSettingActionTypes.GET_VERSION_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getVersionFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getVersionFail: class implements Action {
    public readonly type = AppSettingActionTypes.GET_VERSION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});