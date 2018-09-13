/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Role } from '../models';

export const RoleActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Role'), {
  FIND_BY_ID_PRINCIPALS: type('[Role] findByIdPrincipals'),
  FIND_BY_ID_PRINCIPALS_SUCCESS: type('[Role] findByIdPrincipals success'),
  FIND_BY_ID_PRINCIPALS_FAIL: type('[Role] findByIdPrincipals fail'),

  DESTROY_BY_ID_PRINCIPALS: type('[Role] destroyByIdPrincipals'),
  DESTROY_BY_ID_PRINCIPALS_SUCCESS: type('[Role] destroyByIdPrincipals success'),
  DESTROY_BY_ID_PRINCIPALS_FAIL: type('[Role] destroyByIdPrincipals fail'),

  UPDATE_BY_ID_PRINCIPALS: type('[Role] updateByIdPrincipals'),
  UPDATE_BY_ID_PRINCIPALS_SUCCESS: type('[Role] updateByIdPrincipals success'),
  UPDATE_BY_ID_PRINCIPALS_FAIL: type('[Role] updateByIdPrincipals fail'),

  GET_PRINCIPALS: type('[Role] getPrincipals'),
  GET_PRINCIPALS_SUCCESS: type('[Role] getPrincipals success'),
  GET_PRINCIPALS_FAIL: type('[Role] getPrincipals fail'),

  CREATE_PRINCIPALS: type('[Role] createPrincipals'),
  CREATE_PRINCIPALS_SUCCESS: type('[Role] createPrincipals success'),
  CREATE_PRINCIPALS_FAIL: type('[Role] createPrincipals fail'),

  DELETE_PRINCIPALS: type('[Role] deletePrincipals'),
  DELETE_PRINCIPALS_SUCCESS: type('[Role] deletePrincipals success'),
  DELETE_PRINCIPALS_FAIL: type('[Role] deletePrincipals fail'),

  CREATE_MANY_PRINCIPALS: type('[Role] createManyPrincipals'),
  CREATE_MANY_PRINCIPALS_SUCCESS: type('[Role] createManyPrincipals success'),
  CREATE_MANY_PRINCIPALS_FAIL: type('[Role] createManyPrincipals fail'),

});
export const RoleActions =
Object.assign(BaseLoopbackActionsFactory<Role>(RoleActionTypes), {

  /**
   * findByIdPrincipals Action.
   * Find a related item by id for principals.
   *
   * @param {any} id Role id
   * @param {any} fk Foreign key for principals
   * @param {any} meta (optional).
   * 
   */
  findByIdPrincipals: class implements Action {
    public readonly type = RoleActionTypes.FIND_BY_ID_PRINCIPALS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.FIND_BY_ID_PRINCIPALS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.FIND_BY_ID_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdPrincipals Action.
   * Delete a related item by id for principals.
   *
   * @param {any} id Role id
   * @param {any} fk Foreign key for principals
   * @param {any} meta (optional).
   * 
   */
  destroyByIdPrincipals: class implements Action {
    public readonly type = RoleActionTypes.DESTROY_BY_ID_PRINCIPALS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.DESTROY_BY_ID_PRINCIPALS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.DESTROY_BY_ID_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdPrincipals Action.
   * Update a related item by id for principals.
   *
   * @param {any} id Role id
   * @param {any} fk Foreign key for principals
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdPrincipals: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_BY_ID_PRINCIPALS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_BY_ID_PRINCIPALS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_BY_ID_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getPrincipals Action.
   * Queries principals of Role.
   *
   * @param {any} id Role id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getPrincipals: class implements Action {
    public readonly type = RoleActionTypes.GET_PRINCIPALS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.GET_PRINCIPALS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.GET_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createPrincipals Action.
   * Creates a new instance in principals of this model.
   *
   * @param {any} id Role id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createPrincipals: class implements Action {
    public readonly type = RoleActionTypes.CREATE_PRINCIPALS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.CREATE_PRINCIPALS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.CREATE_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deletePrincipals Action.
   * Deletes all principals of this model.
   *
   * @param {any} id Role id
   * @param {any} meta (optional).
   * 
   */
  deletePrincipals: class implements Action {
    public readonly type = RoleActionTypes.DELETE_PRINCIPALS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deletePrincipalsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deletePrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.DELETE_PRINCIPALS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deletePrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deletePrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.DELETE_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyPrincipals Action.
   * Creates a new instance in principals of this model.
   *
   * @param {any} id Role id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyPrincipals: class implements Action {
    public readonly type = RoleActionTypes.CREATE_MANY_PRINCIPALS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyPrincipalsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyPrincipalsSuccess: class implements Action {
    public readonly type = RoleActionTypes.CREATE_MANY_PRINCIPALS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyPrincipalsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyPrincipalsFail: class implements Action {
    public readonly type = RoleActionTypes.CREATE_MANY_PRINCIPALS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});