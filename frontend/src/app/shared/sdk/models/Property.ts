/* tslint:disable */

declare var Object: any;
export interface PropertyInterface {
  "key": string;
  "value"?: any;
  "type": string;
  "unit"?: string;
  "id"?: number;
}

export class Property implements PropertyInterface {
  "key": string = '';
  "value": any = <any>null;
  "type": string = '';
  "unit": string = '';
  "id": number = 0;
  constructor(data?: PropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Property`.
   */
  public static getModelName() {
    return "Property";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Property for dynamic purposes.
  **/
  public static factory(data: PropertyInterface): Property{
    return new Property(data);
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
      name: 'Property',
      plural: 'Properties',
      path: 'Properties',
      idName: 'id',
      properties: {
        "key": {
          name: 'key',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'any'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "unit": {
          name: 'unit',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
