/* tslint:disable */

declare var Object: any;
export interface ReceptionInterface {
  "id": string;
  "lat"?: number;
  "lng"?: number;
  "RSSI"?: number;
  "SNR"?: number;
}

export class Reception implements ReceptionInterface {
  "id": string = '';
  "lat": number = 0;
  "lng": number = 0;
  "RSSI": number = 0;
  "SNR": number = 0;
  constructor(data?: ReceptionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Reception`.
   */
  public static getModelName() {
    return "Reception";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Reception for dynamic purposes.
  **/
  public static factory(data: ReceptionInterface): Reception{
    return new Reception(data);
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
      name: 'Reception',
      plural: 'Receptions',
      path: 'Receptions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
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
        "RSSI": {
          name: 'RSSI',
          type: 'number'
        },
        "SNR": {
          name: 'SNR',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
