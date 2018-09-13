/* tslint:disable */
import {
  AccessToken,
  Role,
  Dashboard,
  Category,
  Device,
  Message,
  Geoloc,
  Parser,
  Organization,
  Alert,
  Connector,
  Widget,
  Beacon
} from '../index';

declare var Object: any;
export interface UserInterface {
  "avatar"?: string;
  "loggedAt"?: Date;
  "connected"?: boolean;
  "position"?: any;
  "devAccessTokens"?: Array<any>;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "password"?: string;
  accessTokens?: AccessToken[];
  roles?: Role[];
  Dashboards?: Dashboard[];
  Categories?: Category[];
  Devices?: Device[];
  Messages?: Message[];
  Geolocs?: Geoloc[];
  Parsers?: Parser[];
  Organizations?: Organization[];
  Alerts?: Alert[];
  Connectors?: Connector[];
  Widgets?: Widget[];
  Beacons?: Beacon[];
}

export class User implements UserInterface {
  "avatar": string = 'https://www.shareicon.net/data/128x128/2016/08/04/806683_man_512x512.png';
  "loggedAt": Date = new Date(0);
  "connected": boolean = false;
  "position": any = <any>null;
  "devAccessTokens": Array<any> = <any>[];
  "realm": string = '';
  "username": string = '';
  "email": string = '';
  "emailVerified": boolean = false;
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "password": string = '';
  accessTokens: AccessToken[] = null;
  roles: Role[] = null;
  Dashboards: Dashboard[] = null;
  Categories: Category[] = null;
  Devices: Device[] = null;
  Messages: Message[] = null;
  Geolocs: Geoloc[] = null;
  Parsers: Parser[] = null;
  Organizations: Organization[] = null;
  Alerts: Alert[] = null;
  Connectors: Connector[] = null;
  Widgets: Widget[] = null;
  Beacons: Beacon[] = null;
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
      idName: 'id',
      properties: {
        "avatar": {
          name: 'avatar',
          type: 'string',
          default: 'https://www.shareicon.net/data/128x128/2016/08/04/806683_man_512x512.png'
        },
        "loggedAt": {
          name: 'loggedAt',
          type: 'Date'
        },
        "connected": {
          name: 'connected',
          type: 'boolean'
        },
        "position": {
          name: 'position',
          type: 'any'
        },
        "devAccessTokens": {
          name: 'devAccessTokens',
          type: 'Array&lt;any&gt;'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'AccessToken[]',
          model: 'AccessToken',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role',
          relationType: 'hasMany',
          modelThrough: 'RoleMapping',
          keyThrough: 'roleId',
          keyFrom: 'id',
          keyTo: 'principalId'
        },
        Dashboards: {
          name: 'Dashboards',
          type: 'Dashboard[]',
          model: 'Dashboard',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Categories: {
          name: 'Categories',
          type: 'Category[]',
          model: 'Category',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Messages: {
          name: 'Messages',
          type: 'Message[]',
          model: 'Message',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Geolocs: {
          name: 'Geolocs',
          type: 'Geoloc[]',
          model: 'Geoloc',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Parsers: {
          name: 'Parsers',
          type: 'Parser[]',
          model: 'Parser',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Organizations: {
          name: 'Organizations',
          type: 'Organization[]',
          model: 'Organization',
          relationType: 'hasMany',
          modelThrough: 'Organizationuser',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'userId'
        },
        Alerts: {
          name: 'Alerts',
          type: 'Alert[]',
          model: 'Alert',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Connectors: {
          name: 'Connectors',
          type: 'Connector[]',
          model: 'Connector',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Widgets: {
          name: 'Widgets',
          type: 'Widget[]',
          model: 'Widget',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        Beacons: {
          name: 'Beacons',
          type: 'Beacon[]',
          model: 'Beacon',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
