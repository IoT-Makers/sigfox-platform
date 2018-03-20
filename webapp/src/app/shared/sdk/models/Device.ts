/* tslint:disable */

declare var Object: any;
export interface DeviceInterface {
  "id": string;
  "name"?: string;
  "successRate"?: number;
  "data_downlink"?: string;
  "properties"?: Array<any>;
  "lastLocatedAt"?: Date;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "parserId"?: any;
  "categoryId"?: any;
  "userId"?: any;
  Parser?: any;
  Category?: any;
  Messages?: any[];
  Geolocs?: any[];
  user?: any;
  Organizations?: any[];
  Alerts?: any[];
}

export class Device implements DeviceInterface {
  "id": string = '';
  "name": string = '';
  "successRate": number = 0;
  "data_downlink": string = '';
  "properties": Array<any> = <any>[];
  "lastLocatedAt": Date = new Date(0);
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "parserId": any = <any>null;
  "categoryId": any = <any>null;
  "userId": any = <any>null;
  Parser: any = null;
  Category: any = null;
  Messages: any[] = null;
  Geolocs: any[] = null;
  user: any = null;
  Organizations: any[] = null;
  Alerts: any[] = null;
  constructor(data?: DeviceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Device`.
   */
  public static getModelName() {
    return "Device";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Device for dynamic purposes.
  **/
  public static factory(data: DeviceInterface): Device{
    return new Device(data);
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
      name: 'Device',
      plural: 'Devices',
      path: 'Devices',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "successRate": {
          name: 'successRate',
          type: 'number'
        },
        "data_downlink": {
          name: 'data_downlink',
          type: 'string'
        },
        "properties": {
          name: 'properties',
          type: 'Array&lt;any&gt;'
        },
        "lastLocatedAt": {
          name: 'lastLocatedAt',
          type: 'Date'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "parserId": {
          name: 'parserId',
          type: 'any'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
      },
      relations: {
        Parser: {
          name: 'Parser',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'parserId',
          keyTo: 'id'
        },
        Category: {
          name: 'Category',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'categoryId',
          keyTo: 'id'
        },
        Messages: {
          name: 'Messages',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
        Geolocs: {
          name: 'Geolocs',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organizations: {
          name: 'Organizations',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          modelThrough: 'OrganizationDevice',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'deviceId'
        },
        Alerts: {
          name: 'Alerts',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
      }
    }
  }
}
