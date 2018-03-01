/* tslint:disable */

declare var Object: any;
export interface AlertInterface {
  'deviceId': string;
  "key": string;
  'value_exact'?: any;
  "value_min"?: any;
  "value_max"?: any;
  "value_less"?: any;
  "value_more"?: any;
  "message"?: string;
  'last_trigger'?: Date;
  "id"?: number;
  'userId'?: number;
  'organizationId'?: number;
  'createdAt'?: Date;
  'updatedAt'?: Date;
  'connectorId'?: number;
  Device?: any;
  user?: any;
  Organization?: any;
  Connector?: any;
}

export class Alert implements AlertInterface {
  'deviceId': string = '';
  "key": string = '';
  'value_exact': any = <any>null;
  "value_min": any = <any>null;
  "value_max": any = <any>null;
  "value_less": any = <any>null;
  "value_more": any = <any>null;
  "message": string = '';
  'last_trigger': Date = new Date(0);
  "id": number = 0;
  'userId': number = 0;
  'organizationId': number = 0;
  'createdAt': Date = new Date(0);
  'updatedAt': Date = new Date(0);
  'connectorId': number = 0;
  Device: any = null;
  user: any = null;
  Organization: any = null;
  Connector: any = null;
  constructor(data?: AlertInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alert`.
   */
  public static getModelName() {
    return "Alert";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alert for dynamic purposes.
  **/
  public static factory(data: AlertInterface): Alert{
    return new Alert(data);
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
      name: 'Alert',
      plural: 'Alerts',
      path: 'Alerts',
      idName: 'id',
      properties: {
        'deviceId': {
          name: 'deviceId',
          type: 'string'
        },
        "key": {
          name: 'key',
          type: 'string'
        },
        'value_exact': {
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
        'value_less': {
          name: 'value_less',
          type: 'any',
          default: <any>null
        },
        'value_more': {
          name: 'value_more',
          type: 'any',
          default: <any>null
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        'last_trigger': {
          name: 'last_trigger',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        'userId': {
          name: 'userId',
          type: 'number'
        },
        'organizationId': {
          name: 'organizationId',
          type: 'number'
        },
        'createdAt': {
          name: 'createdAt',
          type: 'Date'
        },
        'updatedAt': {
          name: 'updatedAt',
          type: 'Date'
        },
        'connectorId': {
          name: 'connectorId',
          type: 'number'
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
