/* tslint:disable */
import {
  Device,
  User,
  Organization
} from '../index';

declare var Object: any;
export interface ParserInterface {
  "name": string;
  "description"?: string;
  "function"?: string;
  "properties"?: Array<any>;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  "organizationId"?: any;
  Devices?: Device[];
  user?: User;
  Organization?: Organization;
}

export class Parser implements ParserInterface {
  "name": string = '';
  "description": string = '';
  "function": string = '';
  "properties": Array<any> = <any>[];
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  Devices: Device[] = null;
  user: User = null;
  Organization: Organization = null;
  constructor(data?: ParserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Parser`.
   */
  public static getModelName() {
    return "Parser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Parser for dynamic purposes.
  **/
  public static factory(data: ParserInterface): Parser{
    return new Parser(data);
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
      name: 'Parser',
      plural: 'Parsers',
      path: 'Parsers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "function": {
          name: 'function',
          type: 'string'
        },
        "properties": {
          name: 'properties',
          type: 'Array&lt;any&gt;'
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
        Devices: {
          name: 'Devices',
          type: 'Device[]',
          model: 'Device',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'parserId'
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
