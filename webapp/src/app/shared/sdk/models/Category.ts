/* tslint:disable */
import {
  Device
} from '../index';

declare var Object: any;
export interface CategoryInterface {
  "name"?: string;
  "properties"?: any;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Devices?: Device[];
}

export class Category implements CategoryInterface {
  "name": string = '';
  "properties": any = <any>null;
  "id": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Devices: Device[] = null;
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
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "properties": {
          name: 'properties',
          type: 'any'
        },
        "id": {
          name: 'id',
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
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device'
        },
      }
    }
  }
}
