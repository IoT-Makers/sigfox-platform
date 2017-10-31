/* tslint:disable */
import {
  User,
  Message,
  Device,
  Category
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "id"?: string;
  "name": string;
  "ownerId": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Members?: User[];
  Messages?: Message[];
  Devices?: Device[];
  Categories?: Category[];
}

export class Organization implements OrganizationInterface {
  "id": string = '';
  "name": string = '';
  "ownerId": string = '';
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Members: User[] = null;
  Messages: Message[] = null;
  Devices: Device[] = null;
  Categories: Category[] = null;
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
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'string'
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
          model: 'User'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message'
        },
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device'
        },
        Categories: {
          name: 'Categories',
          type: 'Category[]',
          model: 'Category'
        },
      }
    }
  }
}
