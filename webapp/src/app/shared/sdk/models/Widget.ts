/* tslint:disable */
import {
  User,
  Dashboard
} from '../index';

declare var Object: any;
export interface WidgetInterface {
  "name": string;
  "icon"?: string;
  "description"?: string;
  "type": string;
  "width": string;
  "filter"?: any;
  "options"?: any;
  "data"?: Array<any>;
  "id"?: number;
  "userId"?: number;
  "DashboardId"?: number;
  "dashboardId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: User;
  Dashboard?: Dashboard;
}

export class Widget implements WidgetInterface {
  "name": string = '';
  "icon": string = '';
  "description": string = '';
  "type": string = '';
  "width": string = '';
  "filter": any = <any>null;
  "options": any = <any>null;
  "data": Array<any> = <any>[];
  "id": number = 0;
  "userId": number = 0;
  "DashboardId": number = 0;
  "dashboardId": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  user: User = null;
  Dashboard: Dashboard = null;
  constructor(data?: WidgetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Widget`.
   */
  public static getModelName() {
    return "Widget";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Widget for dynamic purposes.
  **/
  public static factory(data: WidgetInterface): Widget{
    return new Widget(data);
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
      name: 'Widget',
      plural: 'Widgets',
      path: 'Widgets',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "width": {
          name: 'width',
          type: 'string'
        },
        "filter": {
          name: 'filter',
          type: 'any'
        },
        "options": {
          name: 'options',
          type: 'any'
        },
        "data": {
          name: 'data',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "DashboardId": {
          name: 'DashboardId',
          type: 'number'
        },
        "dashboardId": {
          name: 'dashboardId',
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
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Dashboard: {
          name: 'Dashboard',
          type: 'Dashboard',
          model: 'Dashboard',
          relationType: 'belongsTo',
                  keyFrom: 'DashboardId',
          keyTo: 'id'
        },
      }
    }
  }
}
