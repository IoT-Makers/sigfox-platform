/* tslint:disable */

declare var Object: any;
export interface AlexaInterface {
  "id"?: number;
}

export class Alexa implements AlexaInterface {
  "id": number = 0;
  constructor(data?: AlexaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alexa`.
   */
  public static getModelName() {
    return "Alexa";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alexa for dynamic purposes.
  **/
  public static factory(data: AlexaInterface): Alexa{
    return new Alexa(data);
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
      name: 'Alexa',
      plural: 'Alexa',
      path: 'Alexa',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
