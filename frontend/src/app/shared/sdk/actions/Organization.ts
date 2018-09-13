/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Organization } from '../models';

export const OrganizationActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Organization'), {
  FIND_BY_ID_MEMBERS: type('[Organization] findByIdMembers'),
  FIND_BY_ID_MEMBERS_SUCCESS: type('[Organization] findByIdMembers success'),
  FIND_BY_ID_MEMBERS_FAIL: type('[Organization] findByIdMembers fail'),

  DESTROY_BY_ID_MEMBERS: type('[Organization] destroyByIdMembers'),
  DESTROY_BY_ID_MEMBERS_SUCCESS: type('[Organization] destroyByIdMembers success'),
  DESTROY_BY_ID_MEMBERS_FAIL: type('[Organization] destroyByIdMembers fail'),

  UPDATE_BY_ID_MEMBERS: type('[Organization] updateByIdMembers'),
  UPDATE_BY_ID_MEMBERS_SUCCESS: type('[Organization] updateByIdMembers success'),
  UPDATE_BY_ID_MEMBERS_FAIL: type('[Organization] updateByIdMembers fail'),

  LINK_MEMBERS: type('[Organization] linkMembers'),
  LINK_MEMBERS_SUCCESS: type('[Organization] linkMembers success'),
  LINK_MEMBERS_FAIL: type('[Organization] linkMembers fail'),

  UNLINK_MEMBERS: type('[Organization] unlinkMembers'),
  UNLINK_MEMBERS_SUCCESS: type('[Organization] unlinkMembers success'),
  UNLINK_MEMBERS_FAIL: type('[Organization] unlinkMembers fail'),

  GET_USER: type('[Organization] getUser'),
  GET_USER_SUCCESS: type('[Organization] getUser success'),
  GET_USER_FAIL: type('[Organization] getUser fail'),

  FIND_BY_ID_MESSAGES: type('[Organization] findByIdMessages'),
  FIND_BY_ID_MESSAGES_SUCCESS: type('[Organization] findByIdMessages success'),
  FIND_BY_ID_MESSAGES_FAIL: type('[Organization] findByIdMessages fail'),

  DESTROY_BY_ID_MESSAGES: type('[Organization] destroyByIdMessages'),
  DESTROY_BY_ID_MESSAGES_SUCCESS: type('[Organization] destroyByIdMessages success'),
  DESTROY_BY_ID_MESSAGES_FAIL: type('[Organization] destroyByIdMessages fail'),

  UPDATE_BY_ID_MESSAGES: type('[Organization] updateByIdMessages'),
  UPDATE_BY_ID_MESSAGES_SUCCESS: type('[Organization] updateByIdMessages success'),
  UPDATE_BY_ID_MESSAGES_FAIL: type('[Organization] updateByIdMessages fail'),

  LINK_MESSAGES: type('[Organization] linkMessages'),
  LINK_MESSAGES_SUCCESS: type('[Organization] linkMessages success'),
  LINK_MESSAGES_FAIL: type('[Organization] linkMessages fail'),

  UNLINK_MESSAGES: type('[Organization] unlinkMessages'),
  UNLINK_MESSAGES_SUCCESS: type('[Organization] unlinkMessages success'),
  UNLINK_MESSAGES_FAIL: type('[Organization] unlinkMessages fail'),

  FIND_BY_ID_DEVICES: type('[Organization] findByIdDevices'),
  FIND_BY_ID_DEVICES_SUCCESS: type('[Organization] findByIdDevices success'),
  FIND_BY_ID_DEVICES_FAIL: type('[Organization] findByIdDevices fail'),

  DESTROY_BY_ID_DEVICES: type('[Organization] destroyByIdDevices'),
  DESTROY_BY_ID_DEVICES_SUCCESS: type('[Organization] destroyByIdDevices success'),
  DESTROY_BY_ID_DEVICES_FAIL: type('[Organization] destroyByIdDevices fail'),

  UPDATE_BY_ID_DEVICES: type('[Organization] updateByIdDevices'),
  UPDATE_BY_ID_DEVICES_SUCCESS: type('[Organization] updateByIdDevices success'),
  UPDATE_BY_ID_DEVICES_FAIL: type('[Organization] updateByIdDevices fail'),

  LINK_DEVICES: type('[Organization] linkDevices'),
  LINK_DEVICES_SUCCESS: type('[Organization] linkDevices success'),
  LINK_DEVICES_FAIL: type('[Organization] linkDevices fail'),

  UNLINK_DEVICES: type('[Organization] unlinkDevices'),
  UNLINK_DEVICES_SUCCESS: type('[Organization] unlinkDevices success'),
  UNLINK_DEVICES_FAIL: type('[Organization] unlinkDevices fail'),

  FIND_BY_ID_CATEGORIES: type('[Organization] findByIdCategories'),
  FIND_BY_ID_CATEGORIES_SUCCESS: type('[Organization] findByIdCategories success'),
  FIND_BY_ID_CATEGORIES_FAIL: type('[Organization] findByIdCategories fail'),

  DESTROY_BY_ID_CATEGORIES: type('[Organization] destroyByIdCategories'),
  DESTROY_BY_ID_CATEGORIES_SUCCESS: type('[Organization] destroyByIdCategories success'),
  DESTROY_BY_ID_CATEGORIES_FAIL: type('[Organization] destroyByIdCategories fail'),

  UPDATE_BY_ID_CATEGORIES: type('[Organization] updateByIdCategories'),
  UPDATE_BY_ID_CATEGORIES_SUCCESS: type('[Organization] updateByIdCategories success'),
  UPDATE_BY_ID_CATEGORIES_FAIL: type('[Organization] updateByIdCategories fail'),

  LINK_CATEGORIES: type('[Organization] linkCategories'),
  LINK_CATEGORIES_SUCCESS: type('[Organization] linkCategories success'),
  LINK_CATEGORIES_FAIL: type('[Organization] linkCategories fail'),

  UNLINK_CATEGORIES: type('[Organization] unlinkCategories'),
  UNLINK_CATEGORIES_SUCCESS: type('[Organization] unlinkCategories success'),
  UNLINK_CATEGORIES_FAIL: type('[Organization] unlinkCategories fail'),

  FIND_BY_ID_DASHBOARDS: type('[Organization] findByIdDashboards'),
  FIND_BY_ID_DASHBOARDS_SUCCESS: type('[Organization] findByIdDashboards success'),
  FIND_BY_ID_DASHBOARDS_FAIL: type('[Organization] findByIdDashboards fail'),

  DESTROY_BY_ID_DASHBOARDS: type('[Organization] destroyByIdDashboards'),
  DESTROY_BY_ID_DASHBOARDS_SUCCESS: type('[Organization] destroyByIdDashboards success'),
  DESTROY_BY_ID_DASHBOARDS_FAIL: type('[Organization] destroyByIdDashboards fail'),

  UPDATE_BY_ID_DASHBOARDS: type('[Organization] updateByIdDashboards'),
  UPDATE_BY_ID_DASHBOARDS_SUCCESS: type('[Organization] updateByIdDashboards success'),
  UPDATE_BY_ID_DASHBOARDS_FAIL: type('[Organization] updateByIdDashboards fail'),

  LINK_DASHBOARDS: type('[Organization] linkDashboards'),
  LINK_DASHBOARDS_SUCCESS: type('[Organization] linkDashboards success'),
  LINK_DASHBOARDS_FAIL: type('[Organization] linkDashboards fail'),

  UNLINK_DASHBOARDS: type('[Organization] unlinkDashboards'),
  UNLINK_DASHBOARDS_SUCCESS: type('[Organization] unlinkDashboards success'),
  UNLINK_DASHBOARDS_FAIL: type('[Organization] unlinkDashboards fail'),

  GET_MEMBERS: type('[Organization] getMembers'),
  GET_MEMBERS_SUCCESS: type('[Organization] getMembers success'),
  GET_MEMBERS_FAIL: type('[Organization] getMembers fail'),

  CREATE_MEMBERS: type('[Organization] createMembers'),
  CREATE_MEMBERS_SUCCESS: type('[Organization] createMembers success'),
  CREATE_MEMBERS_FAIL: type('[Organization] createMembers fail'),

  DELETE_MEMBERS: type('[Organization] deleteMembers'),
  DELETE_MEMBERS_SUCCESS: type('[Organization] deleteMembers success'),
  DELETE_MEMBERS_FAIL: type('[Organization] deleteMembers fail'),

  GET_MESSAGES: type('[Organization] getMessages'),
  GET_MESSAGES_SUCCESS: type('[Organization] getMessages success'),
  GET_MESSAGES_FAIL: type('[Organization] getMessages fail'),

  CREATE_MESSAGES: type('[Organization] createMessages'),
  CREATE_MESSAGES_SUCCESS: type('[Organization] createMessages success'),
  CREATE_MESSAGES_FAIL: type('[Organization] createMessages fail'),

  DELETE_MESSAGES: type('[Organization] deleteMessages'),
  DELETE_MESSAGES_SUCCESS: type('[Organization] deleteMessages success'),
  DELETE_MESSAGES_FAIL: type('[Organization] deleteMessages fail'),

  GET_DEVICES: type('[Organization] getDevices'),
  GET_DEVICES_SUCCESS: type('[Organization] getDevices success'),
  GET_DEVICES_FAIL: type('[Organization] getDevices fail'),

  CREATE_DEVICES: type('[Organization] createDevices'),
  CREATE_DEVICES_SUCCESS: type('[Organization] createDevices success'),
  CREATE_DEVICES_FAIL: type('[Organization] createDevices fail'),

  DELETE_DEVICES: type('[Organization] deleteDevices'),
  DELETE_DEVICES_SUCCESS: type('[Organization] deleteDevices success'),
  DELETE_DEVICES_FAIL: type('[Organization] deleteDevices fail'),

  GET_CATEGORIES: type('[Organization] getCategories'),
  GET_CATEGORIES_SUCCESS: type('[Organization] getCategories success'),
  GET_CATEGORIES_FAIL: type('[Organization] getCategories fail'),

  CREATE_CATEGORIES: type('[Organization] createCategories'),
  CREATE_CATEGORIES_SUCCESS: type('[Organization] createCategories success'),
  CREATE_CATEGORIES_FAIL: type('[Organization] createCategories fail'),

  DELETE_CATEGORIES: type('[Organization] deleteCategories'),
  DELETE_CATEGORIES_SUCCESS: type('[Organization] deleteCategories success'),
  DELETE_CATEGORIES_FAIL: type('[Organization] deleteCategories fail'),

  GET_DASHBOARDS: type('[Organization] getDashboards'),
  GET_DASHBOARDS_SUCCESS: type('[Organization] getDashboards success'),
  GET_DASHBOARDS_FAIL: type('[Organization] getDashboards fail'),

  CREATE_DASHBOARDS: type('[Organization] createDashboards'),
  CREATE_DASHBOARDS_SUCCESS: type('[Organization] createDashboards success'),
  CREATE_DASHBOARDS_FAIL: type('[Organization] createDashboards fail'),

  DELETE_DASHBOARDS: type('[Organization] deleteDashboards'),
  DELETE_DASHBOARDS_SUCCESS: type('[Organization] deleteDashboards success'),
  DELETE_DASHBOARDS_FAIL: type('[Organization] deleteDashboards fail'),

  GET_FILTERED_MESSAGES: type('[Organization] getFilteredMessages'),
  GET_FILTERED_MESSAGES_SUCCESS: type('[Organization] getFilteredMessages success'),
  GET_FILTERED_MESSAGES_FAIL: type('[Organization] getFilteredMessages fail'),

  CREATE_MANY_MEMBERS: type('[Organization] createManyMembers'),
  CREATE_MANY_MEMBERS_SUCCESS: type('[Organization] createManyMembers success'),
  CREATE_MANY_MEMBERS_FAIL: type('[Organization] createManyMembers fail'),

  CREATE_MANY_MESSAGES: type('[Organization] createManyMessages'),
  CREATE_MANY_MESSAGES_SUCCESS: type('[Organization] createManyMessages success'),
  CREATE_MANY_MESSAGES_FAIL: type('[Organization] createManyMessages fail'),

  CREATE_MANY_DEVICES: type('[Organization] createManyDevices'),
  CREATE_MANY_DEVICES_SUCCESS: type('[Organization] createManyDevices success'),
  CREATE_MANY_DEVICES_FAIL: type('[Organization] createManyDevices fail'),

  CREATE_MANY_CATEGORIES: type('[Organization] createManyCategories'),
  CREATE_MANY_CATEGORIES_SUCCESS: type('[Organization] createManyCategories success'),
  CREATE_MANY_CATEGORIES_FAIL: type('[Organization] createManyCategories fail'),

  CREATE_MANY_DASHBOARDS: type('[Organization] createManyDashboards'),
  CREATE_MANY_DASHBOARDS_SUCCESS: type('[Organization] createManyDashboards success'),
  CREATE_MANY_DASHBOARDS_FAIL: type('[Organization] createManyDashboards fail'),

});
export const OrganizationActions =
Object.assign(BaseLoopbackActionsFactory<Organization>(OrganizationActionTypes), {

  /**
   * findByIdMembers Action.
   * Find a related item by id for Members.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Members
   * @param {any} meta (optional).
   * 
   */
  findByIdMembers: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MEMBERS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * findByIdMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdMembers Action.
   * Delete a related item by id for Members.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Members
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMembers: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MEMBERS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * destroyByIdMembersSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MEMBERS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdMembers Action.
   * Update a related item by id for Members.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Members
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdMembers: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MEMBERS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * updateByIdMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkMembers Action.
   * Add a related item by id for Members.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Members
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkMembers: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MEMBERS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkMembers Action.
   * Remove the Members relation to an item by id.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Members
   * @param {any} meta (optional).
   * 
   */
  unlinkMembers: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MEMBERS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkMembersSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MEMBERS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Organization id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = OrganizationActionTypes.GET_USER;
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
    public readonly type = OrganizationActionTypes.GET_USER_SUCCESS;
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
    public readonly type = OrganizationActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdMessages Action.
   * Find a related item by id for Messages.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  findByIdMessages: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MESSAGES;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdMessages Action.
   * Delete a related item by id for Messages.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessages: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MESSAGES;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdMessages Action.
   * Update a related item by id for Messages.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Messages
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessages: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MESSAGES;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkMessages Action.
   * Add a related item by id for Messages.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Messages
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkMessages: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MESSAGES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkMessagesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkMessagesFail: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkMessages Action.
   * Remove the Messages relation to an item by id.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  unlinkMessages: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MESSAGES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkMessagesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkMessagesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MESSAGES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkMessagesFail: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdDevices Action.
   * Find a related item by id for Devices.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  findByIdDevices: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DEVICES;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdDevices Action.
   * Delete a related item by id for Devices.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDevices: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DEVICES;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdDevices Action.
   * Update a related item by id for Devices.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Devices
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdDevices: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DEVICES;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkDevices Action.
   * Add a related item by id for Devices.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Devices
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkDevices: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DEVICES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkDevicesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkDevicesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DEVICES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkDevicesFail: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkDevices Action.
   * Remove the Devices relation to an item by id.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  unlinkDevices: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DEVICES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkDevicesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkDevicesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DEVICES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkDevicesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkDevicesFail: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdCategories Action.
   * Find a related item by id for Categories.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Categories
   * @param {any} meta (optional).
   * 
   */
  findByIdCategories: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdCategories Action.
   * Delete a related item by id for Categories.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Categories
   * @param {any} meta (optional).
   * 
   */
  destroyByIdCategories: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdCategories Action.
   * Update a related item by id for Categories.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Categories
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdCategories: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkCategories Action.
   * Add a related item by id for Categories.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Categories
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkCategories: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_CATEGORIES;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkCategoriesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkCategoriesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_CATEGORIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkCategoriesFail: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkCategories Action.
   * Remove the Categories relation to an item by id.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Categories
   * @param {any} meta (optional).
   * 
   */
  unlinkCategories: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_CATEGORIES;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkCategoriesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkCategoriesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_CATEGORIES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkCategoriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkCategoriesFail: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdDashboards Action.
   * Find a related item by id for Dashboards.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Dashboards
   * @param {any} meta (optional).
   * 
   */
  findByIdDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.FIND_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdDashboards Action.
   * Delete a related item by id for Dashboards.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Dashboards
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.DESTROY_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdDashboards Action.
   * Update a related item by id for Dashboards.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Dashboards
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.UPDATE_BY_ID_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkDashboards Action.
   * Add a related item by id for Dashboards.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Dashboards
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DASHBOARDS;
      public payload: {id: any, fk: any, data: any, customHeaders};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data, customHeaders};
    }
  },
  /**
   * linkDashboardsSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  linkDashboardsSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DASHBOARDS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * linkDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  linkDashboardsFail: class implements Action {
    public readonly type = OrganizationActionTypes.LINK_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkDashboards Action.
   * Remove the Dashboards relation to an item by id.
   *
   * @param {any} id Organization id
   * @param {any} fk Foreign key for Dashboards
   * @param {any} meta (optional).
   * 
   */
  unlinkDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DASHBOARDS;
      public payload: {id: any, fk: any, customHeaders};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, customHeaders};
    }
  },
  /**
   * unlinkDashboardsSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  unlinkDashboardsSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DASHBOARDS_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * unlinkDashboardsFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  unlinkDashboardsFail: class implements Action {
    public readonly type = OrganizationActionTypes.UNLINK_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMembers Action.
   * Queries Members of Organization.
   *
   * @param {any} id Organization id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getMembers: class implements Action {
    public readonly type = OrganizationActionTypes.GET_MEMBERS;
      public payload: {id: any, filter: LoopBackFilter, customHeaders};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, customHeaders};
    }
  },
  /**
   * getMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.GET_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.GET_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createMembers Action.
   * Creates a new instance in Members of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createMembers: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MEMBERS;
      public payload: {id: any, data: any, customHeaders};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteMembers Action.
   * Deletes all Members of this model.
   *
   * @param {any} id Organization id
   * @param {any} meta (optional).
   * 
   */
  deleteMembers: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_MEMBERS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMembersSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_MEMBERS_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessages Action.
   * Queries Messages of Organization.
   *
   * @param {any} id Organization id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getMessages: class implements Action {
    public readonly type = OrganizationActionTypes.GET_MESSAGES;
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
    public readonly type = OrganizationActionTypes.GET_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.GET_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createMessages: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MESSAGES;
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
    public readonly type = OrganizationActionTypes.CREATE_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteMessages Action.
   * Deletes all Messages of this model.
   *
   * @param {any} id Organization id
   * @param {any} meta (optional).
   * 
   */
  deleteMessages: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_MESSAGES;
      
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
    public readonly type = OrganizationActionTypes.DELETE_MESSAGES_SUCCESS;
  
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
    public readonly type = OrganizationActionTypes.DELETE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDevices Action.
   * Queries Devices of Organization.
   *
   * @param {any} id Organization id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getDevices: class implements Action {
    public readonly type = OrganizationActionTypes.GET_DEVICES;
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
    public readonly type = OrganizationActionTypes.GET_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.GET_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createDevices: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_DEVICES;
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
    public readonly type = OrganizationActionTypes.CREATE_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDevices Action.
   * Deletes all Devices of this model.
   *
   * @param {any} id Organization id
   * @param {any} meta (optional).
   * 
   */
  deleteDevices: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_DEVICES;
      
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
    public readonly type = OrganizationActionTypes.DELETE_DEVICES_SUCCESS;
  
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
    public readonly type = OrganizationActionTypes.DELETE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getCategories Action.
   * Queries Categories of Organization.
   *
   * @param {any} id Organization id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getCategories: class implements Action {
    public readonly type = OrganizationActionTypes.GET_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.GET_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.GET_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createCategories Action.
   * Creates a new instance in Categories of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createCategories: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.CREATE_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteCategories Action.
   * Deletes all Categories of this model.
   *
   * @param {any} id Organization id
   * @param {any} meta (optional).
   * 
   */
  deleteCategories: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_CATEGORIES;
      
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
    public readonly type = OrganizationActionTypes.DELETE_CATEGORIES_SUCCESS;
  
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
    public readonly type = OrganizationActionTypes.DELETE_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDashboards Action.
   * Queries Dashboards of Organization.
   *
   * @param {any} id Organization id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.GET_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.GET_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.GET_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createDashboards Action.
   * Creates a new instance in Dashboards of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.CREATE_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDashboards Action.
   * Deletes all Dashboards of this model.
   *
   * @param {any} id Organization id
   * @param {any} meta (optional).
   * 
   */
  deleteDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.DELETE_DASHBOARDS;
      
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
    public readonly type = OrganizationActionTypes.DELETE_DASHBOARDS_SUCCESS;
  
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
    public readonly type = OrganizationActionTypes.DELETE_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFilteredMessages Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} id Organization id
   * @param {object} filter Message filter
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  getFilteredMessages: class implements Action {
    public readonly type = OrganizationActionTypes.GET_FILTERED_MESSAGES;
      public payload: {id: any, filter: LoopBackFilter, req: any, customHeaders};

    constructor(id: any, filter: LoopBackFilter, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter, req, customHeaders};
    }
  },
  /**
   * getFilteredMessagesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getFilteredMessagesSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.GET_FILTERED_MESSAGES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFilteredMessagesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFilteredMessagesFail: class implements Action {
    public readonly type = OrganizationActionTypes.GET_FILTERED_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyMembers Action.
   * Creates a new instance in Members of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyMembers: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_MEMBERS;
      public payload: {id: any, data: any[], customHeaders};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data, customHeaders};
    }
  },
  /**
   * createManyMembersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyMembersSuccess: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_MEMBERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyMembersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyMembersFail: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_MEMBERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyMessages: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_MESSAGES;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_MESSAGES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyDevices: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_DEVICES;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_DEVICES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyCategories Action.
   * Creates a new instance in Categories of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyCategories: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_CATEGORIES;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_CATEGORIES_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_CATEGORIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyDashboards Action.
   * Creates a new instance in Dashboards of this model.
   *
   * @param {any} id Organization id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyDashboards: class implements Action {
    public readonly type = OrganizationActionTypes.CREATE_MANY_DASHBOARDS;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_DASHBOARDS_SUCCESS;
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
    public readonly type = OrganizationActionTypes.CREATE_MANY_DASHBOARDS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});