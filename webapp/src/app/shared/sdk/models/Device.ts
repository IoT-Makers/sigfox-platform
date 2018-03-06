/* tslint:disable */

declare var Object: any;
export interface DeviceInterface {
  "id": string;
  "creation"?: Date;
  "name"?: string;
  "data_parsed"?: Array<any>;
  "downlinkData"?: string;
  "location"?: Array<any>;
  "properties"?: Array<any>;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "parserId"?: any;
  "categoryId"?: any;
  "userId"?: any;
  "organizationId"?: any;
  Parser?: any;
  Category?: any;
  Messages?: any[];
  user?: any;
  Organizations?: any[];
  Alerts?: any[];
}

export class Device implements DeviceInterface {
  "id": string = '';
  "creation": Date = new Date(0);
  "name": string = '';
  "data_parsed": Array<any> = <any>[];
  "downlinkData": string = '';
  "location": Array<any> = <any>[];
  "properties": Array<any> = <any>[];
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "parserId": any = <any>null;
  "categoryId": any = <any>null;
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  Parser: any = null;
  Category: any = null;
  Messages: any[] = null;
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
        "creation": {
          name: 'creation',
          type: 'Date'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "data_parsed": {
          name: 'data_parsed',
          type: 'Array&lt;any&gt;'
        },
        "downlinkData": {
          name: 'downlinkData',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'Array&lt;any&gt;'
        },
        "properties": {
          name: 'properties',
          type: 'Array&lt;any&gt;'
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
        "organizationId": {
          name: 'organizationId',
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
          modelThrough: 'DeviceOrganization',
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
