/* tslint:disable */
import {
  User,
  GeoPoint
} from '../index';

declare var Object: any;
export interface BeaconInterface {
  "id": string;
  "type": string;
  "level": number;
  "location": GeoPoint;
  "userId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: User;
}

export class Beacon implements BeaconInterface {
  "id": string = '';
  "type": string = '';
  "level": number = 0;
  "location": GeoPoint = <any>null;
  "userId": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  user: User = null;
  constructor(data?: BeaconInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Beacon`.
   */
  public static getModelName() {
    return "Beacon";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Beacon for dynamic purposes.
  **/
  public static factory(data: BeaconInterface): Beacon{
    return new Beacon(data);
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
      name: 'Beacon',
      plural: 'Beacons',
      path: 'Beacons',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "level": {
          name: 'level',
          type: 'number',
          default: 0
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "userId": {
          name: 'userId',
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
      },
      relations: {
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
