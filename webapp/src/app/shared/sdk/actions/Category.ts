/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Category } from '../models';

export const CategoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Category'), {
  FIND_BY_ID_DEVICES: type('[Category] findByIdDevices'),
  FIND_BY_ID_DEVICES_SUCCESS: type('[Category] findByIdDevices success'),
  FIND_BY_ID_DEVICES_FAIL: type('[Category] findByIdDevices fail'),

  DESTROY_BY_ID_DEVICES: type('[Category] destroyByIdDevices'),
  DESTROY_BY_ID_DEVICES_SUCCESS: type('[Category] destroyByIdDevices success'),
  DESTROY_BY_ID_DEVICES_FAIL: type('[Category] destroyByIdDevices fail'),

  UPDATE_BY_ID_DEVICES: type('[Category] updateByIdDevices'),
  UPDATE_BY_ID_DEVICES_SUCCESS: type('[Category] updateByIdDevices success'),
  UPDATE_BY_ID_DEVICES_FAIL: type('[Category] updateByIdDevices fail'),

  GET_USER: type('[Category] getUser'),
  GET_USER_SUCCESS: type('[Category] getUser success'),
  GET_USER_FAIL: type('[Category] getUser fail'),

  FIND_BY_ID_ORGANIZATIONS: type('[Category] findByIdOrganizations'),
  FIND_BY_ID_ORGANIZATIONS_SUCCESS: type('[Category] findByIdOrganizations success'),
  FIND_BY_ID_ORGANIZATIONS_FAIL: type('[Category] findByIdOrganizations fail'),

  DESTROY_BY_ID_ORGANIZATIONS: type('[Category] destroyByIdOrganizations'),
  DESTROY_BY_ID_ORGANIZATIONS_SUCCESS: type('[Category] destroyByIdOrganizations success'),
  DESTROY_BY_ID_ORGANIZATIONS_FAIL: type('[Category] destroyByIdOrganizations fail'),

  UPDATE_BY_ID_ORGANIZATIONS: type('[Category] updateByIdOrganizations'),
  UPDATE_BY_ID_ORGANIZATIONS_SUCCESS: type('[Category] updateByIdOrganizations success'),
  UPDATE_BY_ID_ORGANIZATIONS_FAIL: type('[Category] updateByIdOrganizations fail'),

  LINK_ORGANIZATIONS: type('[Category] linkOrganizations'),
  LINK_ORGANIZATIONS_SUCCESS: type('[Category] linkOrganizations success'),
  LINK_ORGANIZATIONS_FAIL: type('[Category] linkOrganizations fail'),

  UNLINK_ORGANIZATIONS: type('[Category] unlinkOrganizations'),
  UNLINK_ORGANIZATIONS_SUCCESS: type('[Category] unlinkOrganizations success'),
  UNLINK_ORGANIZATIONS_FAIL: type('[Category] unlinkOrganizations fail'),

  GET_DEVICES: type('[Category] getDevices'),
  GET_DEVICES_SUCCESS: type('[Category] getDevices success'),
  GET_DEVICES_FAIL: type('[Category] getDevices fail'),

  CREATE_DEVICES: type('[Category] createDevices'),
  CREATE_DEVICES_SUCCESS: type('[Category] createDevices success'),
  CREATE_DEVICES_FAIL: type('[Category] createDevices fail'),

  DELETE_DEVICES: type('[Category] deleteDevices'),
  DELETE_DEVICES_SUCCESS: type('[Category] deleteDevices success'),
  DELETE_DEVICES_FAIL: type('[Category] deleteDevices fail'),

  GET_ORGANIZATIONS: type('[Category] getOrganizations'),
  GET_ORGANIZATIONS_SUCCESS: type('[Category] getOrganizations success'),
  GET_ORGANIZATIONS_FAIL: type('[Category] getOrganizations fail'),

  CREATE_ORGANIZATIONS: type('[Category] createOrganizations'),
  CREATE_ORGANIZATIONS_SUCCESS: type('[Category] createOrganizations success'),
  CREATE_ORGANIZATIONS_FAIL: type('[Category] createOrganizations fail'),

  DELETE_ORGANIZATIONS: type('[Category] deleteOrganizations'),
  DELETE_ORGANIZATIONS_SUCCESS: type('[Category] deleteOrganizations success'),
  DELETE_ORGANIZATIONS_FAIL: type('[Category] deleteOrganizations fail'),

  DOWNLOAD: type('[Category] download'),
  DOWNLOAD_SUCCESS: type('[Category] download success'),
  DOWNLOAD_FAIL: type('[Category] download fail'),

  DOWNLOAD_FROM_ORGANIZATION: type('[Category] downloadFromOrganization'),
  DOWNLOAD_FROM_ORGANIZATION_SUCCESS: type('[Category] downloadFromOrganization success'),
  DOWNLOAD_FROM_ORGANIZATION_FAIL: type('[Category] downloadFromOrganization fail'),

  CREATE_MANY_DEVICES: type('[Category] createManyDevices'),
  CREATE_MANY_DEVICES_SUCCESS: type('[Category] createManyDevices success'),
  CREATE_MANY_DEVICES_FAIL: type('[Category] createManyDevices fail'),

  CREATE_MANY_ORGANIZATIONS: type('[Category] createManyOrganizations'),
  CREATE_MANY_ORGANIZATIONS_SUCCESS: type('[Category] createManyOrganizations success'),
  CREATE_MANY_ORGANIZATIONS_FAIL: type('[Category] createManyOrganizations fail'),

});
export const CategoryActions =
Object.assign(BaseLoopbackActionsFactory<Category>(CategoryActionTypes), {

  /**
   * findByIdDevices Action.
   * Find a related item by id for Devices.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  findByIdDevices: class implements Action {
    public readonly type = CategoryActionTypes.FIND_BY_ID_DEVICES;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdDevices Action.
   * Delete a related item by id for Devices.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Devices
   * @param {any} meta (optional).
   * 
   */
  destroyByIdDevices: class implements Action {
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_DEVICES;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdDevices Action.
   * Update a related item by id for Devices.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Devices
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdDevices: class implements Action {
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_DEVICES;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getUser Action.
   * Fetches belongsTo relation user.
   *
   * @param {any} id Category id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getUser: class implements Action {
    public readonly type = CategoryActionTypes.GET_USER;
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
    public readonly type = CategoryActionTypes.GET_USER_SUCCESS;
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
    public readonly type = CategoryActionTypes.GET_USER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * findByIdOrganizations Action.
   * Find a related item by id for Organizations.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  findByIdOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.FIND_BY_ID_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.FIND_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdOrganizations Action.
   * Delete a related item by id for Organizations.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  destroyByIdOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.DESTROY_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdOrganizations Action.
   * Update a related item by id for Organizations.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.UPDATE_BY_ID_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * linkOrganizations Action.
   * Add a related item by id for Organizations.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Organizations
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  linkOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.LINK_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.LINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.LINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * unlinkOrganizations Action.
   * Remove the Organizations relation to an item by id.
   *
   * @param {any} id Category id
   * @param {any} fk Foreign key for Organizations
   * @param {any} meta (optional).
   * 
   */
  unlinkOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.UNLINK_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.UNLINK_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.UNLINK_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getDevices Action.
   * Queries Devices of Category.
   *
   * @param {any} id Category id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getDevices: class implements Action {
    public readonly type = CategoryActionTypes.GET_DEVICES;
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
    public readonly type = CategoryActionTypes.GET_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.GET_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createDevices: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_DEVICES;
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
    public readonly type = CategoryActionTypes.CREATE_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteDevices Action.
   * Deletes all Devices of this model.
   *
   * @param {any} id Category id
   * @param {any} meta (optional).
   * 
   */
  deleteDevices: class implements Action {
    public readonly type = CategoryActionTypes.DELETE_DEVICES;
      
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
    public readonly type = CategoryActionTypes.DELETE_DEVICES_SUCCESS;
  
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
    public readonly type = CategoryActionTypes.DELETE_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getOrganizations Action.
   * Queries Organizations of Category.
   *
   * @param {any} id Category id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.GET_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.GET_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.GET_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.CREATE_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteOrganizations Action.
   * Deletes all Organizations of this model.
   *
   * @param {any} id Category id
   * @param {any} meta (optional).
   * 
   */
  deleteOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.DELETE_ORGANIZATIONS;
      
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
    public readonly type = CategoryActionTypes.DELETE_ORGANIZATIONS_SUCCESS;
  
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
    public readonly type = CategoryActionTypes.DELETE_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

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
      public payload: {categoryId: any, type: any, req: any, res: any, customHeaders};

    constructor(categoryId: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {categoryId, type, req, res, customHeaders};
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
      public payload: {organizationId: any, categoryId: any, type: any, req: any, res: any, customHeaders};

    constructor(organizationId: any, categoryId: any, type: any, req: any = {}, res: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {organizationId, categoryId, type, req, res, customHeaders};
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

  /**
   * createManyDevices Action.
   * Creates a new instance in Devices of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyDevices: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_MANY_DEVICES;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_DEVICES_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_DEVICES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyOrganizations Action.
   * Creates a new instance in Organizations of this model.
   *
   * @param {any} id Category id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyOrganizations: class implements Action {
    public readonly type = CategoryActionTypes.CREATE_MANY_ORGANIZATIONS;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_ORGANIZATIONS_SUCCESS;
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
    public readonly type = CategoryActionTypes.CREATE_MANY_ORGANIZATIONS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});