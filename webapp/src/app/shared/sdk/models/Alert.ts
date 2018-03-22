/* tslint:disable */

declare var Object: any;
export interface AlertInterface {
  "deviceId": string;
  "active"?: boolean;
  "one_shot"?: boolean;
  "last_trigger"?: Date;
  "key": string;
  "value"?: any;
  "geofence"?: Array<any>;
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

export class Alert implements AlertInterface {
  "deviceId": string = '';
  "active": boolean = true;
  "one_shot": boolean = false;
  "last_trigger": Date = new Date(0);
  "key": string = '';
  "value": any = <any>null;
  "geofence": Array<any> = <any>[];
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
        "value": {
          name: 'value',
          type: 'any'
        },
        "geofence": {
          name: 'geofence',
          type: 'Array&lt;any&gt;'
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
