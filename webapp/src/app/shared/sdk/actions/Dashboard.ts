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

  FIND_BY_ID_ORGANIZATIONS: type('[Dashboard] findByIdOrganizations'),
  FIND_BY_ID_ORGANIZATIONS_SUCCESS: type('[Dashboard] findByIdOrganizations success'),
  FIND_BY_ID_ORGANIZATIONS_FAIL: type('[Dashboard] findByIdOrganizations fail'),

  DESTROY_BY_ID_ORGANIZATIONS: type('[Dashboard] destroyByIdOrganizations'),
  DESTROY_BY_ID_ORGANIZATIONS_SUCCESS: type('[Dashboard] destroyByIdOrganizations success'),
  DESTROY_BY_ID_ORGANIZATIONS_FAIL: type('[Dashboard] destroyByIdOrganizations fail'),

  UPDATE_BY_ID_ORGANIZATIONS: type('[Dashboard] updateByIdOrganizations'),
  UPDATE_BY_ID_ORGANIZATIONS_SUCCESS: type('[Dashboard] updateByIdOrganizations success'),
  UPDATE_BY_ID_ORGANIZATIONS_FAIL: type('[Dashboard] updateByIdOrganizations fail'),

  LINK_ORGANIZATIONS: type('[Dashboard] linkOrganizations'),
  LINK_ORGANIZATIONS_SUCCESS: type('[Dashboard] linkOrganizations success'),
  LINK_ORGANIZATIONS_FAIL: type('[Dashboard] linkOrganizations fail'),

  UNLINK_ORGANIZATIONS: type('[Dashboard] unlinkOrganizations'),
  UNLINK_ORGANIZATIONS_SUCCESS: type('[Dashboard] unlinkOrganizations success'),
  UNLINK_ORGANIZATIONS_FAIL: type('[Dashboard] unlinkOrganizations fail'),

  FIND_BY_ID_WIDGETS: type('[Dashboard] findByIdWidgets'),
  FIND_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] findByIdWidgets success'),
  FIND_BY_ID_WIDGETS_FAIL: type('[Dashboard] findByIdWidgets fail'),

  DESTROY_BY_ID_WIDGETS: type('[Dashboard] destroyByIdWidgets'),
  DESTROY_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] destroyByIdWidgets success'),
  DESTROY_BY_ID_WIDGETS_FAIL: type('[Dashboard] destroyByIdWidgets fail'),

  UPDATE_BY_ID_WIDGETS: type('[Dashboard] updateByIdWidgets'),
  UPDATE_BY_ID_WIDGETS_SUCCESS: type('[Dashboard] updateByIdWidgets success'),
  UPDATE_BY_ID_WIDGETS_FAIL: type('[Dashboard] updateByIdWidgets fail'),

  GET_ORGANIZATIONS: type('[Dashboard] getOrganizations'),
  GET_ORGANIZATIONS_SUCCESS: type('[Dashboard] getOrganizations success'),
  GET_ORGANIZATIONS_FAIL: type('[Dashboard] getOrganizations fail'),

  CREATE_ORGANIZATIONS: type('[Dashboard] createOrganizations'),
  CREATE_ORGANIZATIONS_SUCCESS: type('[Dashboard] createOrganizations success'),
  CREATE_ORGANIZATIONS_FAIL: type('[Dashboard] createOrganizations fail'),

  DELETE_ORGANIZATIONS: type('[Dashboard] deleteOrganizations'),
  DELETE_ORGANIZATIONS_SUCCESS: type('[Dashboard] deleteOrganizations success'),
  DELETE_ORGANIZATIONS_FAIL: type('[Dashboard] deleteOrganizations fail'),

  GET_WIDGETS: type('[Dashboard] getWidgets'),
  GET_WIDGETS_SUCCESS: type('[Dashboard] getWidgets success'),
  GET_WIDGETS_FAIL: type('[Dashboard] getWidgets fail'),

  CREATE_WIDGETS: type('[Dashboard] createWidgets'),
  CREATE_WIDGETS_SUCCESS: type('[Dashboard] createWidgets success'),
  CREATE_WIDGETS_FAIL: type('[Dashboard] createWidgets fail'),

  DELETE_WIDGETS: type('[Dashboard] deleteWidgets'),
  DELETE_WIDGETS_SUCCESS: type('[Dashboard] deleteWidgets success'),
  DELETE_WIDGETS_FAIL: type('[Dashboard] deleteWidgets fail'),

  CREATE_MANY_ORGANIZATIONS: type('[Dashboard] createManyOrganizations'),
  CREATE_MANY_ORGANIZATIONS_SUCCESS: type('[Dashboard] createManyOrganizations success'),
  CREATE_MANY_ORGANIZATIONS_FAIL: type('[Dashboard] createManyOrganizations fail'),

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
   * findByIdOrganizations Action.
   * Find a related item by id for Organizations.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_ORGANIZATIONS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.FIND_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdOrganizations Action.
   * Delete a related item by id for Organizations.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_ORGANIZATIONS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.DESTROY_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdOrganizations Action.
   * Update a related item by id for Organizations.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_ORGANIZATIONS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.UPDATE_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkOrganizations Action.
   * Add a related item by id for Organizations.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.LINK_ORGANIZATIONS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.LINK_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.LINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkOrganizations Action.
   * Remove the Organizations relation to an item by id.
   *
   * @param {any} id Dashboard id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.UNLINK_ORGANIZATIONS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.UNLINK_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.UNLINK_ORGANIZATIONS_FAIL;

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
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
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
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
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
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
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
   * getOrganizations Action.
   * Queries Organizations of Dashboard.
   *
   * @param {any} id Dashboard id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.GET_ORGANIZATIONS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.GET_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.GET_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Dashboard id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_ORGANIZATIONS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteOrganizations Action.
   * Deletes all Organizations of this model.
   *
   * @param {any} id Dashboard id
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_ORGANIZATIONS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_ORGANIZATIONS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.DELETE_ORGANIZATIONS_FAIL;

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
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
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
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
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
   * createManyOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Dashboard id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizations: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_ORGANIZATIONS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyOrganizationsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizationsSuccess: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_ORGANIZATIONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyOrganizationsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizationsFail: class implements Action {
    public readonly type = DashboardActionTypes.CREATE_MANY_ORGANIZATIONS_FAIL;

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
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
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