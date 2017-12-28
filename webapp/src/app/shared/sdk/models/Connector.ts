/* tslint:disable */

declare var Object: any;
export interface ConnectorInterface {
  "name": string;
  "description"?: string;
  "login": any;
  "id"?: number;
  "userId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: any;
}

export class Connector implements ConnectorInterface {
  "name": string = '';
  "description": string = '';
  "login": any = <any>null;
  "id": number = 0;
  "userId": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  user: any = null;
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
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
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
      },
      relations: {
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
