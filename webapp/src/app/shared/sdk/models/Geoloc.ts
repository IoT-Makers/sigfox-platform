/* tslint:disable */
import {
  Device,
  Message,
  User,
  Organization,
  GeoPoint
} from '../index';

declare var Object: any;
export interface GeolocInterface {
  "type": string;
  "location": GeoPoint;
  "level"?: number;
  "accuracy"?: number;
  "createdAt"?: Date;
  "id"?: any;
  "deviceId"?: string;
  "messageId"?: any;
  "updatedAt"?: Date;
  "userId"?: any;
  "organizationId"?: any;
  Device?: Device;
  Message?: Message;
  user?: User;
  Organization?: Organization;
}

export class Geoloc implements GeolocInterface {
  "type": string = '';
  "location": GeoPoint = <any>null;
  "level": number = 0;
  "accuracy": number = 0;
  "createdAt": Date = new Date(0);
  "id": any = <any>null;
  "deviceId": string = '';
  "messageId": any = <any>null;
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  Device: Device = null;
  Message: Message = null;
  user: User = null;
  Organization: Organization = null;
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
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "deviceId": {
          name: 'deviceId',
          type: 'string'
        },
        "messageId": {
          name: 'messageId',
          type: 'any'
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
        Organization: {
          name: 'Organization',
          type: 'Organization',
          model: 'Organization',
          relationType: 'belongsTo',
                  keyFrom: 'organizationId',
          keyTo: 'id'
        },
      }
    }
  }
}
