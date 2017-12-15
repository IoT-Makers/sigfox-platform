/* tslint:disable */

declare var Object: any;
export interface AlertInterface {
  "name": string;
  "type": string;
  "key": string;
  "value_min"?: number;
  "value_max"?: number;
  "message"?: string;
  "id"?: number;
}

export class Alert implements AlertInterface {
  "name": string = '';
  "type": string = '';
  "key": string = '';
  "value_min": number = 0;
  "value_max": number = 0;
  "message": string = '';
  "id": number = 0;
  constructor(data?: AlertInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alert`.
   */
  public static getModelName() {
    return "Alert";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alert for dynamic purposes.
  **/
  public static factory(data: AlertInterface): Alert{
    return new Alert(data);
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
      name: 'Alert',
      plural: 'Alerts',
      path: 'Alerts',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "key": {
          name: 'key',
          type: 'string'
        },
        "value_min": {
          name: 'value_min',
          type: 'number'
        },
        "value_max": {
          name: 'value_max',
          type: 'number'
        },
        "message": {
          name: 'message',
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
