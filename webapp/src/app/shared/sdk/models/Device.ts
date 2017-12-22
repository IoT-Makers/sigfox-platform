/* tslint:disable */

declare var Object: any;
export interface DeviceInterface {
  "id": string;
  "creation"?: Date;
  "name"?: string;
  "data_parsed"?: Array<any>;
  "downlinkData"?: string;
  "location"?: Array<any>;
  "alerts"?: Array<any>;
  "properties"?: Array<any>;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "parserId"?: number;
  "ParserId"?: number;
  "categoryId"?: number;
  "CategoryId"?: number;
  "userId"?: number;
  "organizationId"?: number;
  "OrganizationId"?: number;
  Parser?: any;
  Category?: any;
  Messages?: any[];
  user?: any;
  Organization?: any;
}

export class Device implements DeviceInterface {
  "id": string = '';
  "creation": Date = new Date(0);
  "name": string = '';
  "data_parsed": Array<any> = <any>[];
  "downlinkData": string = '';
  "location": Array<any> = <any>[];
  "alerts": Array<any> = <any>[];
  "properties": Array<any> = <any>[];
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "parserId": number = 0;
  "ParserId": number = 0;
  "categoryId": number = 0;
  "CategoryId": number = 0;
  "userId": number = 0;
  "organizationId": number = 0;
  "OrganizationId": number = 0;
  Parser: any = null;
  Category: any = null;
  Messages: any[] = null;
  user: any = null;
  Organization: any = null;
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
        "alerts": {
          name: 'alerts',
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
          type: 'number'
        },
        "ParserId": {
          name: 'ParserId',
          type: 'number'
        },
        "categoryId": {
          name: 'categoryId',
          type: 'number'
        },
        "CategoryId": {
          name: 'CategoryId',
          type: 'number'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "organizationId": {
          name: 'organizationId',
          type: 'number'
        },
        "OrganizationId": {
          name: 'OrganizationId',
          type: 'number'
        },
      },
      relations: {
        Parser: {
          name: 'Parser',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'ParserId',
          keyTo: 'id'
        },
        Category: {
          name: 'Category',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'CategoryId',
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
        Organization: {
          name: 'Organization',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'OrganizationId',
          keyTo: 'id'
        },
      }
    }
  }
}
