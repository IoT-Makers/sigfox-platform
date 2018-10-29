/* tslint:disable */
import {
  Device,
  User,
  Organization,
  Connector
} from '../index';

declare var Object: any;
export interface AlertHistoryInterface {
  "id"?: any;
  "deviceId"?: string;
  "userId"?: any;
  "organizationId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "connectorId"?: any;
  Device?: Device;
  user?: User;
  Organization?: Organization;
  Connector?: Connector;
}

export class AlertHistory implements AlertHistoryInterface {
  "id": any = <any>null;
  "deviceId": string = '';
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "connectorId": any = <any>null;
  Device: Device = null;
  user: User = null;
  Organization: Organization = null;
  Connector: Connector = null;
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
      plural: 'AlertHistories',
      path: 'AlertHistories',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "deviceId": {
          name: 'deviceId',
          type: 'string'
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
          type: 'Device',
          model: 'Device',
          relationType: 'belongsTo',
                  keyFrom: 'deviceId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organization: {
          name: 'Organization',
          type: 'Organization',
          model: 'Organization',
          relationType: 'belongsTo',
                  keyFrom: 'organizationId',
          keyTo: 'id'
        },
        Connector: {
          name: 'Connector',
          type: 'Connector',
          model: 'Connector',
          relationType: 'belongsTo',
                  keyFrom: 'connectorId',
          keyTo: 'id'
        },
      }
    }
  }
}
