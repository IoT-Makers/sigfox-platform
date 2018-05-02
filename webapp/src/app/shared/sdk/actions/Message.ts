/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Message } from '../models';

export const MessageActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Message'), {
  PUT_SIGFOX__OLD_TO_REMOVE: type('[Message] putSigfox_OldToRemove'),
  PUT_SIGFOX__OLD_TO_REMOVE_SUCCESS: type('[Message] putSigfox_OldToRemove success'),
  PUT_SIGFOX__OLD_TO_REMOVE_FAIL: type('[Message] putSigfox_OldToRemove fail'),

  PUT_SIGFOX: type('[Message] putSigfox'),
  PUT_SIGFOX_SUCCESS: type('[Message] putSigfox success'),
  PUT_SIGFOX_FAIL: type('[Message] putSigfox fail'),

  PUT_SIGFOX_ACKNOWLEDGE: type('[Message] putSigfoxAcknowledge'),
  PUT_SIGFOX_ACKNOWLEDGE_SUCCESS: type('[Message] putSigfoxAcknowledge success'),
  PUT_SIGFOX_ACKNOWLEDGE_FAIL: type('[Message] putSigfoxAcknowledge fail'),

  POST_SIGFOX_STATUS: type('[Message] postSigfoxStatus'),
  POST_SIGFOX_STATUS_SUCCESS: type('[Message] postSigfoxStatus success'),
  POST_SIGFOX_STATUS_FAIL: type('[Message] postSigfoxStatus fail'),

});
export const MessageActions =
Object.assign(BaseLoopbackActionsFactory<Message>(MessageActionTypes), {

  /**
   * putSigfox_OldToRemove Action.
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
  putSigfox_OldToRemove: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX__OLD_TO_REMOVE;
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
    }
  },
  /**
   * putSigfox_OldToRemoveSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  putSigfox_OldToRemoveSuccess: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX__OLD_TO_REMOVE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * putSigfox_OldToRemoveFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  putSigfox_OldToRemoveFail: class implements Action {
    public readonly type = MessageActionTypes.PUT_SIGFOX__OLD_TO_REMOVE_FAIL;

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
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
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
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
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
      public payload: {req: any, data: any};

    constructor(req: any = {}, data: any, customHeaders?: Function, public meta?: any) {
      this.payload = {req, data};
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
});