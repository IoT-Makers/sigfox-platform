/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, RoleMapping } from '../models';

export const RoleMappingActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('RoleMapping'), {
  GET_ROLE: type('[RoleMapping] getRole'),
  GET_ROLE_SUCCESS: type('[RoleMapping] getRole success'),
  GET_ROLE_FAIL: type('[RoleMapping] getRole fail'),

});
export const RoleMappingActions =
Object.assign(BaseLoopbackActionsFactory<RoleMapping>(RoleMappingActionTypes), {

  /**
   * getRole Action.
   * Fetches belongsTo relation role.
   *
   * @param {any} id RoleMapping id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getRole: class implements Action {
    public readonly type = RoleMappingActionTypes.GET_ROLE;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getRoleSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getRoleSuccess: class implements Action {
    public readonly type = RoleMappingActionTypes.GET_ROLE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getRoleFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getRoleFail: class implements Action {
    public readonly type = RoleMappingActionTypes.GET_ROLE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});