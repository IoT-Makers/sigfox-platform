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
  "id"?: any;
  "userId"?: any;
  "dashboardId"?: any;
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
  "id": any = <any>null;
  "userId": any = <any>null;
  "dashboardId": any = <any>null;
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
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "dashboardId": {
          name: 'dashboardId',
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
        Dashboard: {
          name: 'Dashboard',
          type: 'Dashboard',
          model: 'Dashboard',
          relationType: 'belongsTo',
                  keyFrom: 'dashboardId',
          keyTo: 'id'
        },
      }
    }
  }
}
