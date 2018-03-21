/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface AlertHistoryInterface {
  "deviceId": string;
  "active"?: boolean;
  "one_shot"?: boolean;
  "last_trigger"?: Date;
  "key": string;
  "value_exact"?: any;
  "value_min"?: any;
  "value_max"?: any;
  "value_less"?: any;
  "value_more"?: any;
  "location"?: GeoPoint;
  "radius"?: number;
  "message"?: string;
  "id"?: any;
  "userId"?: any;
  "organizationId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "connectorId"?: any;
  Device?: any;
  user?: any;
  Organization?: any;
  Connector?: any;
}

export class AlertHistory implements AlertHistoryInterface {
  "deviceId": string = '';
  "active": boolean = true;
  "one_shot": boolean = false;
  "last_trigger": Date = new Date(0);
  "key": string = '';
  "value_exact": any = <any>null;
  "value_min": any = <any>null;
  "value_max": any = <any>null;
  "value_less": any = <any>null;
  "value_more": any = <any>null;
  "location": GeoPoint = <any>null;
  "radius": number = 0;
  "message": string = '';
  "id": any = <any>null;
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "connectorId": any = <any>null;
  Device: any = null;
  user: any = null;
  Organization: any = null;
  Connector: any = null;
  constructor(data?: AlertHistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AlertHistory`.
   */
  public static getModelName() {
    return "AlertHistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AlertHistory for dynamic purposes.
  **/
  public static factory(data: AlertHistoryInterface): AlertHistory{
    return new AlertHistory(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AlertHistory',
      plural: 'Alerts',
      path: 'Alerts',
      idName: 'id',
      properties: {
        "deviceId": {
          name: 'deviceId',
          type: 'string'
        },
        "active": {
          name: 'active',
          type: 'boolean',
          default: true
        },
        "one_shot": {
          name: 'one_shot',
          type: 'boolean',
          default: false
        },
        "last_trigger": {
          name: 'last_trigger',
          type: 'Date'
        },
        "key": {
          name: 'key',
          type: 'string'
        },
        "value_exact": {
          name: 'value_exact',
          type: 'any',
          default: <any>null
        },
        "value_min": {
          name: 'value_min',
          type: 'any',
          default: <any>null
        },
        "value_max": {
          name: 'value_max',
          type: 'any',
          default: <any>null
        },
        "value_less": {
          name: 'value_less',
          type: 'any',
          default: <any>null
        },
        "value_more": {
          name: 'value_more',
          type: 'any',
          default: <any>null
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "radius": {
          name: 'radius',
          type: 'number'
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "organizationId": {
          name: 'organizationId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "connectorId": {
          name: 'connectorId',
          type: 'any'
        },
      },
      relations: {
        Device: {
          name: 'Device',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'deviceId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organization: {
          name: 'Organization',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'organizationId',
          keyTo: 'id'
        },
        Connector: {
          name: 'Connector',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'connectorId',
          keyTo: 'id'
        },
      }
    }
  }
}
