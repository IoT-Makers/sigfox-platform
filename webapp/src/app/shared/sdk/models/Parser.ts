/* tslint:disable */
import {
  Device,
  Organization
} from '../index';

declare var Object: any;
export interface ParserInterface {
  "name": string;
  "description"?: string;
  "function"?: string;
  "available_properties"?: Array<any>;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "OrganizationId"?: string;
  Devices?: Device[];
  Organization?: Organization;
}

export class Parser implements ParserInterface {
  "name": string = '';
  "description": string = '';
  "function": string = '';
  "available_properties": Array<any> = <any>[];
  "id": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "OrganizationId": string = '';
  Devices: Device[] = null;
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
        "available_properties": {
          name: 'available_properties',
          type: 'Array&lt;any&gt;'
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
        "OrganizationId": {
          name: 'OrganizationId',
          type: 'string'
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
        Organization: {
          name: 'Organization',
          type: 'Organization',
          model: 'Organization',
          relationType: 'belongsTo',
                  keyFrom: 'OrganizationId',
          keyTo: 'id'
        },
      }
    }
  }
}
