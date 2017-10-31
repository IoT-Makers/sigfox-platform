/* tslint:disable */
import {
  Parser,
  Category,
  Message,
  User,
  Organization,
  GeoPoint
} from '../index';

declare var Object: any;
export interface DeviceInterface {
  "id": string;
  "creation"?: Date;
  "name"?: string;
  "dl_payload"?: string;
  "last_known_location"?: GeoPoint;
  "properties"?: Array<any>;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "parserId"?: number;
  "ParserId"?: number;
  "categoryId"?: number;
  "CategoryId"?: number;
  "userId"?: number;
  "organizationId"?: string;
  "OrganizationId"?: string;
  Parser?: Parser;
  Category?: Category;
  Messages?: Message[];
  user?: User;
  Organization?: Organization;
}

export class Device implements DeviceInterface {
  "id": string = '';
  "creation": Date = new Date(0);
  "name": string = '';
  "dl_payload": string = '';
  "last_known_location": GeoPoint = <any>null;
  "properties": Array<any> = <any>[];
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "parserId": number = 0;
  "ParserId": number = 0;
  "categoryId": number = 0;
  "CategoryId": number = 0;
  "userId": number = 0;
  "organizationId": string = '';
  "OrganizationId": string = '';
  Parser: Parser = null;
  Category: Category = null;
  Messages: Message[] = null;
  user: User = null;
  Organization: Organization = null;
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
        "dl_payload": {
          name: 'dl_payload',
          type: 'string'
        },
        "last_known_location": {
          name: 'last_known_location',
          type: 'GeoPoint'
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
          type: 'string'
        },
        "OrganizationId": {
          name: 'OrganizationId',
          type: 'string'
        },
      },
      relations: {
        Parser: {
          name: 'Parser',
          type: 'Parser',
          model: 'Parser'
        },
        Category: {
          name: 'Category',
          type: 'Category',
          model: 'Category'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User'
        },
        Organization: {
          name: 'Organization',
          type: 'Organization',
          model: 'Organization'
        },
      }
    }
  }
}
