/* tslint:disable */
import {
  User,
  Organization,
  Widget
} from '../index';

declare var Object: any;
export interface DashboardInterface {
  "name": string;
  "description"?: string;
  "icon"?: string;
  "options"?: any;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  user?: User;
  Organizations?: Organization[];
  Widgets?: Widget[];
}

export class Dashboard implements DashboardInterface {
  "name": string = '';
  "description": string = '';
  "icon": string = '';
  "options": any = <any>null;
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  user: User = null;
  Organizations: Organization[] = null;
  Widgets: Widget[] = null;
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
        Organizations: {
          name: 'Organizations',
          type: 'Organization[]',
          model: 'Organization',
          relationType: 'hasMany',
          modelThrough: 'OrganizationDashboard',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'dashboardId'
        },
        Widgets: {
          name: 'Widgets',
          type: 'Widget[]',
          model: 'Widget',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'dashboardId'
        },
      }
    }
  }
}
