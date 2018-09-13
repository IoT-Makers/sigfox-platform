/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  GET_DEVICE: type('[Message] getDevice'),
  GET_DEVICE_SUCCESS: type('[Message] getDevice success'),
  GET_DEVICE_FAIL: type('[Message] getDevice fail'),

  FIND_BY_ID_GEOLOCS: type('[Message] findByIdGeolocs'),
  FIND_BY_ID_GEOLOCS_SUCCESS: type('[Message] findByIdGeolocs success'),
  FIND_BY_ID_GEOLOCS_FAIL: type('[Message] findByIdGeolocs fail'),

  DESTROY_BY_ID_GEOLOCS: type('[Message] destroyByIdGeolocs'),
  DESTROY_BY_ID_GEOLOCS_SUCCESS: type('[Message] destroyByIdGeolocs success'),
  DESTROY_BY_ID_GEOLOCS_FAIL: type('[Message] destroyByIdGeolocs fail'),

  UPDATE_BY_ID_GEOLOCS: type('[Message] updateByIdGeolocs'),
  UPDATE_BY_ID_GEOLOCS_SUCCESS: type('[Message] updateByIdGeolocs success'),
  UPDATE_BY_ID_GEOLOCS_FAIL: type('[Message] updateByIdGeolocs fail'),

  GET_USER: type('[Message] getUser'),
  GET_USER_SUCCESS: type('[Message] getUser success'),
  GET_USER_FAIL: type('[Message] getUser fail'),

  FIND_BY_ID_ORGANIZATIONS: type('[Message] findByIdOrganizations'),
  FIND_BY_ID_ORGANIZATIONS_SUCCESS: type('[Message] findByIdOrganizations success'),
  FIND_BY_ID_ORGANIZATIONS_FAIL: type('[Message] findByIdOrganizations fail'),

  DESTROY_BY_ID_ORGANIZATIONS: type('[Message] destroyByIdOrganizations'),
  DESTROY_BY_ID_ORGANIZATIONS_SUCCESS: type('[Message] destroyByIdOrganizations success'),
  DESTROY_BY_ID_ORGANIZATIONS_FAIL: type('[Message] destroyByIdOrganizations fail'),

  UPDATE_BY_ID_ORGANIZATIONS: type('[Message] updateByIdOrganizations'),
  UPDATE_BY_ID_ORGANIZATIONS_SUCCESS: type('[Message] updateByIdOrganizations success'),
  UPDATE_BY_ID_ORGANIZATIONS_FAIL: type('[Message] updateByIdOrganizations fail'),

  LINK_ORGANIZATIONS: type('[Message] linkOrganizations'),
  LINK_ORGANIZATIONS_SUCCESS: type('[Message] linkOrganizations success'),
  LINK_ORGANIZATIONS_FAIL: type('[Message] linkOrganizations fail'),

  UNLINK_ORGANIZATIONS: type('[Message] unlinkOrganizations'),
  UNLINK_ORGANIZATIONS_SUCCESS: type('[Message] unlinkOrganizations success'),
  UNLINK_ORGANIZATIONS_FAIL: type('[Message] unlinkOrganizations fail'),

  GET_GEOLOCS: type('[Message] getGeolocs'),
  GET_GEOLOCS_SUCCESS: type('[Message] getGeolocs success'),
  GET_GEOLOCS_FAIL: type('[Message] getGeolocs fail'),

  CREATE_GEOLOCS: type('[Message] createGeolocs'),
  CREATE_GEOLOCS_SUCCESS: type('[Message] createGeolocs success'),
  CREATE_GEOLOCS_FAIL: type('[Message] createGeolocs fail'),

  DELETE_GEOLOCS: type('[Message] deleteGeolocs'),
  DELETE_GEOLOCS_SUCCESS: type('[Message] deleteGeolocs success'),
  DELETE_GEOLOCS_FAIL: type('[Message] deleteGeolocs fail'),

  GET_ORGANIZATIONS: type('[Message] getOrganizations'),
  GET_ORGANIZATIONS_SUCCESS: type('[Message] getOrganizations success'),
  GET_ORGANIZATIONS_FAIL: type('[Message] getOrganizations fail'),

  CREATE_ORGANIZATIONS: type('[Message] createOrganizations'),
  CREATE_ORGANIZATIONS_SUCCESS: type('[Message] createOrganizations success'),
  CREATE_ORGANIZATIONS_FAIL: type('[Message] createOrganizations fail'),

  DELETE_ORGANIZATIONS: type('[Message] deleteOrganizations'),
  DELETE_ORGANIZATIONS_SUCCESS: type('[Message] deleteOrganizations success'),
  DELETE_ORGANIZATIONS_FAIL: type('[Message] deleteOrganizations fail'),

  PUT_SIGFOX: type('[Message] putSigfox'),
  PUT_SIGFOX_SUCCESS: type('[Message] putSigfox success'),
  PUT_SIGFOX_FAIL: type('[Message] putSigfox fail'),

  PUT_SIGFOX_ACKNOWLEDGE: type('[Message] putSigfoxAcknowledge'),
  PUT_SIGFOX_ACKNOWLEDGE_SUCCESS: type('[Message] putSigfoxAcknowledge success'),
  PUT_SIGFOX_ACKNOWLEDGE_FAIL: type('[Message] putSigfoxAcknowledge fail'),

  POST_SIGFOX_STATUS: type('[Message] postSigfoxStatus'),
  POST_SIGFOX_STATUS_SUCCESS: type('[Message] postSigfoxStatus success'),
  POST_SIGFOX_STATUS_FAIL: type('[Message] postSigfoxStatus fail'),

  CREATE_MANY_GEOLOCS: type('[Message] createManyGeolocs'),
  CREATE_MANY_GEOLOCS_SUCCESS: type('[Message] createManyGeolocs success'),
  CREATE_MANY_GEOLOCS_FAIL: type('[Message] createManyGeolocs fail'),

  CREATE_MANY_ORGANIZATIONS: type('[Message] createManyOrganizations'),
  CREATE_MANY_ORGANIZATIONS_SUCCESS: type('[Message] createManyOrganizations success'),
  CREATE_MANY_ORGANIZATIONS_FAIL: type('[Message] createManyOrganizations fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * getDevice Action.
   * Fetches belongsTo relation Device.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getDevice: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE;
      public payload: {id: any, refresh: any, customHeaders};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh, customHeaders};
    }
  },
  /**
   * getDeviceSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getDeviceSuccess: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getDeviceFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getDeviceFail: class implements Action {
    public readonly type = MessageActionTypes.GET_DEVICE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdGeolocs Action.
   * Find a related item by id for Geolocs.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  findByIdGeolocs: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_GEOLOCS;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdGeolocs Action.
   * Delete a related item by id for Geolocs.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Geolocs
   * @param {any} meta (optional).
   * 
   */
  destroyByIdGeolocs: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_GEOLOCS;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdGeolocs Action.
   * Update a related item by id for Geolocs.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Geolocs
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdGeolocs: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_GEOLOCS;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Message id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = MessageActionTypes.GET_USER;
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
    public readonly type = MessageActionTypes.GET_USER_SUCCESS;
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
    public readonly type = MessageActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdOrganizations Action.
   * Find a related item by id for Organizations.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizations: class implements Action {
    public readonly type = MessageActionTypes.FIND_BY_ID_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.FIND_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdOrganizations Action.
   * Delete a related item by id for Organizations.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizations: class implements Action {
    public readonly type = MessageActionTypes.DESTROY_BY_ID_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.DESTROY_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdOrganizations Action.
   * Update a related item by id for Organizations.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizations: class implements Action {
    public readonly type = MessageActionTypes.UPDATE_BY_ID_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.UPDATE_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkOrganizations Action.
   * Add a related item by id for Organizations.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkOrganizations: class implements Action {
    public readonly type = MessageActionTypes.LINK_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.LINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.LINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkOrganizations Action.
   * Remove the Organizations relation to an item by id.
   *
   * @param {any} id Message id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizations: class implements Action {
    public readonly type = MessageActionTypes.UNLINK_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.UNLINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.UNLINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getGeolocs Action.
   * Queries Geolocs of Message.
   *
   * @param {any} id Message id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getGeolocs: class implements Action {
    public readonly type = MessageActionTypes.GET_GEOLOCS;
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
    public readonly type = MessageActionTypes.GET_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.GET_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createGeolocs: class implements Action {
    public readonly type = MessageActionTypes.CREATE_GEOLOCS;
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
    public readonly type = MessageActionTypes.CREATE_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteGeolocs Action.
   * Deletes all Geolocs of this model.
   *
   * @param {any} id Message id
   * @param {any} meta (optional).
   * 
   */
  deleteGeolocs: class implements Action {
    public readonly type = MessageActionTypes.DELETE_GEOLOCS;
      
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
    public readonly type = MessageActionTypes.DELETE_GEOLOCS_SUCCESS;
  
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
    public readonly type = MessageActionTypes.DELETE_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganizations Action.
   * Queries Organizations of Message.
   *
   * @param {any} id Message id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getOrganizations: class implements Action {
    public readonly type = MessageActionTypes.GET_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.GET_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.GET_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createOrganizations: class implements Action {
    public readonly type = MessageActionTypes.CREATE_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.CREATE_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteOrganizations Action.
   * Deletes all Organizations of this model.
   *
   * @param {any} id Message id
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizations: class implements Action {
    public readonly type = MessageActionTypes.DELETE_ORGANIZATIONS;
      
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
    public readonly type = MessageActionTypes.DELETE_ORGANIZATIONS_SUCCESS;
  
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
    public readonly type = MessageActionTypes.DELETE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * putSigfox Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `data` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  putSigfox: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX;
      public payload: {req: any, data: any, customHeaders};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data, customHeaders};
    }
  },
  /**
   * putSigfoxSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  putSigfoxSuccess: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * putSigfoxFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  putSigfoxFail: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * putSigfoxAcknowledge Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `data` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  putSigfoxAcknowledge: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_ACKNOWLEDGE;
      public payload: {req: any, data: any, customHeaders};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data, customHeaders};
    }
  },
  /**
   * putSigfoxAcknowledgeSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  putSigfoxAcknowledgeSuccess: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_ACKNOWLEDGE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * putSigfoxAcknowledgeFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  putSigfoxAcknowledgeFail: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX_ACKNOWLEDGE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * postSigfoxStatus Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `data` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  postSigfoxStatus: class implements Action {
    public readonly type = MessageActionTypes.POST_SIGFOX_STATUS;
      public payload: {req: any, data: any, customHeaders};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data, customHeaders};
    }
  },
  /**
   * postSigfoxStatusSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  postSigfoxStatusSuccess: class implements Action {
    public readonly type = MessageActionTypes.POST_SIGFOX_STATUS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * postSigfoxStatusFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  postSigfoxStatusFail: class implements Action {
    public readonly type = MessageActionTypes.POST_SIGFOX_STATUS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyGeolocs Action.
   * Creates a new instance in Geolocs of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyGeolocs: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_GEOLOCS;
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
    public readonly type = MessageActionTypes.CREATE_MANY_GEOLOCS_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_MANY_GEOLOCS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Message id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizations: class implements Action {
    public readonly type = MessageActionTypes.CREATE_MANY_ORGANIZATIONS;
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
    public readonly type = MessageActionTypes.CREATE_MANY_ORGANIZATIONS_SUCCESS;
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
    public readonly type = MessageActionTypes.CREATE_MANY_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});