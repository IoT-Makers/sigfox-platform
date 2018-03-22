/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface AlertGeofenceInterface {
  "location": GeoPoint;
  "radius": number;
  "in": boolean;
  "id"?: number;
}

export class AlertGeofence implements AlertGeofenceInterface {
  "location": GeoPoint = <any>null;
  "radius": number = 1000;
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
          type: 'GeoPoint'
        },
        "radius": {
          name: 'radius',
          type: 'number',
          default: 1000
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
