/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Dashboard } from '../models';

export const DashboardActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Dashboard'), {
  GET_USER: type('[Dashboard] getUser'),
  GET_USER_SUCCESS: type('[Dashboard] getUser success'),
  GET_USER_FAIL: type('[Dashboard] getUser fail'),

  FIND_BY_ID_WIDGETS: type('[Dashboard] findByIdWidgets'),
  FIND_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] findByIdWidgets success'),
  FIND_BY_ID_WIDGETS_FAIL: type('[Dashboard] findByIdWidgets fail'),

  DESTROY_BY_ID_WIDGETS: type('[Dashboard] destroyByIdWidgets'),
  DESTROY_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] destroyByIdWidgets success'),
  DESTROY_BY_ID_WIDGETS_FAIL: type('[Dashboard] destroyByIdWidgets fail'),

  UPDATE_BY_ID_WIDGETS: type('[Dashboard] updateByIdWidgets'),
  UPDATE_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] updateByIdWidgets success'),
  UPDATE_BY_ID_WIDGETS_FAIL: type('[Dashboard] updateByIdWidgets fail'),

  GET_WIDGETS: type('[Dashboard] getWidgets'),
  GET_WIDGETS_SUCCESS: type('[Dashboard] getWidgets success'),
  GET_WIDGETS_FAIL: type('[Dashboard] getWidgets fail'),

  CREATE_WIDGETS: type('[Dashboard] createWidgets'),
  CREATE_WIDGETS_SUCCESS: type('[Dashboard] createWidgets success'),
  CREATE_WIDGETS_FAIL: type('[Dashboard] createWidgets fail'),

  DELETE_WIDGETS: type('[Dashboard] deleteWidgets'),
  DELETE_WIDGETS_SUCCESS: type('[Dashboard] deleteWidgets success'),
  DELETE_WIDGETS_FAIL: type('[Dashboard] deleteWidgets fail'),

  CREATE_MANY_WIDGETS: type('[Dashboard] createManyWidgets'),
  CREATE_MANY_WIDGETS_SUCCESS: type('[Dashboard] createManyWidgets success'),
  CREATE_MANY_WIDGETS_FAIL: type('[Dashboard] createManyWidgets fail'),

});
export const DashboardActions =
Object.assign(BaseLoopbackActionsFactory<Dashboard>(DashboardActionTypes), {

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Dashboard id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = DashboardActionTypes.GET_USER;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
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
    public readonly type = DashboardActionTypes.GET_USER_SUCCESS;
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
    public readonly type = DashboardActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdWidgets Action.
   * Find a related item by id for Widgets.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Widgets
   * @param {any} meta (optional).
   * 
   */
  findByIdWidgets: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_WIDGETS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdWidgetsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_WIDGETS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdWidgets Action.
   * Delete a related item by id for Widgets.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Widgets
   * @param {any} meta (optional).
   * 
   */
  destroyByIdWidgets: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_WIDGETS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdWidgetsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_WIDGETS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdWidgets Action.
   * Update a related item by id for Widgets.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Widgets
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdWidgets: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_WIDGETS;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdWidgetsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_WIDGETS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getWidgets Action.
   * Queries Widgets of Dashboard.
   *
   * @param {any} id Dashboard id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getWidgets: class implements Action {
    public readonly type = DashboardActionTypes.GET_WIDGETS;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getWidgetsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.GET_WIDGETS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.GET_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createWidgets Action.
   * Creates a new instance in Widgets of this model.
   *
   * @param {any} id Dashboard id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createWidgets: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_WIDGETS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createWidgetsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_WIDGETS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteWidgets Action.
   * Deletes all Widgets of this model.
   *
   * @param {any} id Dashboard id
   * @param {any} meta (optional).
   * 
   */
  deleteWidgets: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_WIDGETS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteWidgetsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_WIDGETS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyWidgets Action.
   * Creates a new instance in Widgets of this model.
   *
   * @param {any} id Dashboard id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyWidgets: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_WIDGETS;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyWidgetsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyWidgetsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_WIDGETS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyWidgetsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyWidgetsFail: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});