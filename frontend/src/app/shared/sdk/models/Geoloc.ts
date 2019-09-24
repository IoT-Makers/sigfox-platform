/* tslint:disable */
import {
  Device,
  Message,
  User,
  Organization,
  Beacon,
  GeoPoint
} from '../index';

declare var Object: any;
export interface GeolocInterface {
  "id": string;
  "type": string;
  "location": GeoPoint;
  "level"?: number;
  "accuracy"?: number;
  "source"?: string;
  "createdAt"?: Date;
  "placeIds"?: Array<any>;
  "deviceId"?: string;
  "messageId"?: string;
  "updatedAt"?: Date;
  "userId"?: any;
  "beaconId"?: string;
  Device?: Device;
  Message?: Message;
  user?: User;
  Organizations?: Organization[];
  Beacon?: Beacon;
}

export class Geoloc implements GeolocInterface {
  "id": string = '';
  "type": string = '';
  "location": GeoPoint = <any>null;
  "level": number = 0;
  "accuracy": number = 0;
  "source": string = '';
  "createdAt": Date = new Date(0);
  "placeIds": Array<any> = <any>[];
  "deviceId": string = '';
  "messageId": string = '';
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  "beaconId": string = '';
  Device: Device = null;
  Message: Message = null;
  user: User = null;
  Organizations: Organization[] = null;
  Beacon: Beacon = null;
  constructor(data?: GeolocInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Geoloc`.
   */
  public static getModelName() {
    return "Geoloc";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Geoloc for dynamic purposes.
  **/
  public static factory(data: GeolocInterface): Geoloc{
    return new Geoloc(data);
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
      name: 'Geoloc',
      plural: 'Geolocs',
      path: 'Geolocs',
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
        "level": {
          name: 'level',
          type: 'number'
        },
        "accuracy": {
          name: 'accuracy',
          type: 'number',
          default: 0
        },
        "source": {
          name: 'source',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "placeIds": {
          name: 'placeIds',
          type: 'Array&lt;any&gt;'
        },
        "deviceId": {
          name: 'deviceId',
          type: 'string'
        },
        "messageId": {
          name: 'messageId',
          type: 'string'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "beaconId": {
          name: 'beaconId',
          type: 'string'
        },
      },
      relations: {
        Device: {
          name: 'Device',
          type: 'Device',
          model: 'Device',
          relationType: 'belongsTo',
                  keyFrom: 'deviceId',
          keyTo: 'id'
        },
        Message: {
          name: 'Message',
          type: 'Message',
          model: 'Message',
          relationType: 'belongsTo',
                  keyFrom: 'messageId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organizations: {
          name: 'Organizations',
          type: 'Organization[]',
          model: 'Organization',
          relationType: 'hasMany',
          modelThrough: 'OrganizationGeoloc',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'geolocId'
        },
        Beacon: {
          name: 'Beacon',
          type: 'Beacon',
          model: 'Beacon',
          relationType: 'belongsTo',
                  keyFrom: 'beaconId',
          keyTo: 'id'
        },
      }
    }
  }
}
