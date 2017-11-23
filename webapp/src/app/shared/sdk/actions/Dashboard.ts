/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Dashboard } from '../models';

export const DashboardActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Dashboard'), {
  USER: type('[Dashboard] user'),
  USER_SUCCESS: type('[Dashboard] user success'),
  USER_FAIL: type('[Dashboard] user fail'),

});
export const DashboardActions =
Object.assign(BaseLoopbackActionsFactory<Dashboard>(DashboardActionTypes), {

  /**
   * user Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  user: class implements Action {
    public readonly type = DashboardActionTypes.USER;
      
    constructor(public meta?: any) {}
  },
  /**
   * userSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  userSuccess: class implements Action {
    public readonly type = DashboardActionTypes.USER_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * userFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  userFail: class implements Action {
    public readonly type = DashboardActionTypes.USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});