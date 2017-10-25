/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "id"?: string;
  "name": string;
  "ownerId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  users?: User[];
  Owner?: User;
}

export class Organization implements OrganizationInterface {
  "id": string = '';
  "name": string = '';
  "ownerId": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  users: User[] = null;
  Owner: User = null;
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
          type: 'number'
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
        users: {
          name: 'users',
          type: 'User[]',
          model: 'User'
        },
        Owner: {
          name: 'Owner',
          type: 'User',
          model: 'User'
        },
      }
    }
  }
}
