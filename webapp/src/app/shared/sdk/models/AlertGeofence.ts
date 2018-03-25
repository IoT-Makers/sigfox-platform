/* tslint:disable */

declare var Object: any;
export interface AlertGeofenceInterface {
  "location": Array<any>;
  "radius"?: number;
  "in": boolean;
  "id"?: number;
}

export class AlertGeofence implements AlertGeofenceInterface {
  "location": Array<any> = <any>[];
  "radius": number = 0;
  "in": boolean = true;
  "id": number = 0;
  constructor(data?: AlertGeofenceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AlertGeofence`.
   */
  public static getModelName() {
    return "AlertGeofence";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AlertGeofence for dynamic purposes.
  **/
  public static factory(data: AlertGeofenceInterface): AlertGeofence{
    return new AlertGeofence(data);
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
      name: 'AlertGeofence',
      plural: 'AlertGeofences',
      path: 'AlertGeofences',
      idName: 'id',
      properties: {
        "location": {
          name: 'location',
          type: 'Array&lt;any&gt;'
        },
        "radius": {
          name: 'radius',
          type: 'number'
        },
        "in": {
          name: 'in',
          type: 'boolean',
          default: true
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
