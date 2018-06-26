/* tslint:disable */
import {
  User,
  GeoPoint
} from '../index';

declare var Object: any;
export interface BeaconInterface {
  "id": string;
  "type": string;
  "location": GeoPoint;
  "createdAt"?: Date;
  "userId"?: any;
  "updatedAt"?: Date;
  user?: User;
}

export class Beacon implements BeaconInterface {
  "id": string = '';
  "type": string = '';
  "location": GeoPoint = <any>null;
  "createdAt": Date = new Date(0);
  "userId": any = <any>null;
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
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'any'
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
