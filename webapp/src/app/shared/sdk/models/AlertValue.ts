/* tslint:disable */

declare var Object: any;
export interface AlertValueInterface {
  "exact"?: any;
  "min"?: any;
  "max"?: any;
  "less"?: any;
  "more"?: any;
  "id"?: number;
}

export class AlertValue implements AlertValueInterface {
  "exact": any = <any>null;
  "min": any = <any>null;
  "max": any = <any>null;
  "less": any = <any>null;
  "more": any = <any>null;
  "id": number = 0;
  constructor(data?: AlertValueInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AlertValue`.
   */
  public static getModelName() {
    return "AlertValue";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AlertValue for dynamic purposes.
  **/
  public static factory(data: AlertValueInterface): AlertValue{
    return new AlertValue(data);
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
      name: 'AlertValue',
      plural: 'AlertValues',
      path: 'AlertValues',
      idName: 'id',
      properties: {
        "exact": {
          name: 'exact',
          type: 'any',
          default: <any>null
        },
        "min": {
          name: 'min',
          type: 'any',
          default: <any>null
        },
        "max": {
          name: 'max',
          type: 'any',
          default: <any>null
        },
        "less": {
          name: 'less',
          type: 'any',
          default: <any>null
        },
        "more": {
          name: 'more',
          type: 'any',
          default: <any>null
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
