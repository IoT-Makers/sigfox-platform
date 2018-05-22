/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface ConnectorInterface {
  "type": string;
  "name": string;
  "description"?: string;
  "login"?: string;
  "host"?: string;
  "port"?: number;
  "topic"?: string;
  "recipient"?: string;
  "url"?: string;
  "method"?: string;
  "id"?: any;
  "userId"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: User;
}

export class Connector implements ConnectorInterface {
  "type": string = '';
  "name": string = '';
  "description": string = '';
  "login": string = '';
  "host": string = '';
  "port": number = 0;
  "topic": string = '';
  "recipient": string = '';
  "url": string = '';
  "method": string = '';
  "id": any = <any>null;
  "userId": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  user: User = null;
  constructor(data?: ConnectorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Connector`.
   */
  public static getModelName() {
    return "Connector";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Connector for dynamic purposes.
  **/
  public static factory(data: ConnectorInterface): Connector{
    return new Connector(data);
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
      name: 'Connector',
      plural: 'Connectors',
      path: 'Connectors',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "login": {
          name: 'login',
          type: 'string'
        },
        "host": {
          name: 'host',
          type: 'string'
        },
        "port": {
          name: 'port',
          type: 'number'
        },
        "topic": {
          name: 'topic',
          type: 'string'
        },
        "recipient": {
          name: 'recipient',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "method": {
          name: 'method',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
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
