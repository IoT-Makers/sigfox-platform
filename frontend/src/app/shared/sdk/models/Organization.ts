/* tslint:disable */
import {
  User,
  Message,
  Device,
  Category,
  Dashboard
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "name": string;
  "logo"?: string;
  "id"?: any;
  "userId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Members?: User[];
  user?: User;
  Messages?: Message[];
  Devices?: Device[];
  Categories?: Category[];
  Dashboards?: Dashboard[];
}

export class Organization implements OrganizationInterface {
  "name": string = 'My organization';
  "logo": string = 'https://www.shareicon.net/data/128x128/2017/06/21/887415_group_512x512.png';
  "id": any = <any>null;
  "userId": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Members: User[] = null;
  user: User = null;
  Messages: Message[] = null;
  Devices: Device[] = null;
  Categories: Category[] = null;
  Dashboards: Dashboard[] = null;
  constructor(data?: OrganizationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Organization`.
   */
  public static getModelName() {
    return "Organization";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Organization for dynamic purposes.
  **/
  public static factory(data: OrganizationInterface): Organization{
    return new Organization(data);
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
      name: 'Organization',
      plural: 'Organizations',
      path: 'Organizations',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          default: 'My organization'
        },
        "logo": {
          name: 'logo',
          type: 'string',
          default: 'https://www.shareicon.net/data/128x128/2017/06/21/887415_group_512x512.png'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
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
      },
      relations: {
        Members: {
          name: 'Members',
          type: 'User[]',
          model: 'User',
          relationType: 'hasMany',
          modelThrough: 'Organizationuser',
          keyThrough: 'userId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
          modelThrough: 'OrganizationMessage',
          keyThrough: 'messageId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device',
          relationType: 'hasMany',
          modelThrough: 'OrganizationDevice',
          keyThrough: 'deviceId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Categories: {
          name: 'Categories',
          type: 'Category[]',
          model: 'Category',
          relationType: 'hasMany',
          modelThrough: 'OrganizationCategory',
          keyThrough: 'categoryId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Dashboards: {
          name: 'Dashboards',
          type: 'Dashboard[]',
          model: 'Dashboard',
          relationType: 'hasMany',
          modelThrough: 'OrganizationDashboard',
          keyThrough: 'dashboardId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
      }
    }
  }
}
