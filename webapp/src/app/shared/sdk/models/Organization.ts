/* tslint:disable */

declare var Object: any;
export interface OrganizationInterface {
  "id"?: string;
  "name": string;
  "ownerId": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Members?: any[];
  Messages?: any[];
  Devices?: any[];
  Categories?: any[];
}

export class Organization implements OrganizationInterface {
  "id": string = '';
  "name": string = '';
  "ownerId": string = '';
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Members: any[] = null;
  Messages: any[] = null;
  Devices: any[] = null;
  Categories: any[] = null;
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
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          modelThrough: 'Organizationuser',
          keyThrough: 'userId',
          keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Messages: {
          name: 'Messages',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Devices: {
          name: 'Devices',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
        Categories: {
          name: 'Categories',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
      }
    }
  }
}
