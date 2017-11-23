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

  GET_USER: type('[Device] getUser'),
  GET_USER_SUCCESS: type('[Device] getUser success'),
  GET_USER_FAIL: type('[Device] getUser fail'),

  GET_ORGANIZATION: type('[Device] getOrganization'),
  GET_ORGANIZATION_SUCCESS: type('[Device] getOrganization success'),
  GET_ORGANIZATION_FAIL: type('[Device] getOrganization fail'),

  GET_MESSAGES: type('[Device] getMessages'),
  GET_MESSAGES_SUCCESS: type('[Device] getMessages success'),
  GET_MESSAGES_FAIL: type('[Device] getMessages fail'),

  CREATE_MESSAGES: type('[Device] createMessages'),
  CREATE_MESSAGES_SUCCESS: type('[Device] createMessages success'),
  CREATE_MESSAGES_FAIL: type('[Device] createMessages fail'),

  DELETE_MESSAGES: type('[Device] deleteMessages'),
  DELETE_MESSAGES_SUCCESS: type('[Device] deleteMessages success'),
  DELETE_MESSAGES_FAIL: type('[Device] deleteMessages fail'),

  GRAPH_DATA: type('[Device] graphData'),
  GRAPH_DATA_SUCCESS: type('[Device] graphData success'),
  GRAPH_DATA_FAIL: type('[Device] graphData fail'),

  CREATE_MANY_MESSAGES: type('[Device] createManyMessages'),
  CREATE_MANY_MESSAGES_SUCCESS: type('[Device] createManyMessages success'),
  CREATE_MANY_MESSAGES_FAIL: type('[Device] createManyMessages fail'),

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
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
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
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
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
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
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
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
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
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
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
   * getOrganization Action.
   * Fetches belongsTo relation Organization.
   *
   * @param {any} id Device id
   * @param {boolean} refresh 
   * @param {any} meta (optional).
   * 
   */
  getOrganization: class implements Action {
    public readonly type = DeviceActionTypes.GET_ORGANIZATION;
      public payload: {id: any, refresh: any};

    constructor(id: any, refresh: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, refresh};
    }
  },
  /**
   * getOrganizationSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getOrganizationSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GET_ORGANIZATION_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getOrganizationFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getOrganizationFail: class implements Action {
    public readonly type = DeviceActionTypes.GET_ORGANIZATION_FAIL;

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
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
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
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
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
   * graphData Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId Device ID
   * @param {string} dateBegin the starting date-time
   * @param {string} dateEnd the ending date-time
   * @param {any} meta (optional).
   * 
   */
  graphData: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA;
      public payload: {deviceId: any, dateBegin: any, dateEnd: any};

    constructor(deviceId: any, dateBegin: any = {}, dateEnd: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {deviceId, dateBegin, dateEnd};
    }
  },
  /**
   * graphDataSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{any}` - 
   * @param {any} meta (optional).
   * 
   */
  graphDataSuccess: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * graphDataFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  graphDataFail: class implements Action {
    public readonly type = DeviceActionTypes.GRAPH_DATA_FAIL;

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
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
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
});