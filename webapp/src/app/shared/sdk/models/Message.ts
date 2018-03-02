/* tslint:disable */

declare var Object: any;
export interface MessageInterface {
  "deviceId": string;
  "time": number;
  "seqNumber": number;
  "data"?: string;
  "data_parsed"?: Array<any>;
  "downlinkData"?: string;
  "ack"?: boolean;
  "reception"?: Array<any>;
  "geoloc"?: Array<any>;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  "organizationId"?: any;
  Device?: any;
  user?: any;
  Organization?: any;
}

export class Message implements MessageInterface {
  "deviceId": string = '';
  "time": number = 0;
  "seqNumber": number = 0;
  "data": string = '';
  "data_parsed": Array<any> = <any>[];
  "downlinkData": string = '';
  "ack": boolean = false;
  "reception": Array<any> = <any>[];
  "geoloc": Array<any> = <any>[];
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  "organizationId": any = <any>null;
  Device: any = null;
  user: any = null;
  Organization: any = null;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
      idName: 'id',
      properties: {
        "deviceId": {
          name: 'deviceId',
          type: 'string'
        },
        "time": {
          name: 'time',
          type: 'number'
        },
        "seqNumber": {
          name: 'seqNumber',
          type: 'number'
        },
        "data": {
          name: 'data',
          type: 'string'
        },
        "data_parsed": {
          name: 'data_parsed',
          type: 'Array&lt;any&gt;'
        },
        "downlinkData": {
          name: 'downlinkData',
          type: 'string'
        },
        "ack": {
          name: 'ack',
          type: 'boolean'
        },
        "reception": {
          name: 'reception',
          type: 'Array&lt;any&gt;'
        },
        "geoloc": {
          name: 'geoloc',
          type: 'Array&lt;any&gt;'
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
        "organizationId": {
          name: 'organizationId',
          type: 'any'
        },
      },
      relations: {
        Device: {
          name: 'Device',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'deviceId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        Organization: {
          name: 'Organization',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'organizationId',
          keyTo: 'id'
        },
      }
    }
  }
}
