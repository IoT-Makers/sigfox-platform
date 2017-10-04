/* tslint:disable */
import {
  AccessToken,
  Message,
  Device
} from '../index';

declare var Object: any;
export interface UserInterface {
  "avatar"?: string;
  "lastLogin"?: Date;
  "location"?: any;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "password"?: string;
  accessTokens?: AccessToken[];
  Messages?: Message[];
  Devices?: Device[];
}

export class User implements UserInterface {
  "avatar": string = '';
  "lastLogin": Date = new Date(0);
  "location": any = <any>null;
  "realm": string = '';
  "username": string = '';
  "email": string = '';
  "emailVerified": boolean = false;
  "id": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "password": string = '';
  accessTokens: AccessToken[] = null;
  Messages: Message[] = null;
  Devices: Device[] = null;
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      plural: 'users',
      path: 'users',
      properties: {
        "avatar": {
          name: 'avatar',
          type: 'string'
        },
        "lastLogin": {
          name: 'lastLogin',
          type: 'Date'
        },
        "location": {
          name: 'location',
          type: 'any'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'AccessToken[]',
          model: 'AccessToken'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message'
        },
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device'
        },
      }
    }
  }
}
