/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Device } from '../models';

export const DeviceActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Device'), {
  GET_PARSER: type('[Device] getParser'),
  GET_PARSER_SUCCESS: type('[Device] getParser success'),
  GET_PARSER_FAIL: type('[Device] getParser fail'),

  GET_CATEGORY: type('[Device] getCategory'),
  GET_CATEGORY_SUCCESS: type('[Device] getCategory success'),
  GET_CATEGORY_FAIL: type('[Device] getCategory fail'),

  FIND_BY_ID_MESSAGES: type('[Device] findByIdMessages'),
  FIND_BY_ID_MESSAGES_SUCCESS: type('[Device] findByIdMessages success'),
  FIND_BY_ID_MESSAGES_FAIL: type('[Device] findByIdMessages fail'),

  DESTROY_BY_ID_MESSAGES: type('[Device] destroyByIdMessages'),
  DESTROY_BY_ID_MESSAGES_SUCCESS: type('[Device] destroyByIdMessages success'),
  DESTROY_BY_ID_MESSAGES_FAIL: type('[Device] destroyByIdMessages fail'),

  UPDATE_BY_ID_MESSAGES: type('[Device] updateByIdMessages'),
  UPDATE_BY_ID_MESSAGES_SUCCESS: type('[Device] updateByIdMessages success'),
  UPDATE_BY_ID_MESSAGES_FAIL: type('[Device] updateByIdMessages fail'),

  FIND_BY_ID_GEOLOCS: type('[Device] findByIdGeolocs'),
  FIND_BY_ID_GEOLOCS_SUCCESS: type('[Device] findByIdGeolocs success'),
  FIND_BY_ID_GEOLOCS_FAIL: type('[Device] findByIdGeolocs fail'),

  DESTROY_BY_ID_GEOLOCS: type('[Device] destroyByIdGeolocs'),
  DESTROY_BY_ID_GEOLOCS_SUCCESS: type('[Device] destroyByIdGeolocs success'),
  DESTROY_BY_ID_GEOLOCS_FAIL: type('[Device] destroyByIdGeolocs fail'),

  UPDATE_BY_ID_GEOLOCS: type('[Device] updateByIdGeolocs'),
  UPDATE_BY_ID_GEOLOCS_SUCCESS: type('[Device] updateByIdGeolocs success'),
  UPDATE_BY_ID_GEOLOCS_FAIL: type('[Device] updateByIdGeolocs fail'),

  GET_USER: type('[Device] getUser'),
  GET_USER_SUCCESS: type('[Device] getUser success'),
  GET_USER_FAIL: type('[Device] getUser fail'),

  FIND_BY_ID_ORGANIZATIONS: type('[Device] findByIdOrganizations'),
  FIND_BY_ID_ORGANIZATIONS_SUCCESS: type('[Device] findByIdOrganizations success'),
  FIND_BY_ID_ORGANIZATIONS_FAIL: type('[Device] findByIdOrganizations fail'),

  DESTROY_BY_ID_ORGANIZATIONS: type('[Device] destroyByIdOrganizations'),
  DESTROY_BY_ID_ORGANIZATIONS_SUCCESS: type('[Device] destroyByIdOrganizations success'),
  DESTROY_BY_ID_ORGANIZATIONS_FAIL: type('[Device] destroyByIdOrganizations fail'),

  UPDATE_BY_ID_ORGANIZATIONS: type('[Device] updateByIdOrganizations'),
  UPDATE_BY_ID_ORGANIZATIONS_SUCCESS: type('[Device] updateByIdOrganizations success'),
  UPDATE_BY_ID_ORGANIZATIONS_FAIL: type('[Device] updateByIdOrganizations fail'),

  LINK_ORGANIZATIONS: type('[Device] linkOrganizations'),
  LINK_ORGANIZATIONS_SUCCESS: type('[Device] linkOrganizations success'),
  LINK_ORGANIZATIONS_FAIL: type('[Device] linkOrganizations fail'),

  UNLINK_ORGANIZATIONS: type('[Device] unlinkOrganizations'),
  UNLINK_ORGANIZATIONS_SUCCESS: type('[Device] unlinkOrganizations success'),
  UNLINK_ORGANIZATIONS_FAIL: type('[Device] unlinkOrganizations fail'),

  FIND_BY_ID_ALERTS: type('[Device] findByIdAlerts'),
  FIND_BY_ID_ALERTS_SUCCESS: type('[Device] findByIdAlerts success'),
  FIND_BY_ID_ALERTS_FAIL: type('[Device] findByIdAlerts fail'),

  DESTROY_BY_ID_ALERTS: type('[Device] destroyByIdAlerts'),
  DESTROY_BY_ID_ALERTS_SUCCESS: type('[Device] destroyByIdAlerts success'),
  DESTROY_BY_ID_ALERTS_FAIL: type('[Device] destroyByIdAlerts fail'),

  UPDATE_BY_ID_ALERTS: type('[Device] updateByIdAlerts'),
  UPDATE_BY_ID_ALERTS_SUCCESS: type('[Device] updateByIdAlerts success'),
  UPDATE_BY_ID_ALERTS_FAIL: type('[Device] updateByIdAlerts fail'),

  GET_MESSAGES: type('[Device] getMessages'),
  GET_MESSAGES_SUCCESS: type('[Device] getMessages success'),
  GET_MESSAGES_FAIL: type('[Device] getMessages fail'),

  CREATE_MESSAGES: type('[Device] createMessages'),
  CREATE_MESSAGES_SUCCESS: type('[Device] createMessages success'),
  CREATE_MESSAGES_FAIL: type('[Device] createMessages fail'),

  DELETE_MESSAGES: type('[Device] deleteMessages'),
  DELETE_MESSAGES_SUCCESS: type('[Device] deleteMessages success'),
  DELETE_MESSAGES_FAIL: type('[Device] deleteMessages fail'),

  GET_GEOLOCS: type('[Device] getGeolocs'),
  GET_GEOLOCS_SUCCESS: type('[Device] getGeolocs success'),
  GET_GEOLOCS_FAIL: type('[Device] getGeolocs fail'),

  CREATE_GEOLOCS: type('[Device] createGeolocs'),
  CREATE_GEOLOCS_SUCCESS: type('[Device] createGeolocs success'),
  CREATE_GEOLOCS_FAIL: type('[Device] createGeolocs fail'),

  DELETE_GEOLOCS: type('[Device] deleteGeolocs'),
  DELETE_GEOLOCS_SUCCESS: type('[Device] deleteGeolocs success'),
  DELETE_GEOLOCS_FAIL: type('[Device] deleteGeolocs fail'),

  GET_ORGANIZATIONS: type('[Device] getOrganizations'),
  GET_ORGANIZATIONS_SUCCESS: type('[Device] getOrganizations success'),
  GET_ORGANIZATIONS_FAIL: type('[Device] getOrganizations fail'),

  CREATE_ORGANIZATIONS: type('[Device] createOrganizations'),
  CREATE_ORGANIZATIONS_SUCCESS: type('[Device] createOrganizations success'),
  CREATE_ORGANIZATIONS_FAIL: type('[Device] createOrganizations fail'),

  DELETE_ORGANIZATIONS: type('[Device] deleteOrganizations'),
  DELETE_ORGANIZATIONS_SUCCESS: type('[Device] deleteOrganizations success'),
  DELETE_ORGANIZATIONS_FAIL: type('[Device] deleteOrganizations fail'),

  GET_ALERTS: type('[Device] getAlerts'),
  GET_ALERTS_SUCCESS: type('[Device] getAlerts success'),
  GET_ALERTS_FAIL: type('[Device] getAlerts fail'),

  CREATE_ALERTS: type('[Device] createAlerts'),
  CREATE_ALERTS_SUCCESS: type('[Device] createAlerts success'),
  CREATE_ALERTS_FAIL: type('[Device] createAlerts fail'),

  DELETE_ALERTS: type('[Device] deleteAlerts'),
  DELETE_ALERTS_SUCCESS: type('[Device] deleteAlerts success'),
  DELETE_ALERTS_FAIL: type('[Device] deleteAlerts fail'),

  DOWNLOAD: type('[Device] download'),
  DOWNLOAD_SUCCESS: type('[Device] download success'),
  DOWNLOAD_FAIL: type('[Device] download fail'),

  TIME_SERIES: type('[Device] timeSeries'),
  TIME_SERIES_SUCCESS: type('[Device] timeSeries success'),
  TIME_SERIES_FAIL: type('[Device] timeSeries fail'),

  GET_MESSAGES_FROM_SIGFOX_BACKEND: type('[Device] getMessagesFromSigfoxBackend'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_SUCCESS: type('[Device] getMessagesFromSigfoxBackend success'),
  GET_MESSAGES_FROM_SIGFOX_BACKEND_FAIL: type('[Device] getMessagesFromSigfoxBackend fail'),

  CREATE_MANY_MESSAGES: type('[Device] createManyMessages'),
  CREATE_MANY_MESSAGES_SUCCESS: type('[Device] createManyMessages success'),
  CREATE_MANY_MESSAGES_FAIL: type('[Device] createManyMessages fail'),

  CREATE_MANY_GEOLOCS: type('[Device] createManyGeolocs'),
  CREATE_MANY_GEOLOCS_SUCCESS: type('[Device] createManyGeolocs success'),
  CREATE_MANY_GEOLOCS_FAIL: type('[Device] createManyGeolocs fail'),

  CREATE_MANY_ORGANIZATIONS: type('[Device] createManyOrganizations'),
  CREATE_MANY_ORGANIZATIONS_SUCCESS: type('[Device] createManyOrganizations success'),
  CREATE_MANY_ORGANIZATIONS_FAIL: type('[Device] createManyOrganizations fail'),

  CREATE_MANY_ALERTS: type('[Device] createManyAlerts'),
  CREATE_MANY_ALERTS_SUCCESS: type('[Device] createManyAlerts success'),
  CREATE_MANY_ALERTS_FAIL: type('[Device] createManyAlerts fail'),

});
export const DeviceActions =
Object.assign(BaseLoopbackActionsFactory<Device>(DeviceActionTypes), {

  /**
   * getParser Action.
   * Fetches belongsTo relation Parser.
   *
   * @param {any} id Device id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getParser: class implements Action {
    public readonly type = DeviceActionTypes.GET_PARSER;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getParserSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getParserSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GET_PARSER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getParserFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getParserFail: class implements Action {
    public readonly type = DeviceActionTypes.GET_PARSER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getCategory Action.
   * Fetches belongsTo relation Category.
   *
   * @param {any} id Device id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getCategory: class implements Action {
    public readonly type = DeviceActionTypes.GET_CATEGORY;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getCategorySuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getCategorySuccess: class implements Action {
    public readonly type = DeviceActionTypes.GET_CATEGORY_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getCategoryFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getCategoryFail: class implements Action {
    public readonly type = DeviceActionTypes.GET_CATEGORY_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdMessages Action.
   * Find a related item by id for Messages.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  findByIdMessages: class implements Action {
    public readonly type = DeviceActionTypes.FIND_BY_ID_MESSAGES;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdMessages Action.
   * Delete a related item by id for Messages.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Messages
   * @param {any} meta (optional).
   * 
   */
  destroyByIdMessages: class implements Action {
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_MESSAGES;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdMessages Action.
   * Update a related item by id for Messages.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Messages
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdMessages: class implements Action {
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_MESSAGES;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdGeolocs Action.
   * Find a related item by id for Geolocs.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  findByIdGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.FIND_BY_ID_GEOLOCS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdGeolocs Action.
   * Delete a related item by id for Geolocs.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  destroyByIdGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_GEOLOCS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdGeolocs Action.
   * Update a related item by id for Geolocs.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Geolocs
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_GEOLOCS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Device id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = DeviceActionTypes.GET_USER;
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
    public readonly type = DeviceActionTypes.GET_USER_SUCCESS;
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
    public readonly type = DeviceActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdOrganizations Action.
   * Find a related item by id for Organizations.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.FIND_BY_ID_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdOrganizations Action.
   * Delete a related item by id for Organizations.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdOrganizations Action.
   * Update a related item by id for Organizations.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkOrganizations Action.
   * Add a related item by id for Organizations.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.LINK_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.LINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.LINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkOrganizations Action.
   * Remove the Organizations relation to an item by id.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.UNLINK_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.UNLINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.UNLINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdAlerts Action.
   * Find a related item by id for Alerts.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Alerts
   * @param {any} meta (optional).
   * 
   */
  findByIdAlerts: class implements Action {
    public readonly type = DeviceActionTypes.FIND_BY_ID_ALERTS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.FIND_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdAlerts Action.
   * Delete a related item by id for Alerts.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Alerts
   * @param {any} meta (optional).
   * 
   */
  destroyByIdAlerts: class implements Action {
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ALERTS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.DESTROY_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdAlerts Action.
   * Update a related item by id for Alerts.
   *
   * @param {any} id Device id
   * @param {any} fk Foreign key for Alerts
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdAlerts: class implements Action {
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ALERTS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.UPDATE_BY_ID_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessages Action.
   * Queries Messages of Device.
   *
   * @param {any} id Device id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getMessages: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES;
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
    public readonly type = DeviceActionTypes.GET_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.GET_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createMessages: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_MESSAGES;
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
    public readonly type = DeviceActionTypes.CREATE_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteMessages Action.
   * Deletes all Messages of this model.
   *
   * @param {any} id Device id
   * @param {any} meta (optional).
   * 
   */
  deleteMessages: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_MESSAGES;
      
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
    public readonly type = DeviceActionTypes.DELETE_MESSAGES_SUCCESS;
  
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
    public readonly type = DeviceActionTypes.DELETE_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getGeolocs Action.
   * Queries Geolocs of Device.
   *
   * @param {any} id Device id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.GET_GEOLOCS;
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
    public readonly type = DeviceActionTypes.GET_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.GET_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_GEOLOCS;
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
    public readonly type = DeviceActionTypes.CREATE_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteGeolocs Action.
   * Deletes all Geolocs of this model.
   *
   * @param {any} id Device id
   * @param {any} meta (optional).
   * 
   */
  deleteGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_GEOLOCS;
      
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
    public readonly type = DeviceActionTypes.DELETE_GEOLOCS_SUCCESS;
  
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
    public readonly type = DeviceActionTypes.DELETE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganizations Action.
   * Queries Organizations of Device.
   *
   * @param {any} id Device id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.GET_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.GET_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.GET_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.CREATE_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteOrganizations Action.
   * Deletes all Organizations of this model.
   *
   * @param {any} id Device id
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_ORGANIZATIONS;
      
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
    public readonly type = DeviceActionTypes.DELETE_ORGANIZATIONS_SUCCESS;
  
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
    public readonly type = DeviceActionTypes.DELETE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getAlerts Action.
   * Queries Alerts of Device.
   *
   * @param {any} id Device id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getAlerts: class implements Action {
    public readonly type = DeviceActionTypes.GET_ALERTS;
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
    public readonly type = DeviceActionTypes.GET_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.GET_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createAlerts Action.
   * Creates a new instance in Alerts of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createAlerts: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_ALERTS;
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
    public readonly type = DeviceActionTypes.CREATE_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteAlerts Action.
   * Deletes all Alerts of this model.
   *
   * @param {any} id Device id
   * @param {any} meta (optional).
   * 
   */
  deleteAlerts: class implements Action {
    public readonly type = DeviceActionTypes.DELETE_ALERTS;
      
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
    public readonly type = DeviceActionTypes.DELETE_ALERTS_SUCCESS;
  
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
    public readonly type = DeviceActionTypes.DELETE_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} id 
   * @param {string} type 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = DeviceActionTypes.DOWNLOAD;
      public payload: {id: any, type: any, req: any, res: any, customHeaders};

    constructor(id: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, type, req, res, customHeaders};
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
    public readonly type = DeviceActionTypes.DOWNLOAD_SUCCESS;
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
    public readonly type = DeviceActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * timeSeries Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId Device Id
   * @param {string} dateBegin The starting date-time
   * @param {string} dateEnd The ending date-time
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  timeSeries: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any, req: any, customHeaders};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd, req, customHeaders};
    }
  },
  /**
   * timeSeriesSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  timeSeriesSuccess: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * timeSeriesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  timeSeriesFail: class implements Action {
    public readonly type = DeviceActionTypes.TIME_SERIES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getMessagesFromSigfoxBackend Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} id Device Id
   * @param {number} limit Limit retrieved messages (max 100)
   * @param {number} before Before
   * @param {object} req 
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackend: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND;
      public payload: {id: any, limit: any, before: any, req: any, customHeaders};

    constructor(id: any, limit: any = {}, before: any = {}, req: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, limit, before, req, customHeaders};
    }
  },
  /**
   * getMessagesFromSigfoxBackendSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackendSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getMessagesFromSigfoxBackendFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getMessagesFromSigfoxBackendFail: class implements Action {
    public readonly type = DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyMessages Action.
   * Creates a new instance in Messages of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyMessages: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_MANY_MESSAGES;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_MESSAGES_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_MESSAGES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyGeolocs: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_MANY_GEOLOCS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_GEOLOCS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizations: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_MANY_ORGANIZATIONS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_ORGANIZATIONS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyAlerts Action.
   * Creates a new instance in Alerts of this model.
   *
   * @param {any} id Device id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyAlerts: class implements Action {
    public readonly type = DeviceActionTypes.CREATE_MANY_ALERTS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_ALERTS_SUCCESS;
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
    public readonly type = DeviceActionTypes.CREATE_MANY_ALERTS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});