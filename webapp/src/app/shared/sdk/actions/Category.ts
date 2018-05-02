/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Category } from '../models';

export const CategoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Category'), {
  DOWNLOAD: type('[Category] download'),
  DOWNLOAD_SUCCESS: type('[Category] download success'),
  DOWNLOAD_FAIL: type('[Category] download fail'),

  DOWNLOAD_FROM_ORGANIZATION: type('[Category] downloadFromOrganization'),
  DOWNLOAD_FROM_ORGANIZATION_SUCCESS: type('[Category] downloadFromOrganization success'),
  DOWNLOAD_FROM_ORGANIZATION_FAIL: type('[Category] downloadFromOrganization fail'),

});
export const CategoryActions =
Object.assign(BaseLoopbackActionsFactory<Category>(CategoryActionTypes), {

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} categoryId 
   * @param {string} type 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = CategoryActionTypes.DOWNLOAD;
      public payload: {categoryId: any, type: any, req: any, res: any};

    constructor(categoryId: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {categoryId, type, req, res};
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
    public readonly type = CategoryActionTypes.DOWNLOAD_SUCCESS;
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
    public readonly type = CategoryActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * downloadFromOrganization Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} organizationId 
   * @param {string} categoryId 
   * @param {string} type 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  downloadFromOrganization: class implements Action {
    public readonly type = CategoryActionTypes.DOWNLOAD_FROM_ORGANIZATION;
      public payload: {organizationId: any, categoryId: any, type: any, req: any, res: any};

    constructor(organizationId: any, categoryId: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {organizationId, categoryId, type, req, res};
    }
  },
  /**
   * downloadFromOrganizationSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  downloadFromOrganizationSuccess: class implements Action {
    public readonly type = CategoryActionTypes.DOWNLOAD_FROM_ORGANIZATION_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * downloadFromOrganizationFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  downloadFromOrganizationFail: class implements Action {
    public readonly type = CategoryActionTypes.DOWNLOAD_FROM_ORGANIZATION_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});