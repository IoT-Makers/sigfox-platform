/* tslint:disable */
import {
  Parser,
  Category,
  Message,
  Geoloc,
  User,
  Organization,
  Alert
} from '../index';

declare var Object: any;
export interface DeviceInterface {
  "id": string;
  "pek"?: string;
  "name"?: string;
  "successRate"?: number;
  "data_downlink"?: string;
  "properties"?: Array<any>;
  "locatedAt"?: Date;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "parserId"?: any;
  "categoryId"?: any;
  "userId"?: any;
  Parser?: Parser;
  Category?: Category;
  Messages?: Message[];
  Geolocs?: Geoloc[];
  user?: User;
  Organizations?: Organization[];
  Alerts?: Alert[];
}

export class Device implements DeviceInterface {
  "id": string = '';
  "pek": string = '';
  "name": string = '';
  "successRate": number = 0;
  "data_downlink": string = '';
  "properties": Array<any> = <any>[];
  "locatedAt": Date = new Date(0);
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "parserId": any = <any>null;
  "categoryId": any = <any>null;
  "userId": any = <any>null;
  Parser: Parser = null;
  Category: Category = null;
  Messages: Message[] = null;
  Geolocs: Geoloc[] = null;
  user: User = null;
  Organizations: Organization[] = null;
  Alerts: Alert[] = null;
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
        "pek": {
          name: 'pek',
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
        "locatedAt": {
          name: 'locatedAt',
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
          type: 'Parser',
          model: 'Parser',
          relationType: 'belongsTo',
                  keyFrom: 'parserId',
          keyTo: 'id'
        },
        Category: {
          name: 'Category',
          type: 'Category',
          model: 'Category',
          relationType: 'belongsTo',
                  keyFrom: 'categoryId',
          keyTo: 'id'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
        Geolocs: {
          name: 'Geolocs',
          type: 'Geoloc[]',
          model: 'Geoloc',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organizations: {
          name: 'Organizations',
          type: 'Organization[]',
          model: 'Organization',
          relationType: 'hasMany',
          modelThrough: 'OrganizationDevice',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'deviceId'
        },
        Alerts: {
          name: 'Alerts',
          type: 'Alert[]',
          model: 'Alert',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'deviceId'
        },
      }
    }
  }
}
