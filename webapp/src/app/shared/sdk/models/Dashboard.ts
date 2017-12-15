/* tslint:disable */

declare var Object: any;
export interface DashboardInterface {
  "name": string;
  "description"?: string;
  "icon"?: string;
  "options"?: any;
  "widgets"?: Array<any>;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: number;
}

export class Dashboard implements DashboardInterface {
  "name": string = '';
  "description": string = '';
  "icon": string = '';
  "options": any = <any>null;
  "widgets": Array<any> = <any>[];
  "id": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": number = 0;
  constructor(data?: DashboardInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Dashboard`.
   */
  public static getModelName() {
    return "Dashboard";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Dashboard for dynamic purposes.
  **/
  public static factory(data: DashboardInterface): Dashboard{
    return new Dashboard(data);
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
      name: 'Dashboard',
      plural: 'Dashboards',
      path: 'Dashboards',
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
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "options": {
          name: 'options',
          type: 'any'
        },
        "widgets": {
          name: 'widgets',
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
        "userId": {
          name: 'userId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
