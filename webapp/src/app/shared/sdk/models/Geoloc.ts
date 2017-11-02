/* tslint:disable */

declare var Object: any;
export interface GeolocInterface {
  "type": string;
  "lat": number;
  "lng": number;
  "precision"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Geoloc implements GeolocInterface {
  "type": string = '';
  "lat": number = 0;
  "lng": number = 0;
  "precision": number = 0;
  "id": number = 0;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  constructor(data?: GeolocInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Geoloc`.
   */
  public static getModelName() {
    return "Geoloc";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Geoloc for dynamic purposes.
  **/
  public static factory(data: GeolocInterface): Geoloc{
    return new Geoloc(data);
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
      name: 'Geoloc',
      plural: 'Geolocs',
      path: 'Geolocs',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "lat": {
          name: 'lat',
          type: 'number'
        },
        "lng": {
          name: 'lng',
          type: 'number'
        },
        "precision": {
          name: 'precision',
          type: 'number'
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
      },
      relations: {
      }
    }
  }
}
