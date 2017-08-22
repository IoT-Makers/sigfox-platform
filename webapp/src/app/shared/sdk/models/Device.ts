/* tslint:disable */
import {
  Category,
  Message,
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
  "categoryId"?: number;
  "CategoryId"?: number;
  Category?: Category;
  Messages?: Message[];
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
  "categoryId": number = 0;
  "CategoryId": number = 0;
  Category: Category = null;
  Messages: Message[] = null;
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
        "categoryId": {
          name: 'categoryId',
          type: 'number'
        },
        "CategoryId": {
          name: 'CategoryId',
          type: 'number'
        },
      },
      relations: {
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
      }
    }
  }
}
