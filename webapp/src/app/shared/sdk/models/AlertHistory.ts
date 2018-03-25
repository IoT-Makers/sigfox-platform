/* tslint:disable */

declare var Object: any;
export interface AlertHistoryInterface {
  "id"?: any;
  "deviceId"?: string;
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
  "id": any = <any>null;
  "deviceId": string = '';
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
