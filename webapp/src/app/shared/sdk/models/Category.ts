/* tslint:disable */

declare var Object: any;
export interface CategoryInterface {
  "name": string;
  "properties"?: Array<any>;
  "description"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  "organizationId"?: any;
  Devices?: any[];
  user?: any;
}

export class Category implements CategoryInterface {
  "name": string = '';
  "properties": Array<any> = <any>[];
  "description": string = '';
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  Devices: any[] = null;
  user: any = null;
  constructor(data?: CategoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Category`.
   */
  public static getModelName() {
    return "Category";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Category for dynamic purposes.
  **/
  public static factory(data: CategoryInterface): Category{
    return new Category(data);
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
      name: 'Category',
      plural: 'Categories',
      path: 'Categories',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "properties": {
          name: 'properties',
          type: 'Array&lt;any&gt;'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "id": {
          name: 'id',
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
        Devices: {
          name: 'Devices',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'categoryId'
        },
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
