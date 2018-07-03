/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, User } from '../models';

export const UserActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('User'), {
  FIND_BY_ID_ACCESSTOKENS: type('[User] findByIdAccessTokens'),
  FIND_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] findByIdAccessTokens success'),
  FIND_BY_ID_ACCESSTOKENS_FAIL: type('[User] findByIdAccessTokens fail'),

  DESTROY_BY_ID_ACCESSTOKENS: type('[User] destroyByIdAccessTokens'),
  DESTROY_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] destroyByIdAccessTokens success'),
  DESTROY_BY_ID_ACCESSTOKENS_FAIL: type('[User] destroyByIdAccessTokens fail'),

  UPDATE_BY_ID_ACCESSTOKENS: type('[User] updateByIdAccessTokens'),
  UPDATE_BY_ID_ACCESSTOKENS_SUCCESS: type('[User] updateByIdAccessTokens success'),
  UPDATE_BY_ID_ACCESSTOKENS_FAIL: type('[User] updateByIdAccessTokens fail'),

  FIND_BY_ID_ROLES: type('[User] findByIdRoles'),
  FIND_BY_ID_ROLES_SUCCESS: type('[User] findByIdRoles success'),
  FIND_BY_ID_ROLES_FAIL: type('[User] findByIdRoles fail'),

  DESTROY_BY_ID_ROLES: type('[User] destroyByIdRoles'),
  DESTROY_BY_ID_ROLES_SUCCESS: type('[User] destroyByIdRoles success'),
  DESTROY_BY_ID_ROLES_FAIL: type('[User] destroyByIdRoles fail'),

  UPDATE_BY_ID_ROLES: type('[User] updateByIdRoles'),
  UPDATE_BY_ID_ROLES_SUCCESS: type('[User] updateByIdRoles success'),
  UPDATE_BY_ID_ROLES_FAIL: type('[User] updateByIdRoles fail'),

  LINK_ROLES: type('[User] linkRoles'),
  LINK_ROLES_SUCCESS: type('[User] linkRoles success'),
  LINK_ROLES_FAIL: type('[User] linkRoles fail'),

  UNLINK_ROLES: type('[User] unlinkRoles'),
  UNLINK_ROLES_SUCCESS: type('[User] unlinkRoles success'),
  UNLINK_ROLES_FAIL: type('[User] unlinkRoles fail'),

  FIND_BY_ID_DASHBOARDS: type('[User] findByIdDashboards'),
  FIND_BY_ID_DASHBOARDS_SUCCESS: type('[User] findByIdDashboards success'),
  FIND_BY_ID_DASHBOARDS_FAIL: type('[User] findByIdDashboards fail'),

  DESTROY_BY_ID_DASHBOARDS: type('[User] destroyByIdDashboards'),
  DESTROY_BY_ID_DASHBOARDS_SUCCESS: type('[User] destroyByIdDashboards success'),
  DESTROY_BY_ID_DASHBOARDS_FAIL: type('[User] destroyByIdDashboards fail'),

  UPDATE_BY_ID_DASHBOARDS: type('[User] updateByIdDashboards'),
  UPDATE_BY_ID_DASHBOARDS_SUCCESS: type('[User] updateByIdDashboards success'),
  UPDATE_BY_ID_DASHBOARDS_FAIL: type('[User] updateByIdDashboards fail'),

  FIND_BY_ID_CATEGORIES: type('[User] findByIdCategories'),
  FIND_BY_ID_CATEGORIES_SUCCESS: type('[User] findByIdCategories success'),
  FIND_BY_ID_CATEGORIES_FAIL: type('[User] findByIdCategories fail'),

  DESTROY_BY_ID_CATEGORIES: type('[User] destroyByIdCategories'),
  DESTROY_BY_ID_CATEGORIES_SUCCESS: type('[User] destroyByIdCategories success'),
  DESTROY_BY_ID_CATEGORIES_FAIL: type('[User] destroyByIdCategories fail'),

  UPDATE_BY_ID_CATEGORIES: type('[User] updateByIdCategories'),
  UPDATE_BY_ID_CATEGORIES_SUCCESS: type('[User] updateByIdCategories success'),
  UPDATE_BY_ID_CATEGORIES_FAIL: type('[User] updateByIdCategories fail'),

  FIND_BY_ID_DEVICES: type('[User] findByIdDevices'),
  FIND_BY_ID_DEVICES_SUCCESS: type('[User] findByIdDevices success'),
  FIND_BY_ID_DEVICES_FAIL: type('[User] findByIdDevices fail'),

  DESTROY_BY_ID_DEVICES: type('[User] destroyByIdDevices'),
  DESTROY_BY_ID_DEVICES_SUCCESS: type('[User] destroyByIdDevices success'),
  DESTROY_BY_ID_DEVICES_FAIL: type('[User] destroyByIdDevices fail'),

  UPDATE_BY_ID_DEVICES: type('[User] updateByIdDevices'),
  UPDATE_BY_ID_DEVICES_SUCCESS: type('[User] updateByIdDevices success'),
  UPDATE_BY_ID_DEVICES_FAIL: type('[User] updateByIdDevices fail'),

  FIND_BY_ID_MESSAGES: type('[User] findByIdMessages'),
  FIND_BY_ID_MESSAGES_SUCCESS: type('[User] findByIdMessages success'),
  FIND_BY_ID_MESSAGES_FAIL: type('[User] findByIdMessages fail'),

  DESTROY_BY_ID_MESSAGES: type('[User] destroyByIdMessages'),
  DESTROY_BY_ID_MESSAGES_SUCCESS: type('[User] destroyByIdMessages success'),
  DESTROY_BY_ID_MESSAGES_FAIL: type('[User] destroyByIdMessages fail'),

  UPDATE_BY_ID_MESSAGES: type('[User] updateByIdMessages'),
  UPDATE_BY_ID_MESSAGES_SUCCESS: type('[User] updateByIdMessages success'),
  UPDATE_BY_ID_MESSAGES_FAIL: type('[User] updateByIdMessages fail'),

  FIND_BY_ID_GEOLOCS: type('[User] findByIdGeolocs'),
  FIND_BY_ID_GEOLOCS_SUCCESS: type('[User] findByIdGeolocs success'),
  FIND_BY_ID_GEOLOCS_FAIL: type('[User] findByIdGeolocs fail'),

  DESTROY_BY_ID_GEOLOCS: type('[User] destroyByIdGeolocs'),
  DESTROY_BY_ID_GEOLOCS_SUCCESS: type('[User] destroyByIdGeolocs success'),
  DESTROY_BY_ID_GEOLOCS_FAIL: type('[User] destroyByIdGeolocs fail'),

  UPDATE_BY_ID_GEOLOCS: type('[User] updateByIdGeolocs'),
  UPDATE_BY_ID_GEOLOCS_SUCCESS: type('[User] updateByIdGeolocs success'),
  UPDATE_BY_ID_GEOLOCS_FAIL: type('[User] updateByIdGeolocs fail'),

  FIND_BY_ID_PARSERS: type('[User] findByIdParsers'),
  FIND_BY_ID_PARSERS_SUCCESS: type('[User] findByIdParsers success'),
  FIND_BY_ID_PARSERS_FAIL: type('[User] findByIdParsers fail'),

  DESTROY_BY_ID_PARSERS: type('[User] destroyByIdParsers'),
  DESTROY_BY_ID_PARSERS_SUCCESS: type('[User] destroyByIdParsers success'),
  DESTROY_BY_ID_PARSERS_FAIL: type('[User] destroyByIdParsers fail'),

  UPDATE_BY_ID_PARSERS: type('[User] updateByIdParsers'),
  UPDATE_BY_ID_PARSERS_SUCCESS: type('[User] updateByIdParsers success'),
  UPDATE_BY_ID_PARSERS_FAIL: type('[User] updateByIdParsers fail'),

  FIND_BY_ID_ORGANIZATIONS: type('[User] findByIdOrganizations'),
  FIND_BY_ID_ORGANIZATIONS_SUCCESS: type('[User] findByIdOrganizations success'),
  FIND_BY_ID_ORGANIZATIONS_FAIL: type('[User] findByIdOrganizations fail'),

  DESTROY_BY_ID_ORGANIZATIONS: type('[User] destroyByIdOrganizations'),
  DESTROY_BY_ID_ORGANIZATIONS_SUCCESS: type('[User] destroyByIdOrganizations success'),
  DESTROY_BY_ID_ORGANIZATIONS_FAIL: type('[User] destroyByIdOrganizations fail'),

  UPDATE_BY_ID_ORGANIZATIONS: type('[User] updateByIdOrganizations'),
  UPDATE_BY_ID_ORGANIZATIONS_SUCCESS: type('[User] updateByIdOrganizations success'),
  UPDATE_BY_ID_ORGANIZATIONS_FAIL: type('[User] updateByIdOrganizations fail'),

  LINK_ORGANIZATIONS: type('[User] linkOrganizations'),
  LINK_ORGANIZATIONS_SUCCESS: type('[User] linkOrganizations success'),
  LINK_ORGANIZATIONS_FAIL: type('[User] linkOrganizations fail'),

  UNLINK_ORGANIZATIONS: type('[User] unlinkOrganizations'),
  UNLINK_ORGANIZATIONS_SUCCESS: type('[User] unlinkOrganizations success'),
  UNLINK_ORGANIZATIONS_FAIL: type('[User] unlinkOrganizations fail'),

  FIND_BY_ID_ALERTS: type('[User] findByIdAlerts'),
  FIND_BY_ID_ALERTS_SUCCESS: type('[User] findByIdAlerts success'),
  FIND_BY_ID_ALERTS_FAIL: type('[User] findByIdAlerts fail'),

  DESTROY_BY_ID_ALERTS: type('[User] destroyByIdAlerts'),
  DESTROY_BY_ID_ALERTS_SUCCESS: type('[User] destroyByIdAlerts success'),
  DESTROY_BY_ID_ALERTS_FAIL: type('[User] destroyByIdAlerts fail'),

  UPDATE_BY_ID_ALERTS: type('[User] updateByIdAlerts'),
  UPDATE_BY_ID_ALERTS_SUCCESS: type('[User] updateByIdAlerts success'),
  UPDATE_BY_ID_ALERTS_FAIL: type('[User] updateByIdAlerts fail'),

  FIND_BY_ID_CONNECTORS: type('[User] findByIdConnectors'),
  FIND_BY_ID_CONNECTORS_SUCCESS: type('[User] findByIdConnectors success'),
  FIND_BY_ID_CONNECTORS_FAIL: type('[User] findByIdConnectors fail'),

  DESTROY_BY_ID_CONNECTORS: type('[User] destroyByIdConnectors'),
  DESTROY_BY_ID_CONNECTORS_SUCCESS: type('[User] destroyByIdConnectors success'),
  DESTROY_BY_ID_CONNECTORS_FAIL: type('[User] destroyByIdConnectors fail'),

  UPDATE_BY_ID_CONNECTORS: type('[User] updateByIdConnectors'),
  UPDATE_BY_ID_CONNECTORS_SUCCESS: type('[User] updateByIdConnectors success'),
  UPDATE_BY_ID_CONNECTORS_FAIL: type('[User] updateByIdConnectors fail'),

  FIND_BY_ID_WIDGETS: type('[User] findByIdWidgets'),
  FIND_BY_ID_WIDGETS_SUCCESS: type('[User] findByIdWidgets success'),
  FIND_BY_ID_WIDGETS_FAIL: type('[User] findByIdWidgets fail'),

  DESTROY_BY_ID_WIDGETS: type('[User] destroyByIdWidgets'),
  DESTROY_BY_ID_WIDGETS_SUCCESS: type('[User] destroyByIdWidgets success'),
  DESTROY_BY_ID_WIDGETS_FAIL: type('[User] destroyByIdWidgets fail'),

  UPDATE_BY_ID_WIDGETS: type('[User] updateByIdWidgets'),
  UPDATE_BY_ID_WIDGETS_SUCCESS: type('[User] updateByIdWidgets success'),
  UPDATE_BY_ID_WIDGETS_FAIL: type('[User] updateByIdWidgets fail'),

  FIND_BY_ID_BEACONS: type('[User] findByIdBeacons'),
  FIND_BY_ID_BEACONS_SUCCESS: type('[User] findByIdBeacons success'),
  FIND_BY_ID_BEACONS_FAIL: type('[User] findByIdBeacons fail'),

  DESTROY_BY_ID_BEACONS: type('[User] destroyByIdBeacons'),
  DESTROY_BY_ID_BEACONS_SUCCESS: type('[User] destroyByIdBeacons success'),
  DESTROY_BY_ID_BEACONS_FAIL: type('[User] destroyByIdBeacons fail'),

  UPDATE_BY_ID_BEACONS: type('[User] updateByIdBeacons'),
  UPDATE_BY_ID_BEACONS_SUCCESS: type('[User] updateByIdBeacons success'),
  UPDATE_BY_ID_BEACONS_FAIL: type('[User] updateByIdBeacons fail'),

  GET_ACCESSTOKENS: type('[User] getAccessTokens'),
  GET_ACCESSTOKENS_SUCCESS: type('[User] getAccessTokens success'),
  GET_ACCESSTOKENS_FAIL: type('[User] getAccessTokens fail'),

  CREATE_ACCESSTOKENS: type('[User] createAccessTokens'),
  CREATE_ACCESSTOKENS_SUCCESS: type('[User] createAccessTokens success'),
  CREATE_ACCESSTOKENS_FAIL: type('[User] createAccessTokens fail'),

  DELETE_ACCESSTOKENS: type('[User] deleteAccessTokens'),
  DELETE_ACCESSTOKENS_SUCCESS: type('[User] deleteAccessTokens success'),
  DELETE_ACCESSTOKENS_FAIL: type('[User] deleteAccessTokens fail'),

  GET_ROLES: type('[User] getRoles'),
  GET_ROLES_SUCCESS: type('[User] getRoles success'),
  GET_ROLES_FAIL: type('[User] getRoles fail'),

  CREATE_ROLES: type('[User] createRoles'),
  CREATE_ROLES_SUCCESS: type('[User] createRoles success'),
  CREATE_ROLES_FAIL: type('[User] createRoles fail'),

  DELETE_ROLES: type('[User] deleteRoles'),
  DELETE_ROLES_SUCCESS: type('[User] deleteRoles success'),
  DELETE_ROLES_FAIL: type('[User] deleteRoles fail'),

  GET_DASHBOARDS: type('[User] getDashboards'),
  GET_DASHBOARDS_SUCCESS: type('[User] getDashboards success'),
  GET_DASHBOARDS_FAIL: type('[User] getDashboards fail'),

  CREATE_DASHBOARDS: type('[User] createDashboards'),
  CREATE_DASHBOARDS_SUCCESS: type('[User] createDashboards success'),
  CREATE_DASHBOARDS_FAIL: type('[User] createDashboards fail'),

  DELETE_DASHBOARDS: type('[User] deleteDashboards'),
  DELETE_DASHBOARDS_SUCCESS: type('[User] deleteDashboards success'),
  DELETE_DASHBOARDS_FAIL: type('[User] deleteDashboards fail'),

  GET_CATEGORIES: type('[User] getCategories'),
  GET_CATEGORIES_SUCCESS: type('[User] getCategories success'),
  GET_CATEGORIES_FAIL: type('[User] getCategories fail'),

  CREATE_CATEGORIES: type('[User] createCategories'),
  CREATE_CATEGORIES_SUCCESS: type('[User] createCategories success'),
  CREATE_CATEGORIES_FAIL: type('[User] createCategories fail'),

  DELETE_CATEGORIES: type('[User] deleteCategories'),
  DELETE_CATEGORIES_SUCCESS: type('[User] deleteCategories success'),
  DELETE_CATEGORIES_FAIL: type('[User] deleteCategories fail'),

  GET_DEVICES: type('[User] getDevices'),
  GET_DEVICES_SUCCESS: type('[User] getDevices success'),
  GET_DEVICES_FAIL: type('[User] getDevices fail'),

  CREATE_DEVICES: type('[User] createDevices'),
  CREATE_DEVICES_SUCCESS: type('[User] createDevices success'),
  CREATE_DEVICES_FAIL: type('[User] createDevices fail'),

  DELETE_DEVICES: type('[User] deleteDevices'),
  DELETE_DEVICES_SUCCESS: type('[User] deleteDevices success'),
  DELETE_DEVICES_FAIL: type('[User] deleteDevices fail'),

  GET_MESSAGES: type('[User] getMessages'),
  GET_MESSAGES_SUCCESS: type('[User] getMessages success'),
  GET_MESSAGES_FAIL: type('[User] getMessages fail'),

  CREATE_MESSAGES: type('[User] createMessages'),
  CREATE_MESSAGES_SUCCESS: type('[User] createMessages success'),
  CREATE_MESSAGES_FAIL: type('[User] createMessages fail'),

  DELETE_MESSAGES: type('[User] deleteMessages'),
  DELETE_MESSAGES_SUCCESS: type('[User] deleteMessages success'),
  DELETE_MESSAGES_FAIL: type('[User] deleteMessages fail'),

  GET_GEOLOCS: type('[User] getGeolocs'),
  GET_GEOLOCS_SUCCESS: type('[User] getGeolocs success'),
  GET_GEOLOCS_FAIL: type('[User] getGeolocs fail'),

  CREATE_GEOLOCS: type('[User] createGeolocs'),
  CREATE_GEOLOCS_SUCCESS: type('[User] createGeolocs success'),
  CREATE_GEOLOCS_FAIL: type('[User] createGeolocs fail'),

  DELETE_GEOLOCS: type('[User] deleteGeolocs'),
  DELETE_GEOLOCS_SUCCESS: type('[User] deleteGeolocs success'),
  DELETE_GEOLOCS_FAIL: type('[User] deleteGeolocs fail'),

  GET_PARSERS: type('[User] getParsers'),
  GET_PARSERS_SUCCESS: type('[User] getParsers success'),
  GET_PARSERS_FAIL: type('[User] getParsers fail'),

  CREATE_PARSERS: type('[User] createParsers'),
  CREATE_PARSERS_SUCCESS: type('[User] createParsers success'),
  CREATE_PARSERS_FAIL: type('[User] createParsers fail'),

  DELETE_PARSERS: type('[User] deleteParsers'),
  DELETE_PARSERS_SUCCESS: type('[User] deleteParsers success'),
  DELETE_PARSERS_FAIL: type('[User] deleteParsers fail'),

  GET_ORGANIZATIONS: type('[User] getOrganizations'),
  GET_ORGANIZATIONS_SUCCESS: type('[User] getOrganizations success'),
  GET_ORGANIZATIONS_FAIL: type('[User] getOrganizations fail'),

  CREATE_ORGANIZATIONS: type('[User] createOrganizations'),
  CREATE_ORGANIZATIONS_SUCCESS: type('[User] createOrganizations success'),
  CREATE_ORGANIZATIONS_FAIL: type('[User] createOrganizations fail'),

  DELETE_ORGANIZATIONS: type('[User] deleteOrganizations'),
  DELETE_ORGANIZATIONS_SUCCESS: type('[User] deleteOrganizations success'),
  DELETE_ORGANIZATIONS_FAIL: type('[User] deleteOrganizations fail'),

  GET_ALERTS: type('[User] getAlerts'),
  GET_ALERTS_SUCCESS: type('[User] getAlerts success'),
  GET_ALERTS_FAIL: type('[User] getAlerts fail'),

  CREATE_ALERTS: type('[User] createAlerts'),
  CREATE_ALERTS_SUCCESS: type('[User] createAlerts success'),
  CREATE_ALERTS_FAIL: type('[User] createAlerts fail'),

  DELETE_ALERTS: type('[User] deleteAlerts'),
  DELETE_ALERTS_SUCCESS: type('[User] deleteAlerts success'),
  DELETE_ALERTS_FAIL: type('[User] deleteAlerts fail'),

  GET_CONNECTORS: type('[User] getConnectors'),
  GET_CONNECTORS_SUCCESS: type('[User] getConnectors success'),
  GET_CONNECTORS_FAIL: type('[User] getConnectors fail'),

  CREATE_CONNECTORS: type('[User] createConnectors'),
  CREATE_CONNECTORS_SUCCESS: type('[User] createConnectors success'),
  CREATE_CONNECTORS_FAIL: type('[User] createConnectors fail'),

  DELETE_CONNECTORS: type('[User] deleteConnectors'),
  DELETE_CONNECTORS_SUCCESS: type('[User] deleteConnectors success'),
  DELETE_CONNECTORS_FAIL: type('[User] deleteConnectors fail'),

  GET_WIDGETS: type('[User] getWidgets'),
  GET_WIDGETS_SUCCESS: type('[User] getWidgets success'),
  GET_WIDGETS_FAIL: type('[User] getWidgets fail'),

  CREATE_WIDGETS: type('[User] createWidgets'),
  CREATE_WIDGETS_SUCCESS: type('[User] createWidgets success'),
  CREATE_WIDGETS_FAIL: type('[User] createWidgets fail'),

  DELETE_WIDGETS: type('[User] deleteWidgets'),
  DELETE_WIDGETS_SUCCESS: type('[User] deleteWidgets success'),
  DELETE_WIDGETS_FAIL: type('[User] deleteWidgets fail'),

  GET_BEACONS: type('[User] getBeacons'),
  GET_BEACONS_SUCCESS: type('[User] getBeacons success'),
  GET_BEACONS_FAIL: type('[User] getBeacons fail'),

  CREATE_BEACONS: type('[User] createBeacons'),
  CREATE_BEACONS_SUCCESS: type('[User] createBeacons success'),
  CREATE_BEACONS_FAIL: type('[User] createBeacons fail'),

  DELETE_BEACONS: type('[User] deleteBeacons'),
  DELETE_BEACONS_SUCCESS: type('[User] deleteBeacons success'),
  DELETE_BEACONS_FAIL: type('[User] deleteBeacons fail'),

  LOGIN: type('[User] login'),
  LOGIN_SUCCESS: type('[User] login success'),
  LOGIN_FAIL: type('[User] login fail'),

  LOGOUT: type('[User] logout'),
  LOGOUT_SUCCESS: type('[User] logout success'),
  LOGOUT_FAIL: type('[User] logout fail'),

  VERIFY: type('[User] verify'),
  VERIFY_SUCCESS: type('[User] verify success'),
  VERIFY_FAIL: type('[User] verify fail'),

  CONFIRM: type('[User] confirm'),
  CONFIRM_SUCCESS: type('[User] confirm success'),
  CONFIRM_FAIL: type('[User] confirm fail'),

  RESET_PASSWORD: type('[User] resetPassword'),
  RESET_PASSWORD_SUCCESS: type('[User] resetPassword success'),
  RESET_PASSWORD_FAIL: type('[User] resetPassword fail'),

  CHANGE_PASSWORD: type('[User] changePassword'),
  CHANGE_PASSWORD_SUCCESS: type('[User] changePassword success'),
  CHANGE_PASSWORD_FAIL: type('[User] changePassword fail'),

  SET_PASSWORD: type('[User] setPassword'),
  SET_PASSWORD_SUCCESS: type('[User] setPassword success'),
  SET_PASSWORD_FAIL: type('[User] setPassword fail'),

  LOGIN_QR: type('[User] loginQr'),
  LOGIN_QR_SUCCESS: type('[User] loginQr success'),
  LOGIN_QR_FAIL: type('[User] loginQr fail'),

  CREATE_MANY_ACCESSTOKENS: type('[User] createManyAccessTokens'),
  CREATE_MANY_ACCESSTOKENS_SUCCESS: type('[User] createManyAccessTokens success'),
  CREATE_MANY_ACCESSTOKENS_FAIL: type('[User] createManyAccessTokens fail'),

  CREATE_MANY_ROLES: type('[User] createManyRoles'),
  CREATE_MANY_ROLES_SUCCESS: type('[User] createManyRoles success'),
  CREATE_MANY_ROLES_FAIL: type('[User] createManyRoles fail'),

  CREATE_MANY_DASHBOARDS: type('[User] createManyDashboards'),
  CREATE_MANY_DASHBOARDS_SUCCESS: type('[User] createManyDashboards success'),
  CREATE_MANY_DASHBOARDS_FAIL: type('[User] createManyDashboards fail'),

  CREATE_MANY_CATEGORIES: type('[User] createManyCategories'),
  CREATE_MANY_CATEGORIES_SUCCESS: type('[User] createManyCategories success'),
  CREATE_MANY_CATEGORIES_FAIL: type('[User] createManyCategories fail'),

  CREATE_MANY_DEVICES: type('[User] createManyDevices'),
  CREATE_MANY_DEVICES_SUCCESS: type('[User] createManyDevices success'),
  CREATE_MANY_DEVICES_FAIL: type('[User] createManyDevices fail'),

  CREATE_MANY_MESSAGES: type('[User] createManyMessages'),
  CREATE_MANY_MESSAGES_SUCCESS: type('[User] createManyMessages success'),
  CREATE_MANY_MESSAGES_FAIL: type('[User] createManyMessages fail'),

  CREATE_MANY_GEOLOCS: type('[User] createManyGeolocs'),
  CREATE_MANY_GEOLOCS_SUCCESS: type('[User] createManyGeolocs success'),
  CREATE_MANY_GEOLOCS_FAIL: type('[User] createManyGeolocs fail'),

  CREATE_MANY_PARSERS: type('[User] createManyParsers'),
  CREATE_MANY_PARSERS_SUCCESS: type('[User] createManyParsers success'),
  CREATE_MANY_PARSERS_FAIL: type('[User] createManyParsers fail'),

  CREATE_MANY_ORGANIZATIONS: type('[User] createManyOrganizations'),
  CREATE_MANY_ORGANIZATIONS_SUCCESS: type('[User] createManyOrganizations success'),
  CREATE_MANY_ORGANIZATIONS_FAIL: type('[User] createManyOrganizations fail'),

  CREATE_MANY_ALERTS: type('[User] createManyAlerts'),
  CREATE_MANY_ALERTS_SUCCESS: type('[User] createManyAlerts success'),
  CREATE_MANY_ALERTS_FAIL: type('[User] createManyAlerts fail'),

  CREATE_MANY_CONNECTORS: type('[User] createManyConnectors'),
  CREATE_MANY_CONNECTORS_SUCCESS: type('[User] createManyConnectors success'),
  CREATE_MANY_CONNECTORS_FAIL: type('[User] createManyConnectors fail'),

  CREATE_MANY_WIDGETS: type('[User] createManyWidgets'),
  CREATE_MANY_WIDGETS_SUCCESS: type('[User] createManyWidgets success'),
  CREATE_MANY_WIDGETS_FAIL: type('[User] createManyWidgets fail'),

  CREATE_MANY_BEACONS: type('[User] createManyBeacons'),
  CREATE_MANY_BEACONS_SUCCESS: type('[User] createManyBeacons success'),
  CREATE_MANY_BEACONS_FAIL: type('[User] createManyBeacons fail'),

}, {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific action types
   */
  SIGNUP: type('[User] Signup'),
  SIGNUP_SUCCESS: type('[User] Signup success'),
  SIGNUP_FAIL: type('[User] Signup fail'),
});
export const UserActions =
Object.assign(BaseLoopbackActionsFactory<User>(UserActionTypes), {

  /**
   * findByIdAccessTokens Action.
   * Find a related item by id for accessTokens.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAccessTokens Action.
   * Delete a related item by id for accessTokens.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for accessTokens
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAccessTokens Action.
   * Update a related item by id for accessTokens.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for accessTokens
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokens: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdRoles Action.
   * Find a related item by id for roles.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for roles
   * @param {any} meta (optional).
   * 
   */
  findByIdRoles: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ROLES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdRolesFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdRoles Action.
   * Delete a related item by id for roles.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for roles
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRoles: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ROLES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdRolesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ROLES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdRolesFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdRoles Action.
   * Update a related item by id for roles.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for roles
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdRoles: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ROLES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdRolesFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkRoles Action.
   * Add a related item by id for roles.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for roles
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkRoles: class implements Action {
    public readonly type = UserActionTypes.LINK_ROLES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.LINK_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkRolesFail: class implements Action {
    public readonly type = UserActionTypes.LINK_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkRoles Action.
   * Remove the roles relation to an item by id.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for roles
   * @param {any} meta (optional).
   * 
   */
  unlinkRoles: class implements Action {
    public readonly type = UserActionTypes.UNLINK_ROLES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkRolesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.UNLINK_ROLES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkRolesFail: class implements Action {
    public readonly type = UserActionTypes.UNLINK_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdDashboards Action.
   * Find a related item by id for Dashboards.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Dashboards
   * @param {any} meta (optional).
   * 
   */
  findByIdDashboards: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DASHBOARDS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdDashboards Action.
   * Delete a related item by id for Dashboards.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Dashboards
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDashboards: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DASHBOARDS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdDashboardsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DASHBOARDS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdDashboards Action.
   * Update a related item by id for Dashboards.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Dashboards
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdDashboards: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DASHBOARDS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdCategories Action.
   * Find a related item by id for Categories.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Categories
   * @param {any} meta (optional).
   * 
   */
  findByIdCategories: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdCategories Action.
   * Delete a related item by id for Categories.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Categories
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategories: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdCategories Action.
   * Update a related item by id for Categories.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Categories
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategories: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CATEGORIES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdDevices Action.
   * Find a related item by id for Devices.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  findByIdDevices: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DEVICES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdDevicesFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdDevices Action.
   * Delete a related item by id for Devices.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDevices: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DEVICES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdDevicesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DEVICES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDevicesFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdDevices Action.
   * Update a related item by id for Devices.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Devices
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdDevices: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DEVICES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdDevicesFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdMessages Action.
   * Find a related item by id for Messages.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  findByIdMessages: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_MESSAGES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdMessagesFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdMessages Action.
   * Delete a related item by id for Messages.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessages: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_MESSAGES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessagesFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdMessages Action.
   * Update a related item by id for Messages.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Messages
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessages: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_MESSAGES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessagesFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdGeolocs Action.
   * Find a related item by id for Geolocs.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  findByIdGeolocs: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_GEOLOCS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdGeolocs Action.
   * Delete a related item by id for Geolocs.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  destroyByIdGeolocs: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_GEOLOCS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdGeolocsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_GEOLOCS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdGeolocs Action.
   * Update a related item by id for Geolocs.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Geolocs
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdGeolocs: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_GEOLOCS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdParsers Action.
   * Find a related item by id for Parsers.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Parsers
   * @param {any} meta (optional).
   * 
   */
  findByIdParsers: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_PARSERS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdParsersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_PARSERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdParsersFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdParsers Action.
   * Delete a related item by id for Parsers.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Parsers
   * @param {any} meta (optional).
   * 
   */
  destroyByIdParsers: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_PARSERS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdParsersSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_PARSERS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdParsersFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdParsers Action.
   * Update a related item by id for Parsers.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Parsers
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdParsers: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_PARSERS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdParsersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_PARSERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdParsersFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdOrganizations Action.
   * Find a related item by id for Organizations.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizations: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdOrganizations Action.
   * Delete a related item by id for Organizations.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizations: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdOrganizations Action.
   * Update a related item by id for Organizations.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizations: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkOrganizations Action.
   * Add a related item by id for Organizations.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkOrganizations: class implements Action {
    public readonly type = UserActionTypes.LINK_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.LINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.LINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkOrganizations Action.
   * Remove the Organizations relation to an item by id.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizations: class implements Action {
    public readonly type = UserActionTypes.UNLINK_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.UNLINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.UNLINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdAlerts Action.
   * Find a related item by id for Alerts.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Alerts
   * @param {any} meta (optional).
   * 
   */
  findByIdAlerts: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ALERTS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdAlertsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ALERTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdAlertsFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAlerts Action.
   * Delete a related item by id for Alerts.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Alerts
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAlerts: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ALERTS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdAlertsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ALERTS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAlertsFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAlerts Action.
   * Update a related item by id for Alerts.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Alerts
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAlerts: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ALERTS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdAlertsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ALERTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdAlertsFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdConnectors Action.
   * Find a related item by id for Connectors.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Connectors
   * @param {any} meta (optional).
   * 
   */
  findByIdConnectors: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CONNECTORS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdConnectorsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CONNECTORS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdConnectors Action.
   * Delete a related item by id for Connectors.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Connectors
   * @param {any} meta (optional).
   * 
   */
  destroyByIdConnectors: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CONNECTORS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdConnectorsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CONNECTORS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdConnectors Action.
   * Update a related item by id for Connectors.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Connectors
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdConnectors: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CONNECTORS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdConnectorsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CONNECTORS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdWidgets Action.
   * Find a related item by id for Widgets.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Widgets
   * @param {any} meta (optional).
   * 
   */
  findByIdWidgets: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_WIDGETS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.FIND_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdWidgets Action.
   * Delete a related item by id for Widgets.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Widgets
   * @param {any} meta (optional).
   * 
   */
  destroyByIdWidgets: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_WIDGETS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.DESTROY_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdWidgets Action.
   * Update a related item by id for Widgets.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Widgets
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdWidgets: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_WIDGETS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.UPDATE_BY_ID_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdBeacons Action.
   * Find a related item by id for Beacons.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Beacons
   * @param {any} meta (optional).
   * 
   */
  findByIdBeacons: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_BEACONS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdBeaconsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_BEACONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.FIND_BY_ID_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdBeacons Action.
   * Delete a related item by id for Beacons.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Beacons
   * @param {any} meta (optional).
   * 
   */
  destroyByIdBeacons: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_BEACONS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdBeaconsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_BEACONS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.DESTROY_BY_ID_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdBeacons Action.
   * Update a related item by id for Beacons.
   *
   * @param {any} id user id
   * @param {any} fk Foreign key for Beacons
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdBeacons: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_BEACONS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdBeaconsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_BEACONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_BY_ID_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAccessTokens Action.
   * Queries accessTokens of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAccessTokens: class implements Action {
    public readonly type = UserActionTypes.GET_ACCESSTOKENS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.GET_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAccessTokens: class implements Action {
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAccessTokens Action.
   * Deletes all accessTokens of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokens: class implements Action {
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getRoles Action.
   * Queries roles of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getRoles: class implements Action {
    public readonly type = UserActionTypes.GET_ROLES;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getRolesFail: class implements Action {
    public readonly type = UserActionTypes.GET_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createRoles Action.
   * Creates a new instance in roles of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createRoles: class implements Action {
    public readonly type = UserActionTypes.CREATE_ROLES;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createRolesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteRoles Action.
   * Deletes all roles of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteRoles: class implements Action {
    public readonly type = UserActionTypes.DELETE_ROLES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRolesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_ROLES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteRolesFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDashboards Action.
   * Queries Dashboards of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getDashboards: class implements Action {
    public readonly type = UserActionTypes.GET_DASHBOARDS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.GET_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createDashboards Action.
   * Creates a new instance in Dashboards of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createDashboards: class implements Action {
    public readonly type = UserActionTypes.CREATE_DASHBOARDS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDashboards Action.
   * Deletes all Dashboards of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteDashboards: class implements Action {
    public readonly type = UserActionTypes.DELETE_DASHBOARDS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteDashboardsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_DASHBOARDS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getCategories Action.
   * Queries Categories of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getCategories: class implements Action {
    public readonly type = UserActionTypes.GET_CATEGORIES;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.GET_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createCategories Action.
   * Creates a new instance in Categories of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createCategories: class implements Action {
    public readonly type = UserActionTypes.CREATE_CATEGORIES;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteCategories Action.
   * Deletes all Categories of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteCategories: class implements Action {
    public readonly type = UserActionTypes.DELETE_CATEGORIES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_CATEGORIES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDevices Action.
   * Queries Devices of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getDevices: class implements Action {
    public readonly type = UserActionTypes.GET_DEVICES;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getDevicesFail: class implements Action {
    public readonly type = UserActionTypes.GET_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createDevices: class implements Action {
    public readonly type = UserActionTypes.CREATE_DEVICES;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createDevicesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDevices Action.
   * Deletes all Devices of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteDevices: class implements Action {
    public readonly type = UserActionTypes.DELETE_DEVICES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteDevicesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_DEVICES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteDevicesFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessages Action.
   * Queries Messages of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getMessages: class implements Action {
    public readonly type = UserActionTypes.GET_MESSAGES;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessagesFail: class implements Action {
    public readonly type = UserActionTypes.GET_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createMessages: class implements Action {
    public readonly type = UserActionTypes.CREATE_MESSAGES;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createMessagesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteMessages Action.
   * Deletes all Messages of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteMessages: class implements Action {
    public readonly type = UserActionTypes.DELETE_MESSAGES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMessagesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_MESSAGES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteMessagesFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getGeolocs Action.
   * Queries Geolocs of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getGeolocs: class implements Action {
    public readonly type = UserActionTypes.GET_GEOLOCS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.GET_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createGeolocs: class implements Action {
    public readonly type = UserActionTypes.CREATE_GEOLOCS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteGeolocs Action.
   * Deletes all Geolocs of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteGeolocs: class implements Action {
    public readonly type = UserActionTypes.DELETE_GEOLOCS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteGeolocsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_GEOLOCS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getParsers Action.
   * Queries Parsers of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getParsers: class implements Action {
    public readonly type = UserActionTypes.GET_PARSERS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getParsersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_PARSERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getParsersFail: class implements Action {
    public readonly type = UserActionTypes.GET_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createParsers Action.
   * Creates a new instance in Parsers of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createParsers: class implements Action {
    public readonly type = UserActionTypes.CREATE_PARSERS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createParsersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_PARSERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createParsersFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteParsers Action.
   * Deletes all Parsers of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteParsers: class implements Action {
    public readonly type = UserActionTypes.DELETE_PARSERS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteParsersSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_PARSERS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteParsersFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganizations Action.
   * Queries Organizations of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getOrganizations: class implements Action {
    public readonly type = UserActionTypes.GET_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.GET_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.GET_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createOrganizations: class implements Action {
    public readonly type = UserActionTypes.CREATE_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.CREATE_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteOrganizations Action.
   * Deletes all Organizations of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizations: class implements Action {
    public readonly type = UserActionTypes.DELETE_ORGANIZATIONS;
      
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
    public readonly type = UserActionTypes.DELETE_ORGANIZATIONS_SUCCESS;
  
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
    public readonly type = UserActionTypes.DELETE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAlerts Action.
   * Queries Alerts of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAlerts: class implements Action {
    public readonly type = UserActionTypes.GET_ALERTS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getAlertsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_ALERTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getAlertsFail: class implements Action {
    public readonly type = UserActionTypes.GET_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAlerts Action.
   * Creates a new instance in Alerts of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAlerts: class implements Action {
    public readonly type = UserActionTypes.CREATE_ALERTS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createAlertsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_ALERTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createAlertsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAlerts Action.
   * Deletes all Alerts of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteAlerts: class implements Action {
    public readonly type = UserActionTypes.DELETE_ALERTS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAlertsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_ALERTS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteAlertsFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getConnectors Action.
   * Queries Connectors of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getConnectors: class implements Action {
    public readonly type = UserActionTypes.GET_CONNECTORS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getConnectorsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_CONNECTORS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.GET_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createConnectors Action.
   * Creates a new instance in Connectors of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createConnectors: class implements Action {
    public readonly type = UserActionTypes.CREATE_CONNECTORS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createConnectorsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_CONNECTORS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteConnectors Action.
   * Deletes all Connectors of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteConnectors: class implements Action {
    public readonly type = UserActionTypes.DELETE_CONNECTORS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteConnectorsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_CONNECTORS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getWidgets Action.
   * Queries Widgets of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getWidgets: class implements Action {
    public readonly type = UserActionTypes.GET_WIDGETS;
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
    public readonly type = UserActionTypes.GET_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.GET_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createWidgets Action.
   * Creates a new instance in Widgets of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createWidgets: class implements Action {
    public readonly type = UserActionTypes.CREATE_WIDGETS;
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
    public readonly type = UserActionTypes.CREATE_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteWidgets Action.
   * Deletes all Widgets of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteWidgets: class implements Action {
    public readonly type = UserActionTypes.DELETE_WIDGETS;
      
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
    public readonly type = UserActionTypes.DELETE_WIDGETS_SUCCESS;
  
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
    public readonly type = UserActionTypes.DELETE_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getBeacons Action.
   * Queries Beacons of user.
   *
   * @param {any} id user id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getBeacons: class implements Action {
    public readonly type = UserActionTypes.GET_BEACONS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getBeaconsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.GET_BEACONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.GET_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createBeacons Action.
   * Creates a new instance in Beacons of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createBeacons: class implements Action {
    public readonly type = UserActionTypes.CREATE_BEACONS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createBeaconsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_BEACONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteBeacons Action.
   * Deletes all Beacons of this model.
   *
   * @param {any} id user id
   * @param {any} meta (optional).
   * 
   */
  deleteBeacons: class implements Action {
    public readonly type = UserActionTypes.DELETE_BEACONS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteBeaconsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_BEACONS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * login Action.
   * Login a user with username/email and password.
   *
   * @param {string} include Related objects to include in the response. See the description of return value for more details.
   *   Default value: `user`.
   *  - `rememberMe` - `boolean` - Whether the authentication credentials
   *     should be remembered in localStorage across app/browser restarts.
   *     Default: `true`.
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  login: class implements Action {
    public readonly type = UserActionTypes.LOGIN;
      public payload: {credentials: any, include: any, customHeaders};

    constructor(credentials: any, include: any = 'user', rememberMe: boolean = true, customHeaders?: Function, public meta?: any) {
      this.payload = {credentials, include, customHeaders};
    }
  },
  /**
   * loginSuccess Action.
   * 
   * @param {any} id 
   * Le corps de réponse contient les propriétés de AccessToken créées lors de la connexion.
   * En fonction de la valeur du paramètre `include`, le corps peut contenir des propriétés supplémentaires :
   * 
   *   - `user` - `U+007BUserU+007D` - Données de l'utilisateur connecté. (`include=user`)
   * 
   *
   * @param {any} meta (optional).
   * 
   */
  loginSuccess: class implements Action {
    public readonly type = UserActionTypes.LOGIN_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * loginFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  loginFail: class implements Action {
    public readonly type = UserActionTypes.LOGIN_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * logout Action.
   * Logout a user with access token.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  logout: class implements Action {
    public readonly type = UserActionTypes.LOGOUT;
      
    constructor(public meta?: any) {}
  },
  /**
   * logoutSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  logoutSuccess: class implements Action {
    public readonly type = UserActionTypes.LOGOUT_SUCCESS;
  
    constructor(public meta?: any) {}
  },
  /**
   * logoutFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  logoutFail: class implements Action {
    public readonly type = UserActionTypes.LOGOUT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * verify Action.
   * Trigger user's identity verification with configured verifyOptions
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   * @param {any} meta (optional).
   * 
   */
  verify: class implements Action {
    public readonly type = UserActionTypes.VERIFY;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * verifySuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  verifySuccess: class implements Action {
    public readonly type = UserActionTypes.VERIFY_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * verifyFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  verifyFail: class implements Action {
    public readonly type = UserActionTypes.VERIFY_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * confirm Action.
   * Confirm a user registration with identity verification token.
   *
   * @param {string} uid 
   * @param {string} token 
   * @param {string} redirect 
   * @param {any} meta (optional).
   * 
   */
  confirm: class implements Action {
    public readonly type = UserActionTypes.CONFIRM;
      public payload: {uid: any, token: any, redirect: any, customHeaders};

    constructor(uid: any, token: any, redirect: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {uid, token, redirect, customHeaders};
    }
  },
  /**
   * confirmSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  confirmSuccess: class implements Action {
    public readonly type = UserActionTypes.CONFIRM_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * confirmFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  confirmFail: class implements Action {
    public readonly type = UserActionTypes.CONFIRM_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * resetPassword Action.
   * Reset password for a user with email.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  resetPassword: class implements Action {
    public readonly type = UserActionTypes.RESET_PASSWORD;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * resetPasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  resetPasswordSuccess: class implements Action {
    public readonly type = UserActionTypes.RESET_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * resetPasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  resetPasswordFail: class implements Action {
    public readonly type = UserActionTypes.RESET_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * changePassword Action.
   * Change a user's password.
   *
   * @param {object} data Request data.
   *
   *  - `oldPassword` – `{string}` - 
   *
   *  - `newPassword` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  changePassword: class implements Action {
    public readonly type = UserActionTypes.CHANGE_PASSWORD;
      public payload: {oldPassword: any, newPassword: any, customHeaders};

    constructor(oldPassword: any, newPassword: any, customHeaders?: Function, public meta?: any) {
      this.payload = {oldPassword, newPassword, customHeaders};
    }
  },
  /**
   * changePasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  changePasswordSuccess: class implements Action {
    public readonly type = UserActionTypes.CHANGE_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * changePasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  changePasswordFail: class implements Action {
    public readonly type = UserActionTypes.CHANGE_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * setPassword Action.
   * Reset user's password via a password-reset token.
   *
   * @param {object} data Request data.
   *
   *  - `newPassword` – `{string}` - 
   * @param {any} meta (optional).
   * 
   */
  setPassword: class implements Action {
    public readonly type = UserActionTypes.SET_PASSWORD;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * setPasswordSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  setPasswordSuccess: class implements Action {
    public readonly type = UserActionTypes.SET_PASSWORD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * setPasswordFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  setPasswordFail: class implements Action {
    public readonly type = UserActionTypes.SET_PASSWORD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * loginQr Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} redirect 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  loginQr: class implements Action {
    public readonly type = UserActionTypes.LOGIN_QR;
      public payload: {redirect: any, res: any, customHeaders};

    constructor(redirect: any, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {redirect, res, customHeaders};
    }
  },
  /**
   * loginQrSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  loginQrSuccess: class implements Action {
    public readonly type = UserActionTypes.LOGIN_QR_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * loginQrFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  loginQrFail: class implements Action {
    public readonly type = UserActionTypes.LOGIN_QR_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAccessTokens Action.
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokens: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyAccessTokensSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokensSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAccessTokensFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAccessTokensFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ACCESSTOKENS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyRoles Action.
   * Creates a new instance in roles of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyRoles: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ROLES;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyRolesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyRolesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ROLES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyRolesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyRolesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ROLES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyDashboards Action.
   * Creates a new instance in Dashboards of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyDashboards: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DASHBOARDS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyDashboardsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyDashboardsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyCategories Action.
   * Creates a new instance in Categories of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyCategories: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CATEGORIES;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyCategoriesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyCategoriesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyDevices: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DEVICES;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyDevicesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyDevicesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyMessages: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_MESSAGES;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyMessagesSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyMessagesFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyGeolocs: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_GEOLOCS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyGeolocsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyGeolocsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_GEOLOCS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyGeolocsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyGeolocsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyParsers Action.
   * Creates a new instance in Parsers of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyParsers: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_PARSERS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyParsersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyParsersSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_PARSERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyParsersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyParsersFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_PARSERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizations: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ORGANIZATIONS;
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
    public readonly type = UserActionTypes.CREATE_MANY_ORGANIZATIONS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_MANY_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAlerts Action.
   * Creates a new instance in Alerts of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAlerts: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ALERTS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyAlertsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyAlertsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ALERTS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyAlertsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyAlertsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyConnectors Action.
   * Creates a new instance in Connectors of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyConnectors: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CONNECTORS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyConnectorsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyConnectorsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CONNECTORS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyConnectorsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyConnectorsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_CONNECTORS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyWidgets Action.
   * Creates a new instance in Widgets of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyWidgets: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_WIDGETS;
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
    public readonly type = UserActionTypes.CREATE_MANY_WIDGETS_SUCCESS;
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
    public readonly type = UserActionTypes.CREATE_MANY_WIDGETS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyBeacons Action.
   * Creates a new instance in Beacons of this model.
   *
   * @param {any} id user id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyBeacons: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_BEACONS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyBeaconsSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyBeaconsSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_BEACONS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyBeaconsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyBeaconsFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_MANY_BEACONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
}, {
  /**
   * User specific actions
   */
  signup: class implements Action {
    public readonly type = UserActionTypes.SIGNUP;

    constructor(public payload: any, public meta?: any) { }
  },

  signupSuccess: class implements Action {
    public readonly type = UserActionTypes.SIGNUP_SUCCESS;
    public payload: {credentials: any, data: any};

    constructor(credentials: any, data: any, public meta?: any) {
      this.payload = {credentials, data};
    }
  },

  signupFail: class implements Action {
    public readonly type = UserActionTypes.SIGNUP_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});