/* tslint:disable */
import {
  Message,
  GeoPoint
} from '../index';

declare var Object: any;
export interface BaseStationInterface {
  "geolocation"?: GeoPoint;
  "id"?: number;
  "messageId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Message?: Message[];
}

export class BaseStation implements BaseStationInterface {
  "geolocation": GeoPoint = <any>null;
  "id": number = 0;
  "messageId": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Message: Message[] = null;
  constructor(data?: BaseStationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BaseStation`.
   */
  public static getModelName() {
    return "BaseStation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BaseStation for dynamic purposes.
  **/
  public static factory(data: BaseStationInterface): BaseStation{
    return new BaseStation(data);
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
      name: 'BaseStation',
      plural: 'BaseStations',
      path: 'BaseStations',
      properties: {
        "geolocation": {
          name: 'geolocation',
          type: 'GeoPoint'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "messageId": {
          name: 'messageId',
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
        Message: {
          name: 'Message',
          type: 'Message[]',
          model: 'Message'
        },
      }
    }
  }
}
