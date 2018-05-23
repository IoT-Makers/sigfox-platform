/* tslint:disable */
import {
  Device,
  Geoloc,
  User,
  Organization
} from '../index';

declare var Object: any;
export interface MessageInterface {
  "deviceId": string;
  "time": number;
  "seqNumber": number;
  "data"?: string;
  "data_parsed"?: Array<any>;
  "data_downlink"?: string;
  "downlinkAck"?: boolean;
  "deviceAck"?: boolean;
  "ack"?: boolean;
  "reception"?: Array<any>;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  Device?: Device;
  Geolocs?: Geoloc[];
  user?: User;
  Organizations?: Organization[];
}

export class Message implements MessageInterface {
  "deviceId": string = '';
  "time": number = 0;
  "seqNumber": number = 0;
  "data": string = '';
  "data_parsed": Array<any> = <any>[];
  "data_downlink": string = '';
  "downlinkAck": boolean = false;
  "deviceAck": boolean = false;
  "ack": boolean = false;
  "reception": Array<any> = <any>[];
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  "userId": any = <any>null;
  Device: Device = null;
  Geolocs: Geoloc[] = null;
  user: User = null;
  Organizations: Organization[] = null;
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
        "data_downlink": {
          name: 'data_downlink',
          type: 'string'
        },
        "downlinkAck": {
          name: 'downlinkAck',
          type: 'boolean'
        },
        "deviceAck": {
          name: 'deviceAck',
          type: 'boolean'
        },
        "ack": {
          name: 'ack',
          type: 'boolean'
        },
        "reception": {
          name: 'reception',
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
      },
      relations: {
        Device: {
          name: 'Device',
          type: 'Device',
          model: 'Device',
          relationType: 'belongsTo',
                  keyFrom: 'deviceId',
          keyTo: 'id'
        },
        Geolocs: {
          name: 'Geolocs',
          type: 'Geoloc[]',
          model: 'Geoloc',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'messageId'
        },
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
          modelThrough: 'OrganizationMessage',
          keyThrough: 'organizationId',
          keyFrom: 'id',
          keyTo: 'messageId'
        },
      }
    }
  }
}
