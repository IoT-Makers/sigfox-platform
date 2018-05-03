/* tslint:disable */

declare var Object: any;
export interface AppSettingInterface {
  "key": string;
  "value": any;
  "type": string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class AppSetting implements AppSettingInterface {
  "key": string = '';
  "value": any = <any>null;
  "type": string = '';
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  constructor(data?: AppSettingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AppSetting`.
   */
  public static getModelName() {
    return "AppSetting";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AppSetting for dynamic purposes.
  **/
  public static factory(data: AppSettingInterface): AppSetting{
    return new AppSetting(data);
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
      name: 'AppSetting',
      plural: 'AppSettings',
      path: 'AppSettings',
      idName: 'id',
      properties: {
        "key": {
          name: 'key',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'any'
        },
        "type": {
          name: 'type',
          type: 'string'
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
      },
      relations: {
      }
    }
  }
}
