/* tslint:disable */

declare var Object: any;
export interface AssetInterface {
  "name"?: string;
  "filename"?: string;
  "type"?: string;
  "size"?: number;
  "url"?: string;
  "id"?: any;
}

export class Asset implements AssetInterface {
  "name": string = '';
  "filename": string = '';
  "type": string = '';
  "size": number = 0;
  "url": string = '';
  "id": any = <any>null;
  constructor(data?: AssetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Asset`.
   */
  public static getModelName() {
    return "Asset";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Asset for dynamic purposes.
  **/
  public static factory(data: AssetInterface): Asset{
    return new Asset(data);
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
      name: 'Asset',
      plural: 'Assets',
      path: 'Assets',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "filename": {
          name: 'filename',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "size": {
          name: 'size',
          type: 'number'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
